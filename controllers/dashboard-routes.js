const router = require('express').Router();
const { Blog, Comment, User } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const dbBlogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                "id",
                "title",
                "content"
            ],
            include: [
                {
                    model: User,
                    attributes: ["username"]
                }
            ]
        })

        const blogs = dbBlogData.map((blog) =>
        blog.get({ plain: true }));

        console.log(blogs);
        console.log(req.session);

        res.render('dashboard', { 
            blogs, 
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
});

module.exports = router;