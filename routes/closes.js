var express = require('express');
var router = express.Router();
const { User } = require('../models');
const { Sinseo } = require('../models');
const { Balance } = require('../models');

router.get('/sinseo', async(req, res, next) => {
    try {
        const sinseo = await Sinseo.findall();
        res.json(sinseo);
    } catch (err){
        console.err(err);
        next(err);
    }
});

router.get('/balance', function(req, res, next) {
    try{
        const balance = await Balance.findall();
        res.json(balance);
    } catch(err){
        console.error(err);
        next(err);
    }
});

router.route('/users')
    .get(function(req, res, next){ 
        try{
            const user = await User.findall({
                attributes: ['username', 'score'],
                order: [['score', 'DESC']],
                limit: 10
              });
              res.json(user);                             
            } catch(err){
            console.error(err);
            next(err);
        }

    })
    .post((req, res, next) => { 
        try{
            const user = await User.create({
                category : req.body.category,
                username : req.body.username,
                score : req.body.score,
            });
            console.log(user);
            res.status(201).json(user);
        } catch(err){
            console.error(err);
            next(err);
        }
});

router.get('/moregame', function(req, res, next) {
   //front
});

module.exports = router;