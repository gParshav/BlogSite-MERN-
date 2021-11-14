import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './sidebar.css'

export default function Sidebar() {

    const [cats, setCats] = useState([]);

    useEffect(() => {
        
        const getCats = async () => {
            const res = await axios.get('/categories');
            setCats(res.data);
        }

        getCats();
    }, [])

    return (
        <div className="sidebar" >
            <div className="sidebarItem" >
                <span className="sidebarTitle" >ABOUT ME</span>
                <img src="https://images.pexels.com/photos/9668543/pexels-photo-9668543.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin leo lorem, mollis eget iaculis vitae, auctor ac tellus.
                    Nulla iaculis tellus elit, pulvinar finibus urna molestie eu. Mauris non sapien orci. Phasellus faucibus risus vitae felis congue, sit amet posuere massa dictum.
                    Quisque at posuere lacus. Praesent sit amet metus massa.
                </p>
            </div>    
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                {cats.map((c) => (
                    <Link className='link' to={`/?cat=${c.name}`}>
                        <li className="sidebarListItem">{c.name}</li>
                    </Link>
                    
                ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                <i className="sidebarIcon fab fa-facebook-square"></i>
                <i className="sidebarIcon fab fa-instagram-square"></i>
                <i className="sidebarIcon fab fa-pinterest-square"></i>
                <i className="sidebarIcon fab fa-twitter-square"></i>
                </div>
            </div>
        </div>
    )
}
