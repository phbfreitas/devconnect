import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { updateLike } from '../../actions/post';
import { deletePost } from '../../actions/post';
import { Editor } from '@tinymce/tinymce-react';

const PostItem = ({ updateLike, deletePost, showActions, auth, post: {
    _id,
    user,
    name,
    avatar,
    date,
    text,
    likes,
    comments
} }) => {

    return (
        <Fragment>
            <div key={_id} className="post bg-white p-1 my-1">
                <div>
                    <Link to={`profile/${user}`}>
                        <img
                            className="round-img"
                            src={avatar}
                            alt=""
                        />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>





                    <p className="my-1">
                        <Editor
                            apiKey="aqzfuanieohcgrxpvrnllu8rauveikq88fz9oh53426k5d0c"
                            init={{
                                height: 300,
                                menubar: false,
                                toolbar: ''
                            }}
                            initialValue={text}
                            disabled={true}
                        />
                    </p>




                    <p className="post-date">Posted on <Moment format='YYYY/MM/DD'>{date}</Moment></p>

                    {showActions && <Fragment>
                        <button type="button" className="btn btn-light" onClick={e => updateLike(_id)}>
                            <i className="fas fa-thumbs-up"></i>
                            {!auth.loading && (
                                <Fragment>
                                    <span>{likes.length > 0 && (' ' + likes.length)}</span>
                                </Fragment>
                            )}
                        </button>
                        <Link to={`/posts/${_id}`} className="btn btn-primary">
                            Discussion {' '}
                            {comments !== null && comments.length > 0 && (
                                <span className='comment-count'>{comments.length}</span>
                            )}
                        </Link>
                        {!auth.loading && auth.user._id === user && (
                            <button type="button" className="btn btn-danger" onClick={e => deletePost(_id)}>
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </Fragment>}
                </div>
            </div>
        </Fragment >
    )
}

PostItem.defaultProps = {
    showActions: true
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    updateLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { updateLike, deletePost })(PostItem);