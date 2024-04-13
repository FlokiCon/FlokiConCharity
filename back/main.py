# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request, g, send_file
import os
import sqlite3
from werkzeug.utils import secure_filename
import io
import bcrypt

app = Flask(__name__)

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
        )
        """)
        
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS category (
            category_id INTEGER PRIMARY KEY,
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
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
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


def file_to_blob(file_path):
    with open(file_path, 'rb') as file:
        blob_data = file.read()
    return blob_data

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


DATABASE = 'database.db'

@app.route('/login', methods=['POST'])
def login():
     with sqlite3.connect(DATABASE) as connection:
        cursor = connection.cursor()
        cursor.execute
        
@app.route("/register", methods=["POST", 'GET'])
def register_user():
    if request.method == "POST":
        if('name' in request.form 
           and 'suraname' in request.form
           and 'login' in request.form
           and 'password' in request.form
           and 'password_config' in request.form
           and 'phone' in request.form):
                name = request.form['name']
                surname = request.form['surname']
                login = request.form['login']
                password = request.form['password']
                password_config = request.form['password_config']
                phone = request.form['phone']
                
                if(password != password_config):
                    return "passwords doesn't match"
                
                with sqlite3.connect(DATABASE) as connection:
                    cursor = connection.cursor()
                    cursor.execute('SELECT * FROM accounts WHERE login = % s', (login, ))
                    account = cursor.fetchone()
                    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
                    if account:
                        return "account already exists"
                    elif (name and surname and login and password and phone):
                        cursor.execute("""
                        INSERT INTO user (name, surname, phone, login, password) VALUES (?, ?, ?, ?, ?)
                        """, (name, surname, phone, login, hashed_password))
                        DB.commit()
                        return "Success"
                    else:
                        return "not enought records"


@app.route('/get_adverts', methods=['GET'])
def get_adverts():
    try:
        # Отримуємо номер сторінки з параметра запиту
        page = request.args.get('page', default=1, type=int)

        # Розраховуємо індекси для пагінації
        start_idx = (page - 1) * 20
        end_idx = start_idx + 20

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
    try:
        with app.app_context():
            conn = get_db_connection()
            cursor = conn.cursor()
            
            cursor.execute("SELECT id, name, surname, phone, login FROM user WHERE id = ?", (user_id,))
            user = cursor.fetchone()

            if user:
                user_info = {
                    'id': user[0],
                    'na me': user[1],
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
    app.config['UPLOAD_FOLDER'] = 'uploads'
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    
    init_db()
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
