import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createPost } from '../../actions/post';
import { connect } from 'react-redux';

const AddPost = ({ createPost }) => {

    const [text, setText] = useState('');

    const onSubmit = async e => {
        e.preventDefault();
        createPost({ text });
        setText('');
    };

    return (
        <Fragment>
            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Say Something...</h3>
                </div>
                <form className="form my-1" onSubmit={e => onSubmit(e)}>
                    <textarea
                        name="text" value={text} onChange={e => setText(e.target.value)}
                        cols="30"
                        rows="5"
                        placeholder="Create a post"
                        required
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
            </div>
        </Fragment >
    )

}

AddPost.propTypes = {
    createPost: PropTypes.func.isRequired
};

export default connect(null, { createPost })(AddPost);
