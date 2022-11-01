const express= require('express');
const router = express.Router();

const authCtrl = require('../controller/authController');

//main Page
router.get('/', (req, res) => {
    res.send('homepage works');
});

router.get('/register', (req, res) => {
  res.send('registerpage works');
});


//signup route
router.post('/signup',authCtrl.registerUser);

//login route
router.post('/login', authCtrl.authenticateUser);

//logout
router.get('/logout',authCtrl.logOut);

//profile route
router.get('/profile',authCtrl.isLoggedIn, (req,res) => {
  if(req.user){
    res.json('profile works');
  } else {
    res.redirect('/');
  }
})

router.get('/videos',authCtrl.isLoggedIn, (req,res) => {
  if(req.user){
    res.json('videos work')
  } else {
    res.redirect('/');
  }
})

router.get('/stream',authCtrl.isLoggedIn, (req,res) => {
  res.send('streaming works');
  if(req.user){
    res.json('streaming room')
  } else {
    res.redirect('/');
  }
})

module.exports = router;