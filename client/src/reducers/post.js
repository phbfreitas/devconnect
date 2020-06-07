import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    DELETE_COMMENT
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
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            };
        case GET_POSTS:
            return {
                ...state,
                loading: false,
                posts: payload
            }
        case ADD_POST:
            return {
                ...state,
                loading: false,
                posts: [payload, ...state.posts]
            }
        case ADD_COMMENT:
        case DELETE_COMMENT:
            return {
                ...state,
                loading: false,
                post: { ...state.post, comments: payload }
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