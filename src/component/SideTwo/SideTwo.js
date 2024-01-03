import React, { useEffect } from 'react'
import { Box, Button, Input } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import MappedPost from './MappedPost'
import { useDispatch, useSelector } from 'react-redux'
import MapStatus from './MapStatus'



const SideTwo = () => {

  const { user } = useSelector((state) => state.user)
  const { profile } = useSelector((state) => state.profile) 
const navigate = useNavigate()
  const hide = (e) =>{
    e.target.style.display = 'none'
   }

  

  return (
    <div style={{ width: '100%', background:'gray'}}>
 

   <div style={{display: 'flex', flexDirection: 'row', width: '80%', background:'gray', marginLeft:'10%'}}>
   <MapStatus />
</div>
    
    <Link to='/postpage'>
   <form>
  <Box sx={{ width: '100%', display: 'flex', marginTop: '1.2rem', borderRadius: '1rem', background: 'white', padding:'0.5rem'}}>
      <img src={user.user.profilepics.url || profile.fetchProfile && profile.fetchProfile.map((item) => item.profilepics.url)} onError={(e) => e.target.style.display='none'} style={{width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer'}} />
      <div style={{ padding: '0 0.5rem'}} >
        <Input  type='text' style={{ width: '90%', fontSize:'0.7rem'}} placeholder='What"s on your mind'/>
      </div>
      <Button variant='contained' style={{ width: 'auto', fontSize: '0.7rem', height:'auto'}} color='primary' > Post</Button>
      </Box>
     </form>
     </Link>



<div style={{ display: 'flex', flexDirection: 'column'}}>
<MappedPost />
</div>
    


  </div>
  )
}

export default SideTwo
