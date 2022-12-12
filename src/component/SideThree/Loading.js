import React from 'react'
import { CircularProgress } from '@material-ui/core'

const Loading = () => {
  return (
    <div style={{marginLeft: `calc(100vw / 2)`, marginTop: `calc(80vh / 2)`}}>
        <div>Loading...</div>
        <CircularProgress />
    </div>
  )
}

export default Loading
