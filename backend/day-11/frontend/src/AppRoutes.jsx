import { BrowserRouter, Routes, Route } from "react-router"
import Login from "./feature/auth/pages/Login"
import Register from "./feature/auth/pages/Register"
import Feed from "./feature/post/pages/Feed"
import CreatePost from "./feature/post/pages/CreatePost"

function AppRouter() {
    return( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Feed/>}>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
               <Route path="/create-post" element={<CreatePost/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter