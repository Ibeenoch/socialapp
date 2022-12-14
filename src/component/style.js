import { makeStyles } from '@material-ui/core'

const makeStyle= makeStyles((theme) => ({
    logo: {
        display: 'flex',
        
    },
    bar: {
     width: '100%'
    },
    social: {
        marginTop: '20px',
        fontSize: '1rem'
    },
    logoImg: {
        width: '50px',
        height: '50px',
    },
    logoSpacing: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.3rem 1.3rem',
        
    },

    heading: {
        textAlign: 'center',
        fontWeight: 600,
    },
  

}))

export default makeStyle;