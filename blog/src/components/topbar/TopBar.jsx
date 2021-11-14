import React, { useContext } from 'react'
import './topbar.css'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import { Context } from '../../context/Context';
export default function TopBar() {
  const {user, dispatch} = useContext(Context);

  const handleLogout = () => {
    dispatch({type : "LOGOUT"})
  }

  const PF = "http://localhost:5000/images/"

    return (
        
        <div className='top'>
            <div className='topLeft'>
            <i className="topIcon fab fa-facebook-square"></i>
            <i className="topIcon fab fa-twitter"></i>
            <i className="topIcon fab fa-instagram"></i>
            </div>
            <div className='topCenter'>
                <ul className='topList' >
                    <li className="topListItem" >
                        <Link className="link" to='/' >HOME</Link>
                    </li>
                    {/* <li className="topListItem" ><Link className="link" to="/about">
                        ABOUT
                    </Link></li>
                    <li className="topListItem" ><Link className="link" to="/contact">
                        CONTACT
                    </Link></li> */}
                    <li className="topListItem" >
                    <Link className="link" to="/write">
                        WRITE
                    </Link>
                    </li>
                    <li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>
                </ul>
            </div>
            <div className='topRight'>
                {/* <img className='topImg' src="https://images.pexels.com/photos/9025296/pexels-photo-9025296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
                 */}
                 {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={PF+user.profilePic}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
                <i className="topSearchicon fas fa-search"></i>

            </div>
        </div>


    )
}
