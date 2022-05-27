const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const dbUserBlogs = await Blog.findAll();

        res.status(200).json(dbUserBlogs);
    } catch (err) {
        res.status(500).json(err);
        return;
    }
    
});

router.post('/', async (req, res) => {
    try {
        const dbUserBlogs = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        res.status(200).json(dbUserBlogs);
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router;