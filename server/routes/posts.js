import express from 'express';
import {getPostsBySearch,getPosts,createPost,updatePost,deletePost,likePost,getPost} from'../Controller/posts.js'
import auth from '../middleware/auth.js';

const router =express.Router();

router.get('/search',getPostsBySearch);
router.get('/',getPosts);
router.get('/:id',getPost);
router.post('/',auth,createPost)
router.delete('/:id',auth,deletePost)
router.patch('/:id',auth,updatePost)
router.patch('/:id/likePost',auth,likePost)

export default router