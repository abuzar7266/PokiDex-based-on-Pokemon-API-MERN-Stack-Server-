var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var Favourite = require('../models/pokemon');
var passport = require('passport');
var authenticate = require('../authenticate');

/* GET home page. */
router.route('/')
    .get(authenticate.verifyUser,(req,res,next)=>{
        Favourite.find({user:req.user._id})
        .then((fav) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(fav);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(authenticate.verifyUser,(req,res,next)=>{
        Favourite.create({name:req.body.name,Attack:req.body.Attack,Defense:req.body.Defense,
            Speed:req.body.Speed,Hp:req.body.Hp,Sprite:req.body.Sprite,user:req.user._id})
        .then((fav) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fav);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .delete(authenticate.verifyUser,(req,res,next)=>{
        res.statusCode=401;
        res.send('DELETE is not valid on multiple Favourites');
    })
    .put(authenticate.verifyUser,(req,res,next)=>{
        res.statusCode=401;
        res.send('PUT is not valid on Favourites');
    });
router.route('/:id')
    .get(authenticate.verifyUser,(req,res,next)=>{
        Favourite.find({user:req.user._id,_id:req.params.id})
        .then((res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(res);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(authenticate.verifyUser,(req,res,next)=>{
        Favourite.create({user:req.user_id,name:req.params.name,Attack:req.params.Attack,Damage:req.params.Damage,
            Speed:req.params.Speed,Hp:req.params.Hp,Sprite:req.params.Sprite})
        .then((res) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(res);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .delete(authenticate.verifyUser,(req,res,next)=>{
        Favourite.findOneAndRemove({_id:req.params.id})
        .then((details) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(details);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(authenticate.verifyUser,(req,res,next)=>{
        res.statusCode=401;
        res.send('PUT is not valid on Favourites');
    });

module.exports = router;
