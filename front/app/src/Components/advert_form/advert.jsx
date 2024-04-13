import React, { useEffect } from 'react';
import './advert.css';
import { useState } from 'react';

export const Advert = () => {
    let priorities = [];
    for (let i = 0; i < 5; ++i) {
        priorities.push(<input key={i} className="form-check-input" type="radio" name="priority" value={i} onChange={e => setPriority(e.target.value)}></input>)
    }

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [category, setCategory] = useState('0');
    const [priority, setPriority] = useState('');
    const [picture, setPicture] = useState([]);

    const [categList, setCategList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('text', text);
        formData.append('category_id', category);
        formData.append('priority', priority);
        if (picture.length > 0) {
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

      useEffect(() => {
        fetch('/get_categories', {
            method: 'GET',
        }).then(response => response.json()
            ).then(data => {
                setCategList(data);
                console.log();
        })
      }, [])

    if (categList.length <= 0 ) {
        return <div>Loading...</div>
    }


    return (
        <div className='advert'>
            <h1>Створити запит</h1>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} name="title" type="text" className="form-control username-field title" id="floatingInput" placeholder="Назва"></input>
                <textarea value = {text} onChange={e => setText(e.target.value)} className="form-control" placeholder="Запит" id="floatingTextarea"></textarea>
                
                <div className="form-floating">
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option disabled value="0"></option>
                            {categList['categories'].map((categ, index) => {
                                return <option key={index} value={categ.id}>{categ.name}</option>
                            })}
                        </select>
                    <label for="floatingSelect">Виберіть категорію</label>
                </div>

                <div className='priority'>
                    <span>На скільки терміновим є запит?</span>
                    <br />
                    <div className='select_categ'>
                        {priorities}
                    </div>
                </div>

                <input onChange={e => setPicture([...picture, e.target.files[0]])} className="form-control" type="file" id="formFile"></input>
                <button type="submit" className="btn btn-secondary submit">Secondary</button>
            </form>
        </div>
    )
}
