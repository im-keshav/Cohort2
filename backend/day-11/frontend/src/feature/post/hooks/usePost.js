import { getFeed,createPost, likePost, unLikePost   } from "../services/post.api"
import { useContext,useEffect } from "react"
import { PostContext } from "../post.context"



export const usePost = () =>{
    const context = useContext(PostContext)
    const {setFeed,setLoading,setPost,loading,post,feed} = context

    async function handleGetFeed(){
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts.reverse())
        setLoading(false)
    }
    const handleCreatePost= async(imageFile,caption)=>{
        setLoading(true)
        const data = await createPost(imageFile,caption)
        setFeed([data.post,...feed])
        setLoading(false)
    }


    const handleLike = async function (post){
        setLoading(true)
        const data = await likePost(post)
        await handleGetFeed()
        setLoading(false)
    }

    const handleUnLike= async function (post){
        setLoading(true)
        const data = await unLikePost(post)
        await handleGetFeed()
        setLoading(false)
    }




    useEffect(()=>{
        handleGetFeed()
    },[])
    return {
        loading , feed,post , handleGetFeed , handleCreatePost, handleLike , handleUnLike
    }
}