import { Box, TextField, Typography } from '@material-ui/core'
import { ArrowBack, MenuOpenOutlined, Send } from '@material-ui/icons'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getComment, getPost, postComment } from '../../features/blogSlice'
import Comments from './Comments'

const Comment = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const {profile, allProfile} = useSelector((state) => state.profile)
    const {isLoading, user, followed, allUser} = useSelector((state) => state.user)
    const { blogg, isSuccess, updated, commentz, makecomment } = useSelector((state) => state.blogs )


    if(makecomment){
      dispatch(getComment(id))
    }

    const [word, setWord] = useState({
      comments: {
        comment: ''
      }   
   })
   
   const { comment, comments } = word

   const findcomment = useSelector((state) => id ? state.blogs.blogg.find((item) => (item._id === id)) : null )
   const times = findcomment.createdAt

   const handleChange = (e) => {
    e.preventDefault()
  const { name, value } = e.target
  setWord(prevState => {
    return {
        ...prevState, 
        comments: {
          ...prevState.comments,
           comment: value
        }
    }
  })
  console.log({ 'comments': comments}) 
  }
   
    const backHome = () => {
        navigate('/')
    }

    const handlecomment = (e) => {
      e.preventDefault()
      console.log(comments)
      
     return Promise.all([dispatch(postComment({comments, id})), dispatch(getPost())]) 
 
  }


 
  return (
    <div style={{ width: '100℅', height: '100vh', margin: '1rem 0.5rem', borderRadius: '1.2rem'}}>
        <Box sx={{ width: '100%', height:'100vh', background: 'white', borderRadius: '1.2rem', boxShadow: '0 0 1rem gray'}} >
          <div style={{background: 'gray', borderTopLeftRadius: '1.2rem', borderTopRightRadius: '1.2rem', color: 'white'}}>
              <Typography variant='h5' align='center' style={{ fontSize: '0.8rem', paddingTop: '0.7rem'}} >Comment</Typography>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'gray', padding: '1rem'}}>
         <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', columnGap: '1.2rem'}}>
              <div onClick={backHome} style={{cursor: 'pointer'}}>
                  <ArrowBack />
              </div>
              <div>
                <img src={user.user.profilepics.url || profile.fetchProfile.map((item) => item.profilepics.url)} style={{width: '40px', height: '40px', borderRadius: '50%'}} />
              </div>  
              <div>
                <Typography style={{ fontSize: '1rem'}} variant='h4'>{user.user.name} </Typography>
             </div>
          </div>

          <div>
              <MenuOpenOutlined />
          </div>
          </div>


          <div style={{display: 'flex', flexDirection: 'column'}}>
          {commentz.map((cm) => (
            cm.comments.map((post)=> (
                      <Comments key={post._id} post={post} times={times} />
            ))
           ))}
          </div>

         
        <form onSubmit={handlecomment}>
             <div style={{ display: 'flex', marginTop:'100vh', justifyContent:'center', alignItems:'center', alignContent:'center', borderRadius: '1.2rem', background: 'white', boxShadow: '0 0 0.4rem gray', width: '100%', padding: '0.5rem' }}>
              <TextField style={{ fontSize: '1rem', border:'none', paddingLeft:'1.5rem', textAlign:'center', marginTop:'-1rem'}} type='text'  fullWidth label="write a comment " name='comments[omment]' value={word.comments.comment} onChange={handleChange} />
             <button  style={{ fontSize: '1rem', border:'none', background:'none', cursor:'pointer', marginRight:'0.7rem'}} type='submit' >
                 <Send />
             </button>
              </div>
             
          </form> 
       
        </Box>
    </div>
  )
}

export default Comment
