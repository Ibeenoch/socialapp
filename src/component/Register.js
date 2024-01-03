import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../features/userSlice'
import { toast } from 'react-toastify'
import './app.css'
import Loading from './SideThree/Loading'


const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isSuccess, isError, message, isLoading } = useSelector((state) => (state.user))

const [formdata, setFormdata] = useState({
  name:'', email:'', password:''
})

const { name, email, password } = formdata;

  const handleChange = (e) => {
    e.preventDefault()
  const { name, value } = e.target
  setFormdata({...formdata, [name]:value })
  console.log(formdata)
  }

  
  const submit = (e) => {
    e.preventDefault()
    if(name && email && password ){
       dispatch(register({formdata, navigate, toast}))
    }
   
  }

if(isLoading){
  return <Loading />
}

  return (
    <Container maxWidth='lg'>
      <Grid container justifyContent='center' alignItems='center' spacing={3} >
        <Grid item xs={10}  sm={6} >
          <Box sx={{ textAlign: 'center', padding: '0.7rem', fontWeight: '200'}}>
            <Typography variant='h7' > Welcome to Social App </Typography>
          </Box>
          <Paper style={{ padding: '2px', margin: '5px', width: 'auto', display: 'flex',  flexDirection: 'column',}}  elevation={6}>
            <div style={{ textAlign: 'center',  display: 'flex', justifyContent: 'center',  alignItems: 'center'}}>
              <LockOutlined />
              <Typography variant='h6'>Sign Up</Typography>
            </div>
            <div style={{ height: '100%'}}>
             <form autoComplete='off' noValidate onSubmit={submit} >
             <TextField  className='text' variant='outlined' fullWidth label='name' name='name' value={formdata.name} onChange={handleChange} />
             <TextField  className='text' variant='outlined' fullWidth label='email' name='email' value={formdata.email} onChange={handleChange} />
             <TextField className='text'  variant='outlined' fullWidth label='password' name='password' value={formdata.password} onChange={handleChange} />
           <div style={{ margin: '10px 0'}}>
            <Button style={{ fontSize:'1rem' }} fullWidth  variant='contained' type='submit' color='primary'>Sign Up</Button>
           </div>
            </form>
            </div>
            <div className='link'>
              <Typography variant='h8'>Already have an account ? <Link style={{ fontSize:'1rem' }} to='/login'>Click here to Sign In</Link> </Typography>

            </div>
            
          </Paper>
        </Grid>
      </Grid>

    </Container>

  )
}

export default Register
