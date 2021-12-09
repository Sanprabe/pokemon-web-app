import React from 'react'
import { useNavigate } from 'react-router'
import './NavBar.css'

function NavBar() {

    const navigate = useNavigate();

    return (
        <nav>
            <ul>
                <li><button onClick={ () => {
                    navigate('/');
                }}>Catch New</button></li>
                <div className="nav-pokeball--logo"></div>
                <li><button  onClick={ () => {
                    navigate('/myPokes');
                }}>My Pokes</button></li>
            </ul>
        </nav>
    )
}

export default NavBar
