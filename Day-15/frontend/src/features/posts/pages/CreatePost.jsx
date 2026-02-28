import React, { useState,useRef} from 'react'
import '../styles/createPost.scss'
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router'

const CreatePost = () => {
    const [caption, setCaption] = useState('')
    const createPostImg = useRef(null)
    const {loading,handleCreatePost}=usePost()
    const navigate = useNavigate()
    
    async function handleSubmit(e){
        e.preventDefault()
        const file =createPostImg.current.files[0]

        await handleCreatePost(file,caption)
        navigate('/')

       
    }
     if(loading){
            return <main>
                <h1>creating post</h1>
            </main>
        }

  return (
    <div className='create-post-page'>
        <div className="formContainer">
            <h1>Create post</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <label htmlFor="postImg">Select Image</label>
                <input type="file" name='postImg' id='postImg'hidden ref={createPostImg} />
                <input type="text" name='caption' placeholder='Write caption'
                value={caption}
                onChange={(e)=>setCaption(e.target.value)}
                />
                <button>Create post</button>
            </form>
        </div>
    </div>
  )
}

export default CreatePost