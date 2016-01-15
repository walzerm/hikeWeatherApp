var express = require('express');
var router = express.Router();
var validator  = require('../src/validator');
var request = require('request');
var knex = require('../db/knex');


router.post('/new', function(req, res) {

    var id;
//Finish so that FB users also get lists, need to get user id from the facebook to add to lists table
    if (!res.locals.currentUser) {
        knex('users').where('facebook_id', req.user.id).first().then(function(userPrimary) {
            knex('fav_hikes_lists').where('user_id', userPrimary.id).then(function(lists) {
                res.render('users/user',{
                    user : req.user,
                    photo: req.user.photos[0].value,
                    hikes: lists
                    });
            });
        })
    } else {
        knex('users').where('facebook_id', )
    }

    console.log(req.user.id);
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

})

router.delete('/delete', function(req, res) {
    knex('fav_hikes_lists').where('id', req.body.hiddenName).first().del().then(function() {
        res.redirect('/users');
    });
})

router.post('/hikes', function(req, res) {
    knex('fav_hikes').where('id', req.body.hiddenID).then(function(hikes) {
        res.render('hikes/hikes', {list_name: req.body.hiddenName});

    })
})


module.exports = router;
