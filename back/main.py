# -*- coding: utf-8 -*-
#from crypt import methods
from calendar import c
from flask import Flask, jsonify, request, g, send_file, session, redirect, url_for
import os
import sqlite3
import io
import bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecretkey'
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True
app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)

def get_db_connection():
    if 'db_connection' not in g:
        g.db_connection = sqlite3.connect('database.db')
    return g.db_connection

@app.teardown_appcontext
def close_db_connection(exception=None):
    db = g.pop('db_connection', None)
    if db is not None:
        db.close()

def init_db():
    with app.app_context():
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY,
            name TEXT,
            surname TEXT,
            phone TEXT UNIQUE,
            login TEXT UNIQUE,
            password_hash TEXT
        )""")
        
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS category (
            category_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE
        )
        """)
        
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS advert (
            advert_id INTEGER PRIMARY KEY,
            title TEXT,
            text TEXT,
            priority INTEGER,
            category_id INTEGER,
            photo BLOB,
            user_id INTEGER,
            FOREIGN KEY (category_id) REFERENCES category(category_id),
            FOREIGN KEY (user_id) REFERENCES user(id)
        )
        """)
        
        categories = [
            ('Без категорії',),
            ('Військове',),
            ('Медицина',),
            ('Харчові товари',),
            ('Для дітей',),
            ('Послуги',)
        ]
        
        cursor.executemany("INSERT OR IGNORE INTO category (name) VALUES (?)", categories)
        
        conn.commit()
        conn.close()

@app.route('/add_advert', methods=['POST'])
def add_advert():
    try:
        title = request.form.get('title')
        text = request.form.get('text')
        priority = request.form.get('priority', type=int)
        category_id = request.form.get('category_id', type=int)
        user_id = request.form.get('user_id', type=int)
        
        photo = request.files.get('photo')
        
        if photo:
            photo_blob = photo.read()
        else:
            photo_blob = None

        with app.app_context():
            conn = get_db_connection()
            cursor = conn.cursor()

            cursor.execute("""
                INSERT INTO advert (title, text, priority, category_id, photo, user_id)
                VALUES (?, ?, ?, ?, ?, ?)
                """, (title, text, priority, category_id, photo_blob, user_id))
            conn.commit()

        return jsonify({'message': 'Оголошення додано успішно!'}), 201
    except Exception as e:
        return jsonify({'message': f'Помилка: {e}'}), 500

@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == "POST":
        try:
            with sqlite3.connect('database.db') as connection:
                data = request.get_json()
                cursor = connection.cursor()
                cursor.execute('SELECT id,password_hash FROM user WHERE login = (?)', (data.get('login'),))
                user = cursor.fetchone()
                print(user)
                if not user:
                    return jsonify({'message': 'User with this login not found!'}), 404

                stored_password_hash = user[1]

                if bcrypt.checkpw(data.get('password').encode('utf-8'), stored_password_hash):
                    access_token = create_access_token(identity=user[0])
                    return jsonify(access_token=access_token)
                else:
                    return jsonify({'message': 'Bad password!'}), 401
                
        except Exception as e:
            return jsonify({'message': f'Error: {e}'}), 500
    else:
        return jsonify({'message': "Doesn't support!"}), 405

@app.route("/register", methods=["POST", 'GET'])
def register_user():
    if request.method == "POST":
        data = request.get_json()
        required_fields = ['name', 'surname', 'login', 'password', 'password_config', 'phone']
        name = data.get('name')
        surname = data.get('surname')
        login = data.get('login')
        password = data.get('password')
        password_config = data.get('password_config')
        phone = data.get('phone')

        if password != password_config:
            return jsonify({'message': "Passwords doesn't match!"}), 400

        try:
            with sqlite3.connect('database.db') as connection:
                cursor = connection.cursor()
                cursor.execute('SELECT * FROM user WHERE login = ?', (login,))
                account = cursor.fetchone()

                if account:
                    return jsonify({'message': "User already exists!"}), 409

                hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
                cursor.execute("""
                    INSERT INTO user (name, surname, phone, login, password_hash) VALUES (?, ?, ?, ?, ?)
                """, (name, surname, phone, login, hashed_password))
                connection.commit()

                cursor.execute('SELECT id FROM user WHERE login = ?', (login,))
                user_id = cursor.fetchone()[0]

                # Create an access token for the registered user
                access_token = create_access_token(identity=user_id)

                return jsonify({'message': "Success!", 'user_id': user_id, 'access_token': access_token}), 201
        except Exception as e:
            return jsonify({'message': f'Error: {e}'}), 500
    else:
        return jsonify({'message': "Doesn't support!"}), 405

@app.route('/get_current_user_id', methods=['GET'])
@jwt_required()
def get_current_user_id():
    current_user = get_jwt_identity()
    print(current_user)
    return jsonify(logged_in_as=current_user), 200

@app.route('/get_adverts/<id>', methods=['GET'])
def get_advert_by_id(id):
    try:

        with app.app_context():
            conn = get_db_connection()
            cursor = conn.cursor()

            cursor.execute("""
                SELECT advert_id, title, text, priority, photo, user_id, category_id
                FROM advert WHERE advert_id = ?
                """, (id))
            adverts = cursor.fetchall()

            formatted_adverts = []
            for advert in adverts:
                formatted_advert = {
                    'advert_id': advert[0],
                    'title': advert[1],
                    'text': advert[2],
                    'priority': advert[3],
                    'photo_path': bool(advert[4]),
                    'user_id': advert[5],
                    'category_id': advert[6]
                }
                formatted_adverts.append(formatted_advert)

            return jsonify(formatted_adverts), 200
    except Exception as e:
        return jsonify({'message': f'Помилка: {e}'}), 500

@app.route('/get_adverts', methods=['GET'])
def get_adverts():
    try:
        page = request.args.get('page', default=1, type=int)

        start_idx = (page - 1) * 15
        end_idx = start_idx + 15

        with app.app_context():
            conn = get_db_connection()
            cursor = conn.cursor()

            cursor.execute("""
                SELECT advert_id, title, text, priority, photo, user_id, category_id
                FROM advert
                LIMIT ? OFFSET ?
                """, (20, start_idx))
            adverts = cursor.fetchall()

            formatted_adverts = []
            for advert in adverts:
                formatted_advert = {
                    'advert_id': advert[0],
                    'title': advert[1],
                    'text': advert[2],
                    'priority': advert[3],
                    'photo_path': bool(advert[4]),
                    'user_id': advert[5],
                    'category_id': advert[6]
                }
                formatted_adverts.append(formatted_advert)

            return jsonify({'adverts': formatted_adverts}), 200
    except Exception as e:
        return jsonify({'message': f'Помилка: {e}'}), 500


@app.route('/get_user_adverts/<int:user_id>', methods=['GET'])
def get_user_adverts(user_id):
    try:
        with app.app_context():
            conn = get_db_connection()
            cursor = conn.cursor()

            cursor.execute("""
                SELECT advert_id, title, text, priority, photo, user_id, category_id
                FROM advert
                WHERE user_id = ?
                """, (user_id,))
            adverts = cursor.fetchall()

            formatted_adverts = []
            for advert in adverts:
                formatted_advert = {
                    'advert_id': advert[0],
                    'title': advert[1],
                    'text': advert[2],
                    'priority': advert[3],
                    'photo_path': bool(advert[4]),
                    'user_id': advert[5],
                    'category_id': advert[6]
                }
                formatted_adverts.append(formatted_advert)

            return jsonify({'adverts': formatted_adverts}), 200
    except Exception as e:
        return jsonify({'message': f'Помилка: {e}'}), 500

@app.route('/get_photo/<int:advert_id>', methods=['GET'])
def get_photo(advert_id):
    try:
        with app.app_context():
            conn = get_db_connection()
            cursor = conn.cursor()
            
            cursor.execute(f"SELECT photo FROM advert WHERE advert_id = {advert_id}")
            advert = cursor.fetchone()

            if advert and advert[0]:
                return send_file(io.BytesIO(advert[0]), mimetype='image/jpeg')
            else:
                return jsonify({'message': 'Фото не знайдено!'}), 404
    except Exception as e:
        return jsonify({'message': f'Помилка: {e}'}), 500

@app.route('/get_categories', methods=['GET'])
def get_categories():
    try:
        categories = [
            {'id': 0, 'name': 'Без категорії'},
            {'id': 1, 'name': 'Військове'},
            {'id': 2, 'name': 'Медицина'},
            {'id': 3, 'name': 'Харчові товари'},
            {'id': 4, 'name': 'Для дітей'},
            {'id': 5, 'name': 'Послуги'}
        ]
        
        return jsonify({'categories': categories}), 200
    except Exception as e:
        return jsonify({'message': f'Помилка: {e}'}), 500

@app.route('/get_user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    #with sqlite3.connect('database.db') as connection: 
     #   connection.cursor().execute("""
      #                  INSERT INTO user (name, surname, phone, login, password_hash) VALUES (?, ?, ?, ?, ?)
       #             """, ('ivan', 'protsai', 'phone1', 'login1', 'hashed_password'))
        #connection.commit()
    try:
        with app.app_context():
            conn = get_db_connection()
            cursor = conn.cursor()
            
            cursor.execute("SELECT id, name, surname, phone, login FROM user WHERE id = ?", (user_id,))
            user = cursor.fetchone()

            if user:
                user_info = {
                    'id': user[0],
                    'name': user[1],
                    'surname': user[2],
                    'phone': user[3],
                    'login': user[4]
                }
                return jsonify({'user': user_info}), 200
            else:
                return jsonify({'message': 'Користувач не знайдений!'}), 404
    except Exception as e:
        return jsonify({'message': f'Помилка: {e}'}), 500

if __name__ == "__main__":
    init_db()
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
