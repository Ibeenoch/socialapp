import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { LockOpen } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProfile } from '../features/profileSlice'
import { login } from '../features/userSlice'
import Loading from './SideThree/Loading'


const Login = () => {
const dispatch = useDispatch()
const navigate = useNavigate()
const { isError, isLoading, user, registered, loggedin } = useSelector((state) => state.user)
const { profile, profilestatus } = useSelector((state) => state.profile)


const [formdata, setFormdata] = useState({
   email:'', password:''
})

const { email, password } = formdata
  const handleChange = (e) => {
    e.preventDefault()
  const { name, value } = e.target
  setFormdata({...formdata, [name]:value })
  console.log(formdata)
  }

  useEffect(() => {
    console.log({ profile: profile})
  }, [])

  useEffect(() => {
    if( loggedin ){ 
      navigate('/')
    }
  }, [ loggedin, navigate])



  const submit = (e) => {
    e.preventDefault()
    if(email && password){
    dispatch(login({formdata, toast}))
    }
  }

  if(isLoading){
    return <Loading />
  }

  return (
    <Container maxWidth='lg'>
      <Grid container justifyContent='center' alignItems='center' spacing={3} >
        <Grid item xs={10}  sm={6} >
          <Box sx={{ textAlign: 'center', padding: '0.8rem', fontWeight: '200'}}>
            <Typography variant='h6'> Welcome to Social App </Typography>
          </Box>
          <Paper style={{ padding: '2px', margin: '5px', width: 'auto', display: 'flex',  flexDirection: 'column',}}  elevation={6}>
            <div style={{ textAlign: 'center',  display: 'flex', justifyContent: 'center',  alignItems: 'center'}}>
              <LockOpen />
              <Typography variant='h6'>Sign In</Typography>
            </div>
            <div style={{ height: '100%'}}>
             <form autoComplete='off' noValidate onSubmit={submit} >
             <TextField  className='text' variant='outlined' fullWidth label='email' name='email' value={formdata.email} onChange={handleChange} />
             <TextField className='text'  variant='outlined' fullWidth label='password' name='password' value={formdata.password} onChange={handleChange} />
           <div style={{ margin: '10px 0'}}>
            <Button style={{ fontSize:'1rem' }} fullWidth  variant='contained' type='submit' color='primary'>Sign In</Button>
           </div>
            </form>
            </div>
            <div className='link'>
              <Typography variant='h8'>Don't have an account ? <Link style={{ fontSize:'1rem' }} to='/register'>Click here to Sign up</Link> </Typography>

            </div>
            
          </Paper>
        </Grid>
      </Grid>

    </Container>

  )
}

export default Login
