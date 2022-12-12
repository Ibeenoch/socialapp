import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {
    const [count, setCount] = useState(5)
    const navigate = useNavigate()
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((curr)=> --curr)
        }, 1000)

        count === 0 && navigate('/login')
        return () => clearInterval(interval)
    }, [count, navigate])
  return (
    <h1 style={{ margin:'4rem'}}>Redirecting you in {count} seconds, please login again to continue </h1>
  )
}

export default Redirect
