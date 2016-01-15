var express = require('express');
var router = express.Router();
var validator  = require('../src/validator');
var request = require('request');
var knex = require('../db/knex');


router.post('/new', function(req, res) {
var userid;

    //Checks to see if the user is logged in via facebook
    if (!res.locals.currentUser) {
        knex('users').where('facebook_id', req.user.id).first().then(function(userPrimary) {
            userid = userPrimary.id;

            knex('fav_hikes_lists').where({
                list_name: req.body.list,
                user_id: userPrimary.id
            }).first().then(function(list) {

                if (!list) {
                    knex('fav_hikes_lists').insert({
                        list_name: req.body.list,
                        user_id: userid
                    }).then(function() {
                        res.redirect('/users');
                    })
                } else {
                    res.redirect('/users');
                }
            })
        })

    } else {
        knex('fav_hikes_lists').where({
            list_name: req.body.list,
            user_id: req.signedCookies.userID
        }).first().then(function(list) {
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
    }
})

router.delete('/delete', function(req, res) {
    knex('fav_hikes_lists').where('id', req.body.hiddenName).first().del().then(function() {
        res.redirect('/users');
    });
})

router.post('/hikes', function(req, res) {
    knex('fav_hikes').where('list_id', req.body.hiddenID).then(function(hikes) {
        res.render('hikes/hikes', {
            list_name: req.body.hiddenName,
            hikes: hikes
        });

    })
})


module.exports = router;
