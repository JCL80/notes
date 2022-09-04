import './App.css';
import { useEffect , useState } from "react"
import axios from 'axios';
import {BrowserRouter as Router , Routes , Route , Link} from "react-router-dom"
import Home from "./pages/Home"
import ErrorPage from "./pages/ErrorPage"
import Create from './pages/Create';
import Post from './pages/Post'
import Registration from './pages/Registration';
import Login from "./pages/Login"
import { AuthContext } from "./helpers/AuthContext"

// writing something

function App() {

  const [authState , setAuthState] = useState({
    username : "" ,
    id: 0,
    status: false,
  })

  useEffect(() => {
    axios.get('http://localhost:3001/auth/auth' , {
      headers:{
        accessToken : localStorage.getItem("accessToken")
      },
    }).then((response) => {
      if(response.data.error) {
        setAuthState({...authState , status: false})
      }
      else{
        setAuthState({
        username : response.data.username ,
        id: response.data.id,
        status: true,
      }
    )}
    })
  } , [])

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAuthState({username : "" , id : 0 , status: false})
  }

  return <div className='App'>
      <AuthContext.Provider value = {{authState , setAuthState}}>
        <Router>
        <div className="navbar">
            <div className="links">
              <Link to="/"> Home Page</Link>
              <Link to="/create"> Create A Post</Link>
              {!authState.status && (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>

        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/create" element = {<Create/>}/>
          <Route path = "/post/:id" element = {<Post/>}/>
          <Route path = "/registration" element = {<Registration/>}/> 
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "*" element = {<ErrorPage/>}/> 

        </Routes>
        </Router>
      </AuthContext.Provider>
  </div>
 
}

export default App;
