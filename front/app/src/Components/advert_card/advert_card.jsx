import React from 'react';
import './advert_card.css'

export const Card = ({adv}) => {
    adv.text = "asdalskdalskdjalsdkjalsdkjaslkdjalskdjalskdjalskjdlaskdasdasdddddddddddddddddddddddddddddddddddddddddjalskdjlaskdj";
    return (
        <div className="card">
            <img src={"/get_photo/"+adv.advert_id} className="card-img-top" alt="advert image"/>
            <div className="card-body">
                <h5 className="card-title">{adv.title}</h5>
                <p className="card-text">
                    {adv.text.length > 100 ? (
                        <>
                            {adv.text.slice(0, 100)}
                            ... 
                            <br />
                            <a href="#" className="card-link">Read More</a>
                        </>
                    ) : (
                        adv.text
                    )}
                </p>
                <a href="#" className="btn btn-secondary">Допомогти</a>
            </div>
        </div>
    )
}
