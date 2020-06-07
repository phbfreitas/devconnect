import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';

const PostComment = ({ auth, deleteComment, postId, comment: {
    _id,
    date,
    text,
    name,
    avatar,
    user
} }) => {

    return (
        <Fragment>
            <div className="comments">
                <div key={_id} className="post bg-white p-1 my-1">
                    <div>
                        <Link to={`/profile/${user}`} >
                            <img
                                className="round-img"
                                src={avatar}
                                alt=""
                            />
                            <h4>{name}</h4>
                        </Link>
                    </div>
                    <div>
                        <p className="my-1">{text}</p>
                        <p className="post-date">Posted on <Moment format='YYYY/MM/DD'>{date}</Moment></p>
                        {!auth.loading && auth.user._id === user && (
                            <button
                                type="button"
                                className="btn btn-danger" onClick={e => deleteComment(postId, _id)}>
                                <i class="fas fa-times"></i>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

PostComment.propTypes = {
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(PostComment);