import { useEffect, useState } from 'react'
import axios from 'axios'



function App() {
  const [notes, setNotes] = useState([]) 
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")




  function fetchNotes(){
    axios.get("http://localhost:3000/api/note")
   .then((res)=>{
    setNotes(res.data.notes)
   
    
   })
  }
 useEffect(()=>{

fetchNotes()

 },[])
 function handleSubmit(e){
  e.preventDefault()
  const {title, description} = e.target.elements

  axios.post("http://localhost:3000/api/note",{
    title:title.value,
    description:description.value
  }).then((res)=>{
    console.log(res.data);
    fetchNotes()
  })
  setTitle("")
  setDescription("")

 }

 function handleDelete(id){
  axios.delete(`http://localhost:3000/api/note/${id}`)
  .then((res)=>{
    console.log(res.data);
    fetchNotes()
  })
 }
 function handleUpdate(id){
 
 axios.patch(`http://localhost:3000/api/note/${id}`,{
 title,
  description
  }).then((res)=>{
    console.log(res.data);
    fetchNotes()

  })
  setTitle("")
  setDescription("")
  
  
 }
  return (
    <>
    <form className='note-create-form' onSubmit={(e)=>{
      handleSubmit(e)
    }} >
      <input name="title" type="text" value={title} placeholder='Enter Title' onChange={(e)=>setTitle(e.target.value)}/>
      <input name="description" type="text" value={description} placeholder='Enter description' onChange={(e)=>setDescription(e.target.value)}/>
      <button onClick={()=>{
        console.log("saved");
        
      }}>Create Note</button>
    </form>

     <div className="notes">
{notes.map(note => {
   return  <div className="note">
    <h1>{note.title}</h1>
    <p>{note.description}</p>
    <button onClick={()=>{handleUpdate(note._id)}}>Update</button>
    <button onClick={()=>handleDelete(note._id)}>Delete</button>
  </div>
})}
        </div> 
    </>
  )
}

export default App
