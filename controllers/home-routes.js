const { Blog, Comment, User } = require('../models');
const router = require('express').Router();

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const dbBlogData = await Blog.findAll({
            attributes: [
                "id",
                "title",
                "content",
                "createdAt"
            ],
            include: [
                {
                    model: User,
                    attributes: ["username"]
                }
            ]
        })

        const blogs = dbBlogData.map((blog) =>
            blog.get({ plain: true })
        );

        res.render('homepage', {
            blogs,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const dbBlogData = await Blog.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'content',
                "createdAt"
            ],
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment',
                        'user_id',
                        'blog_id'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: [
                        'username'
                    ]
                }
            ]
        });

        const blog = dbBlogData.get({ plain: true });
        // res.status(200).json(dbBlogData);
        res.render('single-blog', { blog, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
    console.log(req.session);
  });

  module.exports = router;