import axios from 'axios'
const url = 'https://socialbackend.onrender.com';

export const login = async (formdata) => await axios.post(`${url}/user/login`, formdata)
export const register = async (formdata) => await axios.post(`${url}/user/register`, formdata)
export const getMe = async() => {
     const { token} = JSON.parse(localStorage.getItem('user'))

     const option = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    
    }
  const response = await fetch(`${url}/user/me`, option )

  const data = await response.json()

console.log(data)
return data

}


  export const getPerson = async(id) => {

      const { token} = JSON.parse(localStorage.getItem('user'))
 
      const option = {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Authorization': `Bearer ${token}`,
       },
     
     }
   const response = await fetch(`${url}/user/findperson/${id}`,  option )
 
   const data = await response.json()

 
 console.log(data)
 return data[0]
}


export const createProfile = async({dataprofile, toast}) => {
  const { token } = JSON.parse(localStorage.getItem('user'))

  console.log(token) 
  const option = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: dataprofile
  }
  const response = await fetch(`${url}/profile/create`, option)

  if(response){
       toast.success('profile created');
    console.log(response.data)
   return response.data
  }
  
  
  
}

export const getProfile = async() => {

    const { token} = JSON.parse(localStorage.getItem('user'))

    const option = {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Authorization': `Bearer ${token}`,
     },
   
   }
 const response = await fetch(`${url}/profile/me`,  option )

 const data = await response.json()

console.log(data)
return data


}


export const viewAllPost = async() => {

  const { token} = JSON.parse(localStorage.getItem('user'))

  const option = {
   method: 'GET',
   headers: {
     'Accept': 'application/json',
     'Authorization': `Bearer ${token}`,
   },
 
 }
const response = await fetch(`${url}/api/viewallpost`,  option )

const data = await response.json()


console.log(data)
return data

}

export const getComment = async( id ) => {

  const { token} = JSON.parse(localStorage.getItem('user'))

  const option = {
   method: 'GET',
   headers: {
     'Accept': 'application/json',
     'Authorization': `Bearer ${token}`,
   },
 
 }
const response = await fetch(`${url}/api/getcomment/${id}`,  option )

const data = await response.json()


console.log(data)
return data

}



export const updateProfile = async({ dataprofile, navigate, toast }) => {

 
    const { token } = JSON.parse(localStorage.getItem('user'))
  
    console.log(token) 
    const option = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: dataprofile
    }
    const response = await fetch(`${url}/profile/update`, option)
  
    if(response){
      navigate('/profile')
    toast.success('Profile updated') 
  } 
 
    
    console.log(response.data)
     return response.data
 
 }
 

export const createPost = async({data, navigate, toast}) => {
 

    const { token } = JSON.parse(localStorage.getItem('user'))
  
    console.log(token) 
    const option = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: data
    }
    const response = await fetch(`${url}/api/post/create`, option)
  
    if(response){
      navigate('/')
       toast.success('post successful')   
     }   

    console.log(response.data)
     return response.data
}

export const updatePost = async({id, data, navigate, toast}) => {

  const { token } = JSON.parse(localStorage.getItem('user'))

  console.log(token) 
  const option = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: data
  }
  const response = await fetch(`${url}/api/postupdate/${id}`, option)

  const dataa = await response.json()

  if(dataa){
    navigate('/')
  toast.success('post updated') 
} 
  
  console.log({dataa: dataa})
   return dataa

} 


export const getPost = async() => {

    const { token } = JSON.parse(localStorage.getItem('user'))

    const option = {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Authorization': `Bearer ${token}`,
     },
   
   }
 const response = await fetch(`${url}/api/allpost`, option )

 const data = await response.json()

return data
}

export const getPostOfPerson = async(id) => {

    const { token} = JSON.parse(localStorage.getItem('user'))

    const option = {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Authorization': `Bearer ${token}`,
     },
   
   }
 const response = await fetch(`${url}/api/post/${id}`, option )

 const data = await response.json()

console.log(data)
return data

}

  export const getMyPost = async() => {

      const { token} = JSON.parse(localStorage.getItem('user'))
 
      const option = {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Authorization': `Bearer ${token}`,
       },
     
     }
   const response = await fetch(`${url}/api/mypost`, option )
 
   const data = await response.json()
 
 console.log(data)
 return data
 
    
}

export const deletePost = async({ postId }) => {

    const { token} = JSON.parse(localStorage.getItem('user'))

    const option = {
     method: 'DELETE',
     headers: {
       'Authorization': `Bearer ${token}`,
     },
   
   }
 const response = await fetch(`${url}/api/deletepost/${postId}`,  option )

 const data = await response.json()

console.log(data)
return data

 }

export const likePost = async({postId}) => {

    const { token} = JSON.parse(localStorage.getItem('user'))

    const option = {
     method: 'PUT',
     headers: {
       'Accept': 'application/json',
       'Authorization': `Bearer ${token}`,
     },
   
   }
 const response = await fetch(`${url}/api/post/likes/${postId}`, option )

 const data = await response.json()


console.log(data)
return data

 }

 export const allUser = async () => {

    const { token} = JSON.parse(localStorage.getItem('user'))

    const option = {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Authorization': `Bearer ${token}`,
     },
   
   }
 const response = await fetch(`${url}/user`, option )

 const data = await response.json()

console.log(data)
return data

}

 export const followers = async () => {

    const { token} = JSON.parse(localStorage.getItem('user'))

    const option = {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Authorization': `Bearer ${token}`,
     },
   
   }
 const response = await fetch(`${url}/user/followers`, option )

 const data = await response.json()



console.log(data)
return data

 }

 export const following = async () => {

    const { token} = JSON.parse(localStorage.getItem('user'))

    const option = {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Authorization': `Bearer ${token}`,
     },
   
   }
 const response = await fetch(`${url}/user/following`, option )

 const data = await response.json()


console.log(data)
return data

 }

 export const deleteuser = async({ navigate, toast }) => {

    const { token } = JSON.parse(localStorage.getItem('user'))

    const option = {
     method: 'DELETE',
     headers: {
       'Authorization': `Bearer ${token}`,
     },
   
   }
 const response = await fetch(`${url}/user/delete`,  option )

 const data = await response.json()

 if(response){
    navigate('/login')
    toast.success('user deleted')
  }

console.log(data)
return data
}
 

 export const allProfile = async () => {

    const { token} = JSON.parse(localStorage.getItem('user'))

    const option = {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Authorization': `Bearer ${token}`,
     },
   
   }
 const response = await fetch(`${url}/profile`, option )

 const data = await response.json()


console.log(data)
return data
 }



 export const followunfollow = async({id}) => {

    const { token} = JSON.parse(localStorage.getItem('user'))

    const option = {
     method: 'PUT',
     headers: {
       'Accept': 'application/json',
       'Authorization': `Bearer ${token}`,
     },
   
   }
 const response = await fetch(`${url}/user/follow/${id}`, option )

 const data = await response.json()

console.log(data)
return data

 } 

 export const postComment = async({comments, id}) => {

    const { token } = JSON.parse(localStorage.getItem('user'))
  
    console.log(token) 
    const option = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(comments)
    }
    const response = await fetch(`${url}/api/comment/${id}`, option)

    const  data = await response.json()
    console.log({comment : data })
     return data
 } 
