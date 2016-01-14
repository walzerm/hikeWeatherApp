var express = require('express');
var router = express.Router();
var validator  = require('../src/validator');
var request = require('request');
var knex = require('../db/knex');


router.post('/new', function(req, res) {
    console.log('create a new list with ' + req.body.list + ' yay!!');
    console.log(req.signedCookies.userID);
    knex('fav_hikes_lists').where('list_name', req.body.list).first().then(function(list) {
        if(!list) {
            knex('fav_hikes_lists').insert({
                list_name: req.body.list,
                user_id: req.signedCookies.userID
            }).then(function() {
                res.redirect('/users');
            });
        } else {
            res.redirect('/users');
        }
    })

})


module.exports = router;
