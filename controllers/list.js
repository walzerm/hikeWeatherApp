var express = require('express');
var router = express.Router();
var validator  = require('../src/validator');
var request = require('request');
var knex = require('../db/knex');


router.post('/new', function(req, res) {
    console.log('create a new list with ' + req.body.list + ' yay!!');
    // knex('favhikes').where('list_name', req.body.list).first().then(function(list) {
    //     if(!list) {
    //         knex('favhikes').insert({list_name: req.body.list}).
    //     }
    // })
    res.redirect('/users');
})


module.exports = router;
