import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [card, setCard] = useState([])


  function fetchCard(){
    axios.get("http://localhost:3000/api/card")
   .then((res)=>{
    setCard(res.data.card)
   
    
   })
  }
 useEffect(()=>{

fetchCard()

 },[])

  function handleSubmit(e){
    e.preventDefault()
    const {image_URL,heading,description} = e.target.elements

    axios.post("http://localhost:3000/api/card",{
      image_URL:image_URL.value,
      heading:heading.value,
      description:description.value,
      
    }).then((res)=>{
      console.log(res.data);
      fetchCard()
    })
    e.target.reset()
    

   }
    
  
  function handleDelete(id){
    axios.delete(`http://localhost:3000/api/card/${id}`)
    .then((res)=>{
      console.log(res.data);
      fetchCard()
    })
   
  }
  function handleUpdate(id){
    const newImage_URL= prompt("Enter new Image URL")
    const newHeading = prompt("Enter new Heading")
    const newDescription = prompt("Enter new Description")
    

   axios.patch(`http://localhost:3000/api/card/${id}`,{
     image_URL:newImage_URL,
     heading:newHeading,
     description:newDescription
    })
   .then((res)=>{
     console.log(res.data);
     fetchCard()
   }) 

  }

  

  return (
   <>

    <form className="card-form" onSubmit={handleSubmit}>
      <input type="url" name="image_URL" placeholder="Enter the Image URL"  />
      <input type="text" name="heading" placeholder="Enter the Heading"  />
      <input type="text" name="description" placeholder="Enter the Description"  />
      <button>Save</button>
    </form>


      {card.map((card)=>{
  return <div className="main">
  <div className="top">
    <img src={card.image_URL} alt="" />
  </div>
  <div className="middle">
    <h1>{card.heading}</h1>
    <p>{card.description}</p>
  </div>
  <div className="bottom">
    <button onClick={()=>handleUpdate(card._id)}>Update</button>
    <button onClick={()=>handleDelete(card._id)}>Delete</button>
  </div>
</div>

})}
 </>
  )
}


export default App

