import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from './api'
import storage from 'redux-persist/lib/storage'

const initialState = {
    profile: {},
    allProfile: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    profilestatus: false,
    profileupdate: false,
    message: ''
}

export const createProfile = createAsyncThunk('/profile/create', async({dataprofile, toast}, thunkAPI) => {
    try {
   return await api.createProfile({dataprofile, toast})

    } catch (error) {
        const message = error.response || error.response.data
        return thunkAPI.rejectWithValue(message)
    }
}) 

export const getProfile = createAsyncThunk('/profile/get', async({ navigate }, thunkAPI) => {
    try {
      
        return await api.getProfile({ navigate })
    } catch (error) {
        const message = error.response || error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

export const profileUpdate = createAsyncThunk('/profile/update', async({ dataprofile, navigate, toast }, thunkAPI) => {
    try {
      
        return await api.updateProfile({ dataprofile, navigate, toast })
    } catch (error) {
        const message = error.response || error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllProfile = createAsyncThunk('/profile/getall', async(_, thunkAPI) => {
    try {
      
        return await api.allProfile()
    } catch (error) {
        const message = error.response || error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})



const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers : {
        resett: (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.profile = null
        },
        resetProfile: () => {
            storage.removeItem('persist:root')
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createProfile.pending,  (state, action)=> {
            state.isLoading = true;
        })
        .addCase(createProfile.fulfilled, (state, action) => {
            state.isLoading=false;
            state.isSuccess=true;
           // state.profilestatus=true
            state.profile = action.payload

        })
        .addCase(createProfile.rejected, (state, action) => {
            state.isLoading=false;
            state.isError = true
            state.message = action.payload
        })
        .addCase(getProfile.pending,  (state, action)=> {
            state.isLoading = true
        })
        .addCase(getProfile.fulfilled, (state, action) => {
            state.isLoading=false
            state.isSuccess=true
            state.profilestatus=true
            state.profileupdate = false
            console.log(action)
            state.profile = action.payload
       
        })
        .addCase(getProfile.rejected, (state, action) => {
            state.isLoading=false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getAllProfile.pending,  (state, action)=> {
           state.isLoading=false
 
        })
        .addCase(getAllProfile.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess=true
            console.log(action)
            state.allProfile = action.payload
       
        })
        .addCase(getAllProfile.rejected, (state, action) => {
            state.isLoading=false
            state.isError = true
            state.message = action.payload
        })
        .addCase(profileUpdate.pending,  (state, action)=> {
            state.isLoading=true
  
         })
         .addCase(profileUpdate.fulfilled, (state, action) => {
             state.isLoading = false
             state.isSuccess=true
             state.profileupdate = true
             console.log(action)
         })
         .addCase(profileUpdate.rejected, (state, action) => {
             state.isLoading=false
             state.isError = true
             state.message = action.payload
         })
    }

})

export const { resett, resetProfile } = profileSlice.actions
export default profileSlice.reducer
