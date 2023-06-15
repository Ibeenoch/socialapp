import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { Image, Person } from '@material-ui/icons'
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createProfile, getProfile, profileUpdate } from '../features/profileSlice'
import Loading from './SideThree/Loading'

const CreateProfile = () => {

  const hiddenFileInput = useRef(null)
  const hiddenFileInputs = useRef(null)

  const handleClick = (e) => {
    hiddenFileInput.current.click()
}

const handleClicks = (e) => {
  hiddenFileInputs.current.click()
}

const dispatch = useDispatch()
const navigate = useNavigate()
const { profile, profileupdate, isLoading } = useSelector((state) => state.profile)
const { id } = useParams()

const [formdata, setFormdata] = useState({ handle: '', bio: '', location: ''})
let [img, setImg] = useState()
const [cover, setCover] = useState()

const { handle, bio, location } = formdata

  const handleChange = (e) => {
    e.preventDefault()
  const { name, value } = e.target
  setFormdata({...formdata, [name]:value })
console.log(formdata)
  }


  const submit = async(e) => {
    e.preventDefault()
let arr = [img, cover]

if(!arr){
  const data = new FormData();
  data.append('handle', handle)
  data.append('bio', bio)
  data.append('location', location)
  addEventForm(data)
}else{
   const data = new FormData();
   data.append('handle', handle)
   data.append('bio', bio)
   data.append('location', location)
   arr.map(file => {
    data.append('image', file)
})
   addEventForm(data)
}


}

const addEventForm = (dataprofile) => {
  if(prevPro){
     dispatch(profileUpdate({dataprofile, navigate, toast}))  
  }else{
  await Promise.all([dispatch(createProfile({dataprofile, toast})), dispatch(getProfile()) ])
    .then(() => {
      navigate('/');
    });
  }

}

const prevPro = profile.fetchProfile ?  profile.fetchProfile.map((azz) => azz._id).toString() : null
const prevProfileHandle = profile.fetchProfile ?  profile.fetchProfile.map((azz) => azz.handle).toString() : null
const prevProfileBio = profile.fetchProfile ?  profile.fetchProfile.map((azz) => azz.bio).toString() : null
const prevProfileLocation = profile.fetchProfile ?  profile.fetchProfile.map((azz) => azz.location).toString() : null


useEffect(() => {
 
  if(prevPro && prevProfileBio) {
    console.log({prevPro, prevProfileBio, prevProfileHandle, prevProfileLocation})
    setFormdata({ handle: prevProfileHandle, bio: prevProfileBio, location: prevProfileLocation})
}

}, [profile, navigate, prevPro])

if(profileupdate){
  dispatch(getProfile())
}

if(isLoading){
  return <Loading />
}

  return (
    <Container maxWidth='lg'>
      <Grid container justifyContent='center' alignItems='center' spacing={3} >
        <Grid item xs={12}  sm={6} >
          <Box sx={{ textAlign: 'center', padding: '1.2rem'}}>
            <Typography style={{ fontSize:'1rem'}} variant='h4'> Let { prevPro ? 'Update' : 'Create'} Your Profile </Typography>
          </Box>
          <Paper style={{ padding: '10px', margin: '20px', width: '400px', display: 'flex',  flexDirection: 'column',}}  elevation={6}>
            <div style={{ textAlign: 'center',  display: 'flex',  justifyContent: 'center',  alignItems: 'center'}}>
             <Person style={{ fontSize:'1rem'}}/>
              <Typography style={{ fontSize:'1rem'}} variant='h4'>profile</Typography>
            </div>
            <div style={{ height: '100%'}}>
             <form autoComplete='off' noValidate onSubmit={submit} >
             <TextField   variant='outlined' fullWidth label='create handle' name='handle' value={formdata.handle} onChange={handleChange} />
             <TextField   variant='outlined' multiline={true} rows={5} fullWidth label='write a little about yourself' name='bio' value={formdata.bio} onChange={handleChange} />
             <TextField   variant='outlined' fullWidth label='where is your location' name='location' value={formdata.location} onChange={handleChange} />      
         

           <div style={{ display: 'flex', padding:'1.2rem'}}>
               <div style={{ display: 'flex', cursor: 'pointer', width: '100%'}} onClick={handleClicks}>
                 <Image style={{ fontSize:'1rem'}}/> 
                 <Typography style={{ fontSize:'1rem'}} variant='h7'>Choose Profile Picture</Typography>
             </div>
             <div style={{ display: 'none'}} >
                 <input type='file' name='image'   onChange={e => {setImg(e.target.files[0])}} ref={hiddenFileInputs}/>
             </div> 
             </div>

             <div style={{ display: 'flex', padding:'1.2rem'}}>
               <div style={{ display: 'flex', cursor: 'pointer'}} onClick={handleClick}>
                 <Image style={{ fontSize:'1rem'}}/> 
                 <Typography style={{ fontSize:'1rem'}} variant='h7'>Choose Cover Photo</Typography>
             </div>
             <div style={{ display: 'none'}}>
                 <input type='file' name='image' onChange={(e) => setCover( e.target.files[0]) }  ref={hiddenFileInput} />
             </div> 
             </div> 

             <div style={{ margin: '10px 0'}}>
            <Button style={{ fontSize:'1rem'}} fullWidth  variant='contained' type='submit' color='primary'>{ prevPro ? 'Update' : 'Create'} </Button>
           </div>
            </form>
            </div>
        
            
          </Paper>
        </Grid>
      </Grid>

    </Container>

  )
}

export default CreateProfile
