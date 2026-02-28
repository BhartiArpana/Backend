import React from "react";
import { FaRegHeart } from "react-icons/fa6";
import { BiComment } from "react-icons/bi";
import { FaShare } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";


const Post = ({user,posts,loading,handleLike,handleUnLike}) => {

  

  return (
    <div className="post">
      <div className="user">
        <div className="profile">
          <img
            src={user.profileImage}
            alt="image not found"
          />
        </div>
        <p>{user.username}</p>
      </div>
      <img
        src={posts.postImg}
        alt="Image not found"
      />
      <div className="icons">
        <div className="leftIcon">
          <button >
            <FaRegHeart   className={`icon ${posts.isLike ? 'like' : ''}`} 
            onClick={()=>posts.isLike?handleUnLike(posts._id):handleLike(posts._id)}
            />
          </button>
          <button>
            <BiComment className="icon" />
          </button>
          <button>
            <FaShare className="icon" />
          </button>
        </div>
        <div className="rightIcons">
          <button>
            <FaRegBookmark className="icon" />
          </button>
        </div>
      </div>
      <p>{posts.caption}</p>
    </div>
  );
};

export default Post;
