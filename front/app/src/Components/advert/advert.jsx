import React from 'react';
import './advert.css'

export const Advert = () => {
    let ml = [];
    for (let i = 0; i < 5; ++i) {
        ml.push(<input type="radio" name="priority" value={i}></input>)
    }

    let categs = []
    for (let i = 0; i < 7; ++i) {
        categs.push(<option value={i}>Категорія {i}</option>)
    }

    return (
        <div className='advert'>
            <h1>Створити оголошення</h1>
            <form>
                <input type="text" placeholder="Назва" className="title" name='title'></input>
                <textarea type="text" placeholder="Оголошення" className="text" name='text'></textarea>
                <select name="select">
                    {categs}
                </select>
                <div className='priority'>
                    <span>На скільки терміновим є запит?</span>
                    <br />
                    <div className='select_categ'>
                        {ml}
                    </div>
                </div>
                <input type="file" name="file" title='додати фото'></input>
                <button type="submit" className="submit">Submit</button>
            </form>
        </div>
    )
}
