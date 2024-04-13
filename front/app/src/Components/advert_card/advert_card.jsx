import React from 'react';
import './advert_card.css'

export const Card = ({adv}) => {
    
    return (
        <div className="card">
            <img src={"/get_photo/"+adv.advert_id} class="card-img-top" alt="advert image"/>
            <div className="card-body">
                <h5 className="card-title">{adv.title}</h5>
                <p className="card-text">{adv.text}</p>
                <a href="#" className="btn btn-primary">Допомогти</a>
            </div>
        </div>
    )
}
