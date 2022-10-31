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

//profile route
router.get('/profile',authCtrl.isLoggedIn, (req,res) => {
  if(req.user){
    res.redirect('videos')
  } else {
    res.redirect('/login');
  }
})

router.get('/videos',authCtrl.isLoggedIn, (req,res) => {
  if(req.user){
    res.redirect('videos')
  } else {
    res.redirect('/login');
  }
})

router.get('/stream',authCtrl.isLoggedIn, (req,res) => {
  res.send('streaming works');
  if(req.user){
    res.redirect('videos')
  } else {
    res.redirect('/stream');
  }
})

module.exports = router;