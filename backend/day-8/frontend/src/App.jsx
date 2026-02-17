import { useState } from 'react'
import axios from 'axios'



function App() {
  const [notes, setNotes] = useState([{
  title:"Note 1",
  description:"This is the description of note 1" 
  },
  {
    title:"Note 2",
    description:"This is the description of note 2"
  },
  {
    title:"Note 3",
    description:"This is the description of note 3"
  },
  {
    title:"Note 4",
    description:"This is the description of note 4"
  }
]) 

axios.get("http://localhost:3000/api/note")
 .then((res)=>{
  setNotes(res.data.notes)
  
 })

  return (
    <>
     <div className="notes">
{notes.map(note => {
   return  <div className="note">
    <h1>{note.title}</h1>
    <p>{note.description}</p>
  </div>
})}
        </div> 
    </>
  )
}

export default App
