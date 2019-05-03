const express = require('express');
const router = express.Router();

const Article = require('../models/article');

router.get('/articles', async (req, res, next) => {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (error) {
    next(error);
  }
});

router.get('/articles/:id', async (req, res, next) => {
  try {
    const articleId = req.params.id;
    const foundId = await Article.findById(articleId);
    if (!foundId) {
      const errStatus = Error('not found');
      // res.sendStatus(404);
      errStatus.status = 404;
      return next(errStatus);
    } else {
      res.status(200).json(foundId);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/articles/', async (req, res, next) => {
  try {
    const article = await Article.create(req.body);
    if (!article) {
      res.sendStatus(500);
    } else {
      res.status(200).json({
        message: 'Created successfully',
        article
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put('/articles/:id', async (req, res, next) => {
  try {
    const articleId = req.params.id;
    const updateArticle = await Article.findById(articleId);
    if (!articleId) {
      res.status(500).json({ title: '' });
    } else {
      const updated = await updateArticle.update(req.body);
      res.status(200).json({
        message: 'Updated successfully',
        article: updated
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
