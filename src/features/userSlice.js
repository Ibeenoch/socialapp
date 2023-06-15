import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from './api'
import localStorage from 'redux-persist/es/storage'


const user = localStorage.getItem('user');
const allUser = localStorage.getItem('allUser')
const followers = localStorage.getItem('followers')
const following = localStorage.getItem('following')
const followingmessage = localStorage.getItem('followingmessage')
const userfollowing = localStorage.getItem('userfollowing')

const initialState = {
    
    isLoading: false,
    isError: false,
    loggedin: false,
    registered: false,
    isSuccess: false,
    isDeleted: false,
    user: user ? user : null,
    registeruser: user ? user : null,
    allUser: allUser ? allUser : {},
    followed: false,
    followers: followers ? followers : null,
    following: following ? following : null,
    userfollowing: userfollowing ? userfollowing : null,
    followingmessage: followingmessage ? followingmessage : null,
}


 export const login = createAsyncThunk('user/login', async({formdata, navigate, toast}, thunkAPI) => {
    try {
      const response = await api.login(formdata)
      toast.success('Welcome, now let create your profile')
      
      return response.data
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

export const register = createAsyncThunk('user/register', async({formdata, navigate, toast}, thunkAPI ) => {
    try {
        const response = await api.register(formdata)
      
         navigate('/createprofile')
        toast.success('Congratulations you are now a member') 
  
        return response.data
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
}) 

export const findme = createAsyncThunk('user/me', async(id, thunkAPI ) => {
    try {
      return await api.getMe(id);
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
}) 

export const findaPerson = createAsyncThunk('user/person', async(id, thunkAPI ) => {
    try {
        console.log("getPersonSlice: ", id);
      return await api.getPerson(id)  
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
}) 


export const alluser = createAsyncThunk('user/alluser', async(_, thunkAPI ) => {
    try {
      return  await api.allUser()  
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
}) 


export const getFollowers = createAsyncThunk('user/getFollowers', async(_, thunkAPI ) => {
    try {
      return  await api.followers()  
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
}) 

export const getFollowing = createAsyncThunk('user/getFollowing', async(_, thunkAPI ) => {
    try {
      return  await api.following()  
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
}) 

export const followUnfollow = createAsyncThunk('user/followunfollow', async({id, toast, userId}, thunkAPI) => {
    try {
        return await api.followunfollow({id, toast, userId})
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteAccount = createAsyncThunk('user/delete', async({ navigate, toast }, thunkAPI) => {
    try {
        return await api.deleteuser({ navigate, toast })
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state, action) => {
            state.isLoading= false;
            state.isError= false;
            state.isSuccess= false;
            state.message = '';
            
        },
        setLogin: (state, action) => {
            state.user = action.payload
        },
   
        setLogout: (state, action) => {
           localStorage.removeItem('user')
           localStorage.removeItem('allUser')
           localStorage.removeItem('allPost')
           localStorage.removeItem('followers')
           localStorage.removeItem('userfollowing')
           localStorage.removeItem('following')
           localStorage.removeItem('followingmessage')
           localStorage.removeItem('registeruser')
           state.user = null
           state.allUser = null
           state.loggedin = false
           state.registered = false

        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state, action) => {
         state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.loggedin = true;
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(register.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.registered = true;
            state.isSuccess = true;
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.user = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
        .addCase(findme.pending, (state, action) => {
            state.isLoading = false;
        })
        .addCase(findme.fulfilled, (state, action) => {
            state.isSuccess = true
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
            console.log(action.payload)
        })
        .addCase(findme.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
        .addCase(deleteAccount.pending, (state, action) => {
            state.isLoading = false
        })
        .addCase(deleteAccount.fulfilled, (state, action) => {
            console.log(action.payload)
            state.isDeleted = true 
        })
        .addCase(deleteAccount.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
        .addCase(alluser.pending, (state, action) => {
            state.isLoading = false
        })
        .addCase(alluser.fulfilled, (state, action) => {
            state.isSuccess = true
            state.allUser = action.payload
            localStorage.setItem('allUser', JSON.stringify(action.payload))
            console.log(action.payload)
        })
        .addCase(alluser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
        .addCase(findaPerson.pending, (state, action) => {
           // state.isLoading = false
        })
        .addCase(findaPerson.fulfilled, (state, action) => {
            state.isSuccess = true
            state.userfollowing = action.payload
            localStorage.setItem('userfollowing', JSON.stringify(action.payload))
            console.log(action.payload)
        })
        .addCase(findaPerson.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
        .addCase(getFollowers.pending, (state, action) => {
            state.isLoading = false
        })
        .addCase(getFollowers.fulfilled, (state, action) => {
            state.isSuccess = true
            state.followers = action.payload
            localStorage.setItem('followers', JSON.stringify(action.payload))
            console.log(action.payload)
        })
        .addCase(getFollowers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
        .addCase(getFollowing.pending, (state, action) => {
            state.isLoading = false
        })
        .addCase(getFollowing.fulfilled, (state, action) => {
            state.isSuccess = true
            state.following = action.payload
            localStorage.setItem('following', JSON.stringify(action.payload))
            console.log(action.payload)
        })
        .addCase(getFollowing.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
        .addCase(followUnfollow.pending, (state, action) => {
            state.isLoading = false
        })
        .addCase(followUnfollow.fulfilled, (state, action) => {
            state.isSuccess = true
            state.followed = true
            state.followingmessage = action.payload.message
            localStorage.setItem('followingmessage', JSON.stringify(action.payload.message))
            state.userfollowing = action.payload.user
            localStorage.setItem('userfollowing', JSON.stringify(action.payload.user))
            
            console.log(action.payload)
        })
        .addCase(followUnfollow.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
    }
})

export const {  reset, setLogout, setLogin } = userSlice.actions
export default userSlice.reducer
