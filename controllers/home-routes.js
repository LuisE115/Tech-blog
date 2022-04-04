const router = require('express').Router();
const { Blog, Comment, User } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const dbBlogData = await Blog.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'createddate'
            ],
            include: [
                {
                    model: User,
                    attributes: [
                        'username'
                    ]
                }
            ]
        });

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
    }
});

router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        const dbBlogData = await Blog.findByPK(req.params.id, {
            attributes: [
                'id',
                'title',
                'content',
                'createddate'
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
                }
            ],
            include: [
                {
                    model: User,
                    attributes: [
                        'username'
                    ]
                }
            ]
        });

        const blog = dbBlogData.get({ plain: true });
        res.render('blog', { blog, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  module. exports = router;