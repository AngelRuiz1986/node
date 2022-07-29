const router = require('express').Router();
const Users = require('../models/Users');
const passport = require('passport')

router.get('/user/signin', function(req, res){
    res.render('user/signin');
})

router.post('/user/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}))

router.get('/user/logout', function(req, res){
   req.logout();
   res.redirect('/');
})

router.get('/user/singup', function(req, res){
    res.render('user/signup');
})

router.post('/user/singup', async function(req, res){
    const {name, email, password, confirmPassword} = req.body
    
    const errors = []
    
    if (!name){
        errors.push({msg: 'Please write a Name'})
    }

    if (!email){
        errors.push({msg: 'Please write a email'})
    }

    if (!password){
        errors.push({msg: 'Please write a Password'})
    }

    if (password != confirmPassword){
        errors.push({msg: 'Please write a right password'})
    }

    if (errors.length > 0){
        res.render('user/signup', {
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    }else{
        const unique = await Users.findOne({email:email})
        if (unique){
            errors.push({msg: 'This email is already in the system'})
            res.render('user/signup', {
                errors,
                name,
                email,
                password,
                confirmPassword
            })
        }else{
            const newUser = new Users({ name, email, password})
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'User register Successfully')
            res.redirect('signin');
        }
        

    }
})
module.exports = router;
