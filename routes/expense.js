const express = require('express');
const router = require('express-promise-router')();
const ExpenseController = require('../controllers/expense');

router.route('/')
    .get(ExpenseController.getAll);

router.route('/')
    .post(ExpenseController.create);


module.exports = router;