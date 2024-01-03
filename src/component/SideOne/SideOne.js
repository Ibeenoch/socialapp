import React from 'react'
import { Explore, Home, Message, Notifications, Person } from "@material-ui/icons"
import { useNavigate } from 'react-router-dom'
import '../app.css'
import { useDispatch, useSelector } from 'react-redux'
import { alluser } from '../../features/userSlice'
import { getPost, myPosts } from '../../features/blogSlice'
import { getAllProfile, getProfile } from '../../features/profileSlice'

const SideOne = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.profile)

const styleHome = () => {
let home = document.querySelectorAll('.effect')
home.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.add('effect')
  })
})
}


  const toNotify = () => {
    navigate('/notify')
    styleHome()
  }
  const toHome = async () => {
    navigate('/')
    styleHome()
    await Promise.all([ dispatch(getProfile(), dispatch(getAllProfile()), dispatch(getPost()), dispatch(alluser()) )])    
   
  }
  const toProfile = () => {
    dispatch(myPosts())
    Object.keys(profile.fetchProfile).length === 0  ?  navigate('/createprofile')  : navigate('/profile') 
    styleHome()
  }
  const toChat = () => {
    navigate('/chat')
    styleHome()
  }
  const toExplore = async() => {
    navigate('/explore')
    styleHome()
    return await Promise.all([dispatch(getAllProfile()), dispatch(alluser()), dispatch(getProfile())])    
  }

  

  return (
    <div style={{display: 'flex', justifyContent: 'space-between',background: 'grey', borderRadius: '1.5rem', alignItems: 'center' , padding: '0rem 1rem', height: 'max-content', width: '100℅'}}>
         
           <div  className='effects' style={{display: 'flex', cursor:'pointer', justifyContent:'center', alignItems: 'center', margin: '1.2rem 0rem'}} onClick={toHome}>
             <Home />
             <div className="home">Home</div>
           </div>
           <div  className='effects' style={{display: 'flex', cursor:'pointer', justifyContent:'center', alignItems: 'center', margin: '1.2rem 0rem'}} onClick={toExplore}>
             <Explore />
             <div className="home">Explore</div>
           </div>
        
           <div className='effects' style={{display: 'flex', cursor:'pointer', justifyContent:'center', alignItems: 'center', margin: '1.2rem 0rem'}} onClick={toProfile}>
             <Person />
             <div className="home">Profile</div>
           </div>
        
   
    </div>
    
  )
}

export default SideOne
