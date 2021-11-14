import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './One.css'
export default function One() {

    const location = useLocation();
    const path = location.pathname.split('/')[2];

    const [post, setPost] = useState({})
    const {user} = useContext(Context)
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get('/posts/' + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc)
            console.log(post);
        }

        getPost();
        
    }, [path])

    const handleDelete = async () => {
        try{
            await axios.delete(`/posts/${post._id}`, {
                data: {username: user.username},
            });
            window.location.replace('/');
        }catch(err){

        }
        
    }

    const handleUpdate = async () => {
        try{
            await axios.put(`/posts/${post._id}`, {
                username : user.username, title,  desc,
            });
            // window.location.reload();
            setUpdateMode(false)
        }catch(err){

        }
    }
    
    const PF = "http://localhost:5000/images/"
    console.log(post.photo)
    return (
        <div className='singlePost' >
            <div className='singlePostWrapper' >
            {post.photo && (
                <img src={PF + post.photo} alt="" className="singlePostImg" />
                
            )}
            {updateMode ? <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e) => setTitle(e.target.value)}/> : (
                <h1 className='singlePostTitle'>
                    {title}
                    
                    {user && post.username === user.username &&
                    <div className='singlePostEdit' >
                        <i className=" singlePostIcon fas fa-edit" onClick={() => setUpdateMode(true)}></i>
                        <i className=" singlePostIcon fas fa-trash-alt" onClick={handleDelete}></i>
                    </div>
                    }
                </h1>
            )}
                <div className="singlePostInfo">
                    <span>
                        Author:
                        <Link to={`/?user=${post.username}`} className='link'>
                            <b className="singlePostAuthor">{post.username}</b>
                        </Link>
                        
                    </span>
                    <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
                    </div>
                    {updateMode ? (
                        <textarea className='singlePostDescInput' value={desc} onChange={(e) => setDesc(e.target.value)}/>
                    ) : (
                    <p className="singlePostDesc">{desc}</p>
                    )}
                    {updateMode && 
                    <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                    }
            </div>

        </div>
    )
}
