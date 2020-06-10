import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createPost } from '../../actions/post';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';

const AddPost = ({ createPost }) => {

    const [text, setText] = useState('');

    const onSubmit = async e => {
        e.preventDefault();
        createPost({ text });
        setText('');
    };

    const handleEditorChange = (content, editor) => {
        setText(content);
    }

    return (
        <Fragment>
            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Say Something...</h3>
                </div>
                <form className="form my-1" onSubmit={e => onSubmit(e)}>


                    <Editor
                        apiKey="aqzfuanieohcgrxpvrnllu8rauveikq88fz9oh53426k5d0c"
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                        }}
                        value={text}
                        onEditorChange={handleEditorChange}
                    />
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
