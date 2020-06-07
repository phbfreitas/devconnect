import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/post';
import { connect } from 'react-redux';

const AddComment = ({ post: { _id }, addComment }) => {

    const [text, setText] = useState('');

    const onSubmit = async e => {
        e.preventDefault();
        addComment({ text }, _id);
        setText('');
    };

    return (
        <Fragment>


            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Leave A Comment</h3>
                </div>
                <form className="form my-1" onSubmit={e => onSubmit(e)}>
                    <textarea
                        name="text" value={text} onChange={e => setText(e.target.value)}
                        cols="30"
                        rows="5"
                        placeholder="Comment on this post"
                        required
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
            </div>
        </Fragment >
    )

}

AddComment.propTypes = {
    addComment: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

export default connect(null, { addComment })(AddComment);
