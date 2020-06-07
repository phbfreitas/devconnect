import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import { connect } from 'react-redux';
import AddPost from '../profile-forms/AddPost';


const Posts = ({ getPosts, post: { posts, loading } }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return loading ?
        <Spinner /> : (
            < Fragment >
                <AddPost />
                <h1 class="large text-primary">Posts</h1>
                <p class="lead"><i class="fas fa-user"></i> Welcome to the community!</p>
                <div class="posts">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <PostItem key={post._id} post={post} />
                        ))
                    ) : <h4>No posts found...</h4>}
                </div>
            </Fragment >
        );
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
