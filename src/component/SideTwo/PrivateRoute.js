import React from 'react'
import { useSelector } from 'react-redux'
import Redirect from './Redirect'

const PrivateRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('user'));
console.log('seeUser: ', user);
    
    return user ? children : <Redirect />
}

export default PrivateRoute
