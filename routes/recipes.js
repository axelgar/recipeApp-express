'use strict';

const express = require('express');

const Recipe = require('../models/Recipe.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.render('recipesList', { recipes });
  } catch (error) {
    next(error);
  }
});

router.get('/create', (req, res, next) => {
  res.render('recipesCreate');
});

router.post('/create', async (req, res, next) => {
  try {
    const recipe = req.body;
    await Recipe.create(recipe);
    res.redirect('/recipes');
  } catch (error) {
    next(error);
  }
});

router.get('/search', async (req, res, next) => {
  try {
    const title = req.query.title;
    const recipe = await Recipe.findOne({ title });
    res.render('recipeDetails', recipe);
  } catch (error) {
    next(error);
  }
});

router.get('/details/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const recipe = await Recipe.findById(id);
    res.render('recipeDetails', recipe);
  } catch (error) {
    next(error);
  }
});

router.get('/details/:id/edit', async (req, res, next) => {
  try {
    const id = req.params.id;
    const recipe = await Recipe.findById(id);
    res.render('recipeUpdate', recipe);
  } catch (error) {
    next(error);
  }
});

router.post('/details/:id/edit', async (req, res, next) => {
  try {
    const id = req.params.id;
    const recipe = req.body;
    await Recipe.findByIdAndUpdate(id, recipe);
    res.redirect(`/recipes/details/${id}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
