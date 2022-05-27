const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');

// get all comments from a blog
router.get('/', async (req, res) => {
    try {
        const dbCommentData = await Comment.findAll();
        res.status(200).json(dbCommentData);
    } catch (err) {
        res.status(500).json(err);
    }
})
// create a comment 
router.post('/', async (req, res) => {
    try {
        const dbCommentData = await Comment.create({
            user_id: req.session.user_id,
            blog_id: req.body.blog_id,
            comment: req.body.comment
        })
        res.status(200).json(dbCommentData);
    } catch (err) {
        res.status(500).json(err);
    }
})
// delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const dbCommentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!dbCommentData) {
            res.status(400).json({ message: 'There is not a comment with that id.'});
            return;
        }
        res.status(200).json(dbCommentData);
    } catch (err) {
        res.status(500).json(err);
    }
})
// edit an existing comment
router.patch('/recipe/:id', async (req, res) => {
    try {
        const dbCommentData = await Comment.update({
            comment: req.body.comment
        })
        Comment.save();
        res.status(200).json(dbCommentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;