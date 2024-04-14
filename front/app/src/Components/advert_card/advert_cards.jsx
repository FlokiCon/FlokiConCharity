import React from 'react';
import { useState, useEffect } from 'react';
import { Card } from './advert_card';

export const Cards = ({page}) => {

    const [advert, setAdvert] = useState([]);

    useEffect(() => {
        fetch('/get_adverts?page=' + page, {
            method: 'GET',
        }).then(response => response.json()
            ).then(data => {
                setAdvert(data);
                console.log(data);
        })
    }, [page])

    if (advert.length <= 0) {
        return null;
    }
    return (
        <div className='cards'>
            {advert['adverts'].map((adv, index) => (
                <div className="card" key={index}>
                <img src={"/get_photo/" + adv.advert_id} className="card-img-top" alt="advert image" />
                <div className="card-body">
                    <h5 className="card-title">{adv.title}</h5>
                    <p className="card-text">{adv.text.slice(0, 100) + (adv.text.length > 100 ? '...' : '')}</p>
                    <a href="#" className="btn btn-primary">Допомогти</a>
                </div>
            </div>
            ))}
        </div>
    )
}
