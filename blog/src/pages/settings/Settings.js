import axios from 'axios';
import React, { useContext, useRef, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context'
import './settings.css'

export default function Settings() {

    const [file, setFile] = useState(null);
    const {user, dispatch} = useContext(Context)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updatedUser = {
          userId: user._id,
          username, email, password,
        };
        if (file) {
          const data =new FormData();
          const filename = Date.now() + file.name;
          data.append("name", filename);
          data.append("file", file);
          updatedUser.profilePic = filename;
          try {
            await axios.post("/upload", data);
          } catch (err) {}
        }
        try {
          const res = await axios.put("/users/"+user._id, updatedUser);
          console.log(user.username)
          dispatch({type:"UPDATE_SUCCESS", payload: res.data})
        } catch (err) {
            dispatch({type:"UPDATE_FAILURE"})
        }
      };

    const PF = "http://localhost:5000/images/"

    return (
        <div className='settings' >
            <div className='settingsWrapper'>
                <div className='settingsTitle' >
                    <span className='settingsUpdateTitle'>Update Your Account</span>
                    <span className='settingsDeleteTitle'>Delete Account</span>
                </div>
                <form className='settingsForm' onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className='settingsPP'>
                    <img
                        className="writeImg"
                        src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                        alt=""
                    />
                        <label htmlFor='fileInput'>
                            <i className="settingsPPIcon fas fa-users"></i>
                        </label>
                        <input type="file" id="fileInput" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])}/>
                    </div>
                    <label>Username</label>
                        <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)}/>
                    <label>Email</label>
                        <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)}/>
                    <label>Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <button className='settingsSubmit' type="submit">Update</button>
                </form>
            </div>
            <Sidebar />

        </div>
    )
}
