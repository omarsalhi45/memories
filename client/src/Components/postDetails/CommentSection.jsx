import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { commentPost } from '../../actions/posts'
import useStyles from './Styles'

const CommentSection = ({ post }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const commentsRef=useRef();
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const user = JSON.parse(localStorage.getItem('profile'))

    const handleClick = async () => {
        const finalComment = `${user.result.name} : ${comment}`
        const newComments = await dispatch(commentPost(finalComment, post._id))
        setComments(newComments)
        setComment('')
        commentsRef.current.scrollIntoView({behavior:'smooth'})
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6" >comments</Typography>
                    {comments.map((c, i) => (
                        <Typography variant="subtitle1" key={i} gutterBottom>
                             <strong>{c.split(': ')[0]}</strong>
                             {c.split(': ')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef}/>
                </div>
                {user?.result?.name && (
                    <div style={{ width: '70%' }} >
                        <Typography gutterBottom variant="h6" >écrire un commentaire</Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="commentaire"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} color="primary" variant="contained" onClick={handleClick}>
                            Commentaire
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection
