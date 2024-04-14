import React from 'react';
import './advert_card.css';


export const Card = ({ adv }) => {
    const maxSymbols = 100;
    const limitedText = adv.text.slice(0, maxSymbols) + (adv.text.length > maxSymbols ? '...' : '');

    return (
        <div className="card">
            <img src={"/get_photo/" + adv.advert_id} className="card-img-top" alt="advert image" />
            <div className="card-body">
                <h5 className="card-title">{adv.title}</h5>
                <p className="card-text">{adv.text.slice(0, 100) + (adv.text.length > 100 ? '...' : '')}</p>
                <a href="#" className="btn btn-primary">Допомогти</a>
            </div>
        </div>
    );
};
