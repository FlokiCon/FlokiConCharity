import React from 'react';
import './advert.css';
import { useState } from 'react';

export const Advert = () => {
    let ml = [];
    for (let i = 0; i < 5; ++i) {
        ml.push(<input key={i} className="form-check-input" type="radio" name="priority" value={i} onChange={e => setPriority(e.target.value)}></input>)
    }

    let categs = [];
    for (let i = 0; i < 7; ++i) {
        categs.push(<option key={i} onChange={e => setCategory(e.target.value)} value={i}>Категорія {i}</option>)
    }

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [category, setCategory] = useState('0');
    const [priority, setPriority] = useState('');
    const [picture, setPicture] = useState([]);



    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('text', text);
        formData.append('category_id', category);
        formData.append('priority', priority);
        if (picture.length > 0) {
            // Assuming `picture` is an array of files
            formData.append('photo', picture[0], picture[0].name);
        }
        fetch('/add_advert', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
      };

    return (
        <div className='advert'>
            <h1>Створити запит</h1>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} name="title" type="text" className="form-control username-field title" id="floatingInput" placeholder="Назва"></input>
                <textarea value = {text} onChange={e => setText(e.target.value)} className="form-control" placeholder="Запит" id="floatingTextarea"></textarea>
                
                <div className="form-floating">
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option disabled value="0"></option>
                            {categs}
                        </select>
                    <label for="floatingSelect">Виберіть категорію</label>
                </div>

                <div className='priority'>
                    <span>На скільки терміновим є запит?</span>
                    <br />
                    <div className='select_categ'>
                        {ml}
                    </div>
                </div>

                <input onChange={e => setPicture([...picture, e.target.files[0]])} className="form-control" type="file" id="formFile"></input>
                <button type="submit" className="btn btn-secondary submit">Secondary</button>
            </form>
        </div>
    )
}
