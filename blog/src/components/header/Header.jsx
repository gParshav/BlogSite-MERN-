import React from 'react'
import './header.css'
export default function Header() {
    return (
        <div className='header'>
            <div className="headerTitles" >
                <span className="headerTitleSm">React & Node</span>
                <span className="headerTitleLg">Blog</span>
            </div> 
            <img
                className="headerImg"
                src="https://images.pexels.com/photos/9651391/pexels-photo-9651391.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
             />
        </div>
    )
}