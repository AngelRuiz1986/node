const router = require('express').Router();


const DUMMY_DATA = [{name: 'x', value: 'x'}, {name: 'y', value: 'y'}, {name: 'x', value:"x"}]


router.get('/users', function(req, res){
    res.status(200).send({data: DUMMY_DATA});
})


/*app.get('/users', function(req, res) {
    res.json({ users: 'allUsers' });
  
    // Real code from my application below
    //  model.User.findAll().then (users => {
    //        res.status(200).json({ users });
    //     }).catch(error=>{
    //        console.log(error)
    //        req.status(500).send(error)
    //  })
  });*/

router.get('/user/register', function(req, res){
    console.log(1)
    res.status(200).send({age: 'register'});
})

router.get('/user/login', function(req, res){
    res.status(200).send({message: 'login'});
})

router.get('/user/logout', function(req, res){
    console.log(1)
    res.status(200).send({message: 'logout'});
})

module.exports = router;