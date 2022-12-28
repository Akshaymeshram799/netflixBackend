const express = require('express');
const { body, validationResult } = require('express-validator');
const { userModal } = require('../db/Schema');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { fetchUser } = require('../middleware/getUser');

const router = express.Router();

const jwtSecretString = 'netflixclonewebapplication';
const {ContentModel} = require('../db/contentSchema')

// creating a user using post method

router.post('/register', [body('firstName').isLength({ min: 3 }),
body('lastName').isLength({ min: 3 }), body('email').isEmail(),
body('password').isLength({ min: 6 })], async (req, res) => {

    const err = validationResult(req);

    if (!err.isEmpty()) {
        res.status(400).json({ errors: err.array(),code:400 })
    }

    try {

        let userCreate = await userModal.findOne({ email: req.body.email });
        if (userCreate) {
            return res.status(400).json({ message: "user already exist",code:400 });
        }


        let salt = await bcrypt.genSalt(10)
        let hashString = await bcrypt.hash(req.body.password, salt)
        userCreate = await userModal.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashString
        })


        const data = {
            user: {
                id: userCreate.id
            }
        }

        const authToken = jwt.sign(data, jwtSecretString)
        console.log(authToken);
        res.status(201).json({ authToken,code:201,success:true })

    } catch (error) {
        res.status(500).json({ message: "something went wrong",code:500 })
        console.log(error)
    }

})

router.post('/login', [body('email').isEmail(), body('password').exists().isLength({ min: 6 })], async (req, res) => {

    const err = validationResult(req)
    if (!err.isEmpty()) {
        res.status(400).json({ error: err, message: "Login with valid email password",code:400 })
    }
    let success = false;

    try{
        
        const getUser = await userModal.findOne({ email: req.body.email });
        if(!getUser){
            res.status(400).json({message:"user does not exist",code:400,});
        }

        const matchPassword = await bcrypt.compare(req.body.password,getUser.password);

        if(!matchPassword){
            res.status(400).json({message:"incorrect password",code:400});
        }

        const data = {
            user:{
                id:getUser.id
            }
        }

        const authToken = jwt.sign(data,jwtSecretString);
        console.log(authToken);
        success = true;
        res.status(200).send({getUser,success});

    }catch(e){

    }

})

    

// fetch user details for user auth 

// router.post('/getuser',fetchUser,async(req,res)=>{

//     try {
//         userId = req.user.id
//         const user = await userModal.findById({userId}).select('-password')
//         res.send(user);
//     } catch (error) {
//         res.status(500).send('internal server error')
//     }
// })



router.post('/postContent',async(req,res)=>{
    try{
        
        const addContent = await ContentModel({
            imageurl:req.body.imageurl,
            genre:req.body.genre,
            mdbid:req.body.mdbid,
            title:req.body.title,
            imdbrating:req.body.imdbrating,
            released:req.body.released,
            type:req.body.type,
            synopsis:req.body.synopsis
        })

        addContent.save();
        res.send('akshay')

    }catch(e){
        console.log(e);
    }
})


router.get('/users',async(req,res)=>{
    let user = await userModal.find()
    let photoUrl = await `http://localhost/user/users/${user[0].photo}`
    let resData = await {
        firstName:user[0].firstName,
        lastName:user[0].lastName,
        email:user[0].email,
        password:user[0].password,
        photo:photoUrl
    }
    console.log(resData);
    res.send(resData)
    
})


module.exports = { router }
