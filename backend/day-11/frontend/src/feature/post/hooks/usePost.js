import { getFeed    } from "../services/post.api"
import { useContext } from "react"
import { PostContext } from "../post.context"



export const usePost = () =>{
    const context = useContext(PostContext)
    const {setFeed,setLoading,setPost,loading,post,feed} = context

    async function handleGetFeed(){
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }
    return {
        loading , feed,post , handleGetFeed
    }
}