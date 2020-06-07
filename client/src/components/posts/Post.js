import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPostById } from '../../actions/post';
import PropTypes from 'prop-types';
import PostComment from './PostComment';
import AddComment from '../profile-forms/AddComment';
import PostItem from './PostItem';

const Post = ({
    getPostById,
    post: { post, loading },
    match
}) => {
    useEffect(() => {
        getPostById(match.params.id);
    }, [getPostById, match.params.id]);

    return (
        <Fragment>
            {post === null || loading ? <Spinner /> : <Fragment>
                <Link to="/posts" className="btn">Back To Posts</Link>
                <PostItem post={post} showActions={false} />
                <AddComment key={post._id} post={post} />
                {post.comments.length > 0 ? (
                    post.comments.map(comment => (
                        <PostComment postId={post._id} comment={comment} />
                    ))
                ) : <h4>No comments found...</h4>}
            </Fragment>}
        </Fragment>
    )
}

Post.propTypes = {
    getPostById: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { getPostById })(Post);
