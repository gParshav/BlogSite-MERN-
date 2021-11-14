import "./post.css";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

export default function Post({post}) {
  const {title, desc, createdAt, categories} = post;
  const PF = "http://localhost:5000/images/"
  console.log(categories);
  return (
    <div className="post">
      <img
        className="postImg"
        src={PF + post.photo}
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
         
            <span className="postCat">{categories}</span>
         
        </div>
        <Link to={`post/${post._id}`} className='link' >
          <span className="postTitle">{title}</span>
        </Link>
        <hr />
        <span className="postDate">{new Date(createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">{desc}</p>
    </div>
  );
}