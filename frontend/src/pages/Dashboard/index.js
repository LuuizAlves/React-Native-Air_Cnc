import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function Dashboard(){
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function LoadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboards', {
                headers: {user_id},
            })

            setSpots(response.data);
        }

        LoadSpots();
    }, [])

    return(
        <>
            <ul className="spot-list">
                {
                    spots.map(spot => (
                        <li key={spot._id}>
                            <header style={{backgroundImage: `url(${spot.thumbnail_url})`}} />
                            <strong> {spot.company} </strong>
                            <span> {spot.price ? `R$${spot.price},00/dia` : 'GRATUITO'} </span>
                        </li>
                    ))
                }
            </ul>

            <Link to="/new">
                <button className="btn"> Cadastrar spot </button>
            </Link>
        </>
    );
}