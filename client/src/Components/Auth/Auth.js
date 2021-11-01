import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './Styles'
import Input from './Input'
import Icon from './Icon'

const Auth = () => {
    const classes = useStyles();
    const dispatch=useDispatch();
    const history=useHistory();
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSihnup] = useState(false)

    const handleSubmit = () => {

    }

    const handleChange = () => {

    }
    const switchMode = () => {
        setIsSihnup((prevIsSignup) => !prevIsSignup)
        handleShowPassword(false)

    }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    const googleSuccess = async (res)=>{
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch ({type :'AUTH', data:{result,token}})
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure=()=>{
        console.log("Google Sign in was unsuccessgul. try again Later")
    }

    return (
        <Container component='main' maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="firstName" handleChange={handleChange} autoFocus half />
                                    <Input name="firstName" label="firstName" handleChange={handleChange} autoFocus half />

                                </>
                            )
                        }
                        <Input name="email" label="Email Adress" handleChange={handleChange} type="email" />
                        <Input name="password" label="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign in"}
                    </Button>
                    <GoogleLogin
                        clientId="735091381689-1lsv7jv8k2q180rpm332lvh96k15dn8t.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Button Sign in
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : 'Dont have an account? Sign up'}
                            </Button>
                        </Grid>


                    </Grid>

                </form>
            </Paper>

        </Container>
    )
}

export default Auth
