const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: user.id
        }

        // Create a post
        const post = new Post(newPost);
        await post.save();

        res.json(post);

    } catch (err) {
        err.status(500).send('Server Error');
    }
}]);


// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        err.status(500).send('Server Error');
    }
});

// @route   GET api/posts/:post_id
// @desc    Get post by id
// @access  Private
router.get('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: `Post not found for: ${req.params.post_id}` });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: `Post not found for: ${req.params.post_id}` });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/posts/:post_id
// @desc    Delete post by id
// @access  Private
router.delete('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: `Post not found for: ${req.params.post_id}` });
        }

        if (post.user != req.user.id) {
            return res.status(401).json({ msg: `User not authorized to delete this post!` });
        }

        await Post.deleteOne(post);

        res.json({ msg: "Post has been deleted..." });
    } catch (err) {
        console.error(err.message);
        if (err.kind !== 'ObjectId') {
            return res.status(404).json({ msg: `Post not found for: ${req.params.post_id}` });
        }
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/like/:post_id
// @desc    Add profile experience
// @access  Private
router.put('/like/:post_id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: `Post not found for: ${req.params.post_id}` });
        }

        // Add user to likes collection or remove user if already present in the likes collection
        const index = post.likes.map(item => item.user).indexOf(req.user.id);
        if (index > -1) {
            post.likes.splice(index, 1);
        } else {
            post.likes.unshift({ user: req.user.id });

        }
        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        if (err.kind !== 'ObjectId') {
            return res.status(404).json({ msg: `Post not found for: ${req.params.post_id}` });
        }
        res.status(500).send('Server Error');
    }

});

// @route   POST api/posts/comment/:post_id
// @desc    Comment on a post
// @access  Private
router.post('/comment/:post_id', [auth, [
    check('text', 'Text is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.post_id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: user.id
        }

        // Add comment to a post
        post.comments.unshift(newComment);
        await post.save();

        res.json(post.comments);

    } catch (err) {
        err.status(500).send('Server Error');
    }
}]);

// @route   DELETE api/posts/comment/:comment_id
// @desc    Delete comment from post
// @access  Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: `Post not found for: ${req.params.post_id}` });
        }

        const cIndex = post.comments.map(item => item.id).indexOf(req.params.comment_id);
        if (cIndex > -1) {
            if (post.comments[cIndex].user != req.user.id) {
                return res.status(401).json({ msg: `User not authorized to delete this comment!` });
            }
            post.comments.splice(cIndex, 1);
            await post.save();
        } else {
            return res.status(404).json({ msg: `Comment not found for: ${req.params.comment_id}` });
        }
        res.json(post.comments);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;