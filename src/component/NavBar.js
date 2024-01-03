import React from 'react'
import { AppBar, Avatar, Toolbar, Typography } from '@material-ui/core'
import social from '../pics/social.jpg'
import './app.css'
import makeStyle  from './style'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../features/userSlice'
import { persistor } from '..'
import  jwt_decode  from 'jwt-decode'

const NavBar = () => {
    const classes = makeStyle()
    const { user, token } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
//    const { token } = JSON.parse(localStorage.getItem('user'))

    if(token){
      const decodedToken = jwt_decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()){
        dispatch(setLogout())
      }
    }

    const toHome = () => {
      navigate('/')
    }

    const handleLogout = () => {
     dispatch(setLogout())
   persistor.pause();
   persistor.flush().then(() => {
     return persistor.purge()
   })

   navigate('/login')
   }
    
  return (
    <AppBar position='static'  style={{width: '100vw'}}>
     <div className={classes.logoSpacing}  style={{cursor: 'pointer'}}>
        <div className={classes.logo} onClick={toHome}>
        <Toolbar >
        <Avatar className={classes.logoImg} src={social} alt='social' />
        </Toolbar>
        <Typography variant='h7'  className={classes.social} >Social App</Typography>    
    </div>    
    {user ? (   
       <div style={{cursor: 'pointer', display: 'flex', padding: '0.5rem 1.3rem', justifyContent:'space-between'}} >
   <Typography style={{fontSize:'0.7rem', marginRight: '0.7rem'}} variant='h7' >Welcome {user.user ? user.user.name : null} </Typography>
     <Typography style={{fontSize:'0.7rem'}} variant='h7' onClick={handleLogout}> Logout</Typography>

</div>
) : 
(    <div style={{cursor: 'pointer', display: 'flex', padding: '0.5rem',}} >

<Link to={'/register'} style={{ fontSize: '0.8rem'}} >Register</Link>
<Link to={'/login'} style={{ fontSize: '0.8rem'}} >Login</Link>
</div>)
}
        </div>
      
    </AppBar>
  )
}

export default NavBar
