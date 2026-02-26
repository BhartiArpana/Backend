import React, { useEffect } from 'react'
import '../styles/feed.scss'
import { usePost } from '../hooks/usePost';
import Post from '../components/post';


const Feed = () => {

    const {feed,handleGetFeed,loading} = usePost()
    useEffect(()=>{
        handleGetFeed()
    },[])

    if(loading || !feed){
        return <main><h1>Loading....</h1></main>
    }

    console.log(feed);
    

  return (
    <main>
        <div className="feed">
            <div className="posts">
                {feed.map(post=>{
                    return <Post user={post.userId} posts ={post} />
                })}
            </div>
        </div>
    </main>
  )
}

export default Feed