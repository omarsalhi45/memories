import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import {useHistory} from 'react-router-dom'

function Form({currentId, setCurrentId}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'))
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)
    const [postData, setPostData] = useState({  title: '', message: '', tags: '', selectedFile: '' })
    useEffect(() =>  {
        if (post) setPostData(post)
    }, [post])


    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, {...postData,name : user?.result?.name }));   
                  
        }
        else {
            dispatch(createPost({...postData,name : user?.result?.name },history));
            
        }
        clear()

    }
    const clear = () => {
            setCurrentId(0)
            setPostData({  title: '', message: '', tags: '', selectedFile: '' })
    }
    if(!user?.result?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Inscrivez vous pour pouvoir créez votre propre mémoire
                </Typography>
            </Paper>
        )
    }
    return (
        <Paper className={classes.paper}elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant="h6"> {currentId ? 'Editing' : 'Creating'} a Memory </Typography>
                <TextField name="Title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="Message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="Tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
            </form>
        </Paper>
    )
}

export default Form
