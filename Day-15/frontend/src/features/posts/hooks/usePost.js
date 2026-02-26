import { getFeed } from '../services/posts.api'
import { useContext } from 'react'
import { PostContext } from '../post.context'

export const usePost = ()=>{
    const context = useContext(PostContext)
    const {loading,setLoading,post,setPost,feed,setFeed} = context

    const handleGetFeed=async()=>{
        setLoading(true)
        const response = await getFeed()
        setFeed(response.posts)
        setLoading(false)
    }

    return {loading,feed,post,handleGetFeed}
}