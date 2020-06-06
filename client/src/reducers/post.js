import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST
} from '../actions/types';

const initialState = {
    post: null,
    posts: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                loading: false,
                posts: payload
            }
        case POST_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case UPDATE_LIKES:
            return {
                ...state,
                loading: false,
                posts: state.posts.map(post => post._id === payload.postId ? { ...post, likes: payload.likes } : post)
            }
        case DELETE_POST:
            return {
                ...state,
                loading: false,
                posts: state.posts.filter(post => payload.postId !== post._id)
            }
        default:
            return state;
    }
}