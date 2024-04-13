import React from 'react';
import { useState, useEffect } from 'react';
import { Card } from './advert_card';
import './advert_cards.css';

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
    }, [])

    if (advert.length <= 0) {
        return null;
    }
    return (
        <div className='cards'>
            {advert['adverts'].map((adv, index) => (
                <Card key={index} adv={adv}></Card>
            ))}
        </div>
    )
}
