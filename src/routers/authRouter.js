const express = require('express');
const router = express.Router();
const homePageController=require('../controllers/homePageController');
const userController=require('../controllers/userController')
const authMiddleware = require('../middleware/auth');
const initWebRoute=(app)=>{
router.get('/signup',homePageController.getSignUp)
router.post('/signupsuccess',userController.addUser)
router.get('/signin',homePageController.getSignIn)
router.get('/', authMiddleware.checkToken, homePageController.getHomePage);
router.post('/signinsuccess',userController.loginUser)
router.get('/logout',userController.logout)
return app.use("/",router);
    }
    
    module.exports = initWebRoute;