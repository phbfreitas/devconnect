import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST
} from './types';

// Get all profiles
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Like or dislike post by post ID
export const updateLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete post
export const deletePost = postId => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload: { postId }
        });

        dispatch(setAlert('Post Deleted', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

