import { Box, TextField } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { ArrowBack, Image } from '@material-ui/icons'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useRef, useState, useEffect} from 'react'
import '../app.css'
import { createPost, updatePost } from '../../features/blogSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loading from '../SideThree/Loading'


const Postpage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const { user } = useSelector((state) => state.user)
    const { isLoading } = useSelector((state) => state.blogs)
    const { profile } = useSelector((state) => state.profile)
    const [img, setImg] = useState(null)
   
const [word, setWord] = useState({
    post:''
 })
 
 const { post } = word

const prevPost = useSelector((state) => id ? state.blogs.blogg.find((item) => (item._id === id)) : null )

useEffect(() => {
    if(!user){
        navigate('/login')
    }
  
    if(prevPost && id) {
        setWord({ post: prevPost.post })
   }
    

}, [user, navigate, id])
 
   const handleChange = (e) => {
     e.preventDefault()
   const { name, value } = e.target
   setWord({...word, [name]:value })
   console.log(word)
   }


    const hiddenFileInput = useRef(null)

    const handleClick = (e) => {
        hiddenFileInput.current.click()
    }


    const handleChangeFile = (e) => {
 
       setImg(e.target.files[0])
      console.log(img)
    }


    const goHome = () => {
        navigate('/')
    }


    const submit = (e) => {
        e.preventDefault()
        console.log(post)
        console.log(img)

        if(!img){
            const postdata = new FormData()
            postdata.append('post', post)
            completesubmit(postdata)  
        }else{
           const postdata = new FormData()
           postdata.append('img', img)
           postdata.append('post', post)
           completesubmit(postdata)  
        }
        
    }

    const completesubmit = (data) =>{
       console.log({_data: data})
        if(id){
            dispatch(updatePost({id, data, navigate, toast}))
        }else{
            dispatch(createPost({data, navigate, toast}))
        }
    }

    if(isLoading){
        return <Loading />
      }

  return (

      <div style={{width: '100℅', height: 'auto', display: 'flex', border:'1px solid black', borderRadius: '1.2rem',  flexDirection: 'column', marginTop: '2rem' }}>
          <Box>
              <form onSubmit={submit}>
              <div style={{display: 'flex', height: 'auto', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid black'}}>
                  <div style={{cursor: 'pointer'}} onClick={goHome}>
                      <ArrowBack style={{fontSize:'1rem'}} />  
                  </div>
                  <div>
                  <Typography style={{fontSize:'1rem'}} variant='h7'>{id ? 'Update Post' : 'Create Post'}</Typography>
                  </div>
                  <div style={{ border: '1px solid black', borderRadius: '1.2rem', padding: '0.6rem 1.2rem', cursor:'pointer'}}>
                   <button type='submit' style={{border: 'none', background: 'none', fontSize: '1rem', cursor:'pointer'}}>Post</button>    
                  </div>
              </div>

              <div style={{display: 'flex', paddingLeft: '1.2rem', marginTop: '1rem', paddingBottom: '1rem', borderBottom: '1px solid black'}}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', cursor:'pointer'}}>
                      <img src={user.user.profilepics.url || profile.fetchProfile.map((item) => item.profilepics.url)} style={{ width: '30px', height: '30px', borderRadius: '50%'}} alt="users image" />
                  </div>
                  <div style={{marginLeft: '1rem'}}>
                       <Typography style={{fontSize:'1rem'}} variant='h6' >{user.user.handle || profile.fetchProfile.map((item) => item.handle)}</Typography>
                  </div>
                 
             </div>
              
             <div className="post" style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
             <TextField multiline={true} style={{fontSize:'0.7rem'}} rows={10}  className='text' variant='outlined' fullWidth label="what's on your mind " name='post' value={word.post} onChange={handleChange} />
              <div style={{ padding: '1.2rem', cursor:'pointer'}}>
                  <div style={{ display: 'flex', justifyContent:'center'}} onClick={handleClick}>
                     <Image style={{fontSize:'1rem', marginTop:'0.3rem'}} /> 
                     <Typography variant='h6' style={{marginRight: '1rem', fontSize:'1rem' }}>Add Photo/Images</Typography>
                  </div>
                  <div style={{ display: 'none'}}>
                     <input  ref={hiddenFileInput} onChange={handleChangeFile} type="file" name='image' />  
                  </div>
                 
              </div>
             </div>
          </form>  
          </Box>
         

      </div>


  )
}

export default Postpage
