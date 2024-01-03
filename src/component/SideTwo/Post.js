import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Input,  Typography} from '@material-ui/core'
import { More, ThumbUpAlt, Comment,  Bookmark, Send, MoreHorizOutlined, MoreHoriz } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, getComment, getPost, likePost } from '../../features/blogSlice'
import { toast } from 'react-toastify'


const Post = ({ post }) => {
const navigate = useNavigate()
const dispatch = useDispatch()
const [show, setShow] = useState(false)
const [fullscreen, setFullscreen] = useState(false)
const [visible, setVisible] = useState(true)
const [hidden, setHidden] = useState(false)
const { profile } = useSelector((state) => state.profile )
const { likes, isDeleted, isLiked } = useSelector((state) => state.blogs )
const { user } = useSelector((state) => state.user )


const handleshow = () => {
  setShow(!show)
}

useEffect(() => {
if(post.owner.handle !== user.user.handle){
setHidden(true)
}
}, [])



const handlevisible = () => {
  setVisible(!visible)
}

const comments = () => {
  dispatch(getComment(post._id)) &&  navigate(`/comment/${post._id}`)
}


const handledelete = async() => {
  if(window.confirm('Are You Sure You Want To Delete This Post')){
     const postId = post._id   
 return await Promise.all([dispatch(deletePost({ postId })), dispatch(getPost())])    

  }
 }

 let id = post._id
 const findpost = useSelector((state) => id ? state.blogs.blogg.find((item) => (item._id=== id)) : null )

  const handlelike = async() => {
    const postId = post._id    
    dispatch(likePost({postId})) 
    }

    const viewimg = () => {
     navigate(`/view/${post._id}`)
    }

    if(isLiked){
      console.log('liked')
      dispatch(getPost())
    }

    if(isDeleted){
      console.log('isDeleted')
      dispatch(getPost())
    }
    
      const editPost = () => {
        navigate('/postpage')
      }

 

      const hide = (e) =>{
       e.target.style.display = 'none'
      }
    return (
        <div style={{ background: 'gray'}}>
         <Box sx={{ backgroundColor: 'white', borderRadius: '1.2rem', marginTop: '0.4rem', width: '100%', marginBottom: '0.4rem'}}>

<div style={{ display: 'flex', justifyContent: 'space-between', padding:'1.2rem'}} >

 <div  style={{display: 'flex', padding: '0.6rem', alignItems: 'center'}}>
  <img src={post.owner.profilepics.url} onError={hide} style={{ width:'40px', cursor: 'pointer', height: '40px', borderRadius: '50%', marginRight: '0.5rem'}} />
  <div className="header" style={{ display: 'flex', flexDirection: 'column'}}>
    <Typography variant='h9'>{post.owner.name} </Typography>
    <Typography style={{fontSize:'0.8rem'}} variant='h9'>{post.createdAt.slice(0, 10)} </Typography>
  </div>
</div>

   <div className="logo"  style={{cursor: 'pointer', display: (hidden ? 'none': 'block'  ) }}>
    <div onClick={handleshow}   style={{display: (show ? 'none': 'block'  ), marginTop:'0.7rem' }}>
      <MoreHoriz />
      </div> 

<div  onBlur={handleshow}  style={{display: (show ? 'flex' : 'none'), right: '20vw' ,border: '0.3px solid grey' , fontSize: '1rem',cursor: 'pointer', justifyContent: 'center', alignItems: 'center',  flexDirection: 'column', position: 'absolute' , width:'auto', height: '60px', background: 'white', borderRadius: '1rem'}}>
 <Link to={`/postpage/${post._id}`} style={{color: 'black'}}>
 <div ><Typography style={{fontSize:'1rem'}} variant='h9'  >Edit</Typography> </div>
 </Link>  
   <div onClick={handledelete}>
     <Typography style={{fontSize:'1rem'}} variant='h9' >Delete</Typography> 
     </div>
   </div>
   </div>
 
</div>


<div style={{ 'padding': '0.4rem'}}>
      <Typography variant='h7' >{post.post}</Typography>
</div>

<div className="post-img" style={{  padding: '0.4rem'}}>
  {!post.img ? (<div></div>) : (<img onClick={viewimg} className="view" src={post.img.url} style={{ width: fullscreen ? '100vw' : '100%', height: fullscreen ? '100vh' : 'auto', borderRadius:'1.2rem', cursor:'pointer'}} />
)
}
</div>

<div className="icon" style={{display: 'flex', justifyContent: 'space-between', padding: '0.4rem'}}>
<div className="left" style={{display: 'flex', columnGap: '0.5rem'}}>
 <div style={{ cursor:'pointer' }} onClick={handlelike}>
  {post.likes.length} <ThumbUpAlt style={{fontSize:'0.7rem'}}/> 
   </div>
 <div onClick={comments}>{post.comments.length} <Comment style={{fontSize:'0.5rem', cursor:'pointer'}} /> </div>

</div>

<div className="right">
 <Bookmark style={{fontSize:'1rem'}} />
</div>
</div>

<Box onClick={comments} sx={{display: 'grid', gridTemplateColumns: '3vw auto', padding: '0.5rem', background: 'white'}}>
<img src={profile.fetchProfile.map((item) => item.profilepics.url)} style={{width: '40px', zIndex:'3', height: '40px', borderRadius: '50%'}} />
<div style={{ background: 'white', display: 'flex', background: 'white'}}>
 <Input style={{fontSize:'0.7rem', marginLeft:'1rem'}} placeholder='write a comment' variant="contained" fullWidth/>
 <Send style={{fontSize:'1rem', marginTop:'0.7rem'}}/>
</div>
</Box>

</Box >   
</div>
    )
}

export default Post
