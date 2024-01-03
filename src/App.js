import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './component/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './component/Login'
import NavBar from './component/NavBar'
import Register from './component/Register'
import Comment from './component/SideOne/Comment'
import Notify from './component/SideOne/Notify'
import Chat from './component/SideThree/Chat'
import Explore from './component/SideTwo/Explore'
import { useDispatch } from 'react-redux'
import Postpage from './component/SideTwo/Postpage'
import CreateProfile from './component/CreateProfile'
import axios from 'axios'
import { setLogin } from './features/userSlice'
import Profile from './component/SideTwo/Profile'
import Mapfollower from './component/SideTwo/Mapfollower'
import MapFollowing from './component/SideTwo/MapFollowing'
import PrivateRoute from './component/SideTwo/PrivateRoute'
import Loading from './component/SideThree/Loading'
import ViewProfile from './component/SideTwo/ViewProfile'
import ViewCover from './component/SideTwo/ViewCover'
import View from './component/SideTwo/View'

const App = () => {

  const user =  JSON.parse(localStorage.getItem('user'))
const dispatch = useDispatch()

useEffect(() => {
 dispatch(setLogin(user))
}, [])

useEffect(() => {
  if('user' in localStorage){
    const login = JSON.parse(localStorage.getItem('user'))
    axios.defaults.headers.common["authorization"] = `Bearer ${login.token}`
  }
}, [user]) 


  return (
    <Router basename='/'>
       <div style={{width: '100vw'}}>
         <NavBar/>      
       </div>
      
       <Routes>
       
         <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/register' element={<Register />} />
         <Route path='/notify' element={<Notify />} /> 
         <Route path='/comment/:id' element={ <Comment />} />
         <Route path='/chat' element={<Chat />} />
         <Route path='/profile' element={<PrivateRoute ><Profile /></PrivateRoute> } />
         <Route path='/profile/:id' element={<PrivateRoute ><Profile /></PrivateRoute> } />
         <Route path='/followers' element={<PrivateRoute ><Mapfollower /></PrivateRoute> } />
         <Route path='/following' element={<PrivateRoute ><MapFollowing /></PrivateRoute> } />
         <Route path='/explore' element={<PrivateRoute ><Explore /></PrivateRoute> } />
         <Route path='/postpage/:id' element={<PrivateRoute ><Postpage /></PrivateRoute> } />
         <Route path='/postpage' element={<PrivateRoute ><Postpage /></PrivateRoute> } />
         <Route path='/loading' element={<Loading />   } />
         <Route path='/view/:id' element={<View/>   } />
         <Route path='/viewprofile/:id' element={<ViewProfile/>   } />
         <Route path='/viewcover/:id' element={<ViewCover/>   } />
         <Route path='/createprofile' element={<CreateProfile />   } />
         <Route path='/createprofile/:id' element={ <PrivateRoute ><CreateProfile /></PrivateRoute>  } />
        
        </Routes>
        <ToastContainer />
    </Router>
   
  )
}

export default App
