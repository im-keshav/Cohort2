import "../../auth/style/form.scss"
import "../style/createPost.scss"
import { useRef,useState } from "react"
import {usePost} from "../hooks/usePost"
import { useNavigate } from "react-router"
const CreatePost = () => {

    const [caption,setCaption] = useState("")
    const postImageInputField = useRef(null)
    const {loading,handleCreatePost} = usePost()
    const navigate = useNavigate()

 
    async function handleSubmit(e){
        e.preventDefault()
        const file =postImageInputFieldRef.current.files(0)
       await  handleCreatePost(file,caption)

       navigate("/")

    }
    if(loading){
        return (
            <main>
                <h1>Creating post</h1>
            </main>
        )
    }



  return (
    <main className='create-post'>
        <div className="form-container">
            <h1>Create Post</h1>
            <form>
              <label className="post-image-label" htmlFor="postImage">Select Image</label>
              <input hidden type="file" accept='postImage' id='postImage'/>
              <label htmlFor="caption">Caption</label>
              <input 
              value={caption}
              onChange={(e)=>setCaption(e.target.value)}
              type="text" id='caption'placeholder="Enter caption"/>
              <button className="button">Create Post</button>
            </form>
        </div>
    </main>
  )
}

export default CreatePost