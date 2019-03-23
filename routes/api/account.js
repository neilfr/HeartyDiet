const router = require("express").Router();
const db  = require("./../../models")
const brcrypt = require('bcrypt');



router.post('/signup', (req, res)=>{
    // console.log(req)
    let {name, email, password} = req.body;

    //TODO INSERT NAME, EMAIl, PASSWORD INTO MONGO DB 
    //REMEMBER TO BYCRPT PASSWORD standard practice 
    // res.status(404).json({
    //     success: false,
    //     message: 'Error: Email cannot be blank.'
    // })
    if (!email) {
        return res.send({
          success: false,
          message: 'Error: Email cannot be blank.'
        });
      }
      if (!password) {
        return res.send({
          success: false,
          message: 'Error: Password cannot be blank.'
        });
      }
      if (!name) {
        return res.send({
          success: false,
          message: 'Error: Name cannot be blank.'
        });
      }
  
  
    //   console.log('here');
      //Scraping, and validating 
      email = email.toLowerCase();
      email = email.trim();
  
      //Steps:
      // 1. Verify email doesn't exist
      // 2. Save

      db.User.findOne({
          email: email
      })
      .then((user) => {
        console.log(user)
          if (user) {
            return res.send({
                success: false,
                message: 'Error: Account already exists.'
              });
          } else {
              const newUser = new db.User({
                  name: name,
                  email: email,
                  password: ''
              });
              newUser.password = db.User.generateHash(password)
              newUser.save()
              .then((user)=>{
                    return res.send({
                        success: true,
                        message: 'Sign-up complete.'
                    });
              })
              .catch((err)=>{
                console.error(err)
                return res.send({
                    success: false,
                    message: 'Error: Server error.'
                  });
              })
          }
      }).catch((err)=>{
        console.error(err)
        return res.send({
            success: false,
            message: 'Error: Server error.'
          });
      })
});


router.post('/signin', function(req, res){
    // console.log(req.body)
    // res.send('Sent')
    let {email, password} = req.body;
    
    if (!email) {
        return res.send({
          success: false,
          message: 'Error: Email cannot be blank.'
        });
      }
      if (!password) {
        return res.send({
          success: false,
          message: 'Error: Password cannot be blank.'
        });
      }

    //Scraping, and validating 
    email = email.toLowerCase();
    email = email.trim();

    db.User.findOne({
        email: email
    }).then((user) => {
        console.log(user)
        if (!user) {
            return res.send({
                success: false,
                message: 'Error: User does not exist.'
            });
        }
        // console.log(db.User.validPassword(password,
        if (!db.User.validPassword(password, user.password)) {
            return res.send({
                success: false,
                message: 'Error: Invalid.'
            });
        } else {
            const userSession = new db.UserSession({
                userId: user._id,
                timestamp: Date.now(),
                isDeleted: false
            });
            userSession.save()
            .then((userSession)=>{
                return res.send({
                    success: true,
                    message: 'Login Success.',
                    token: userSession._id
                });
            })
            .catch((err)=>{
                console.log(err)
                return res.send({
                    success: false,
                    message: 'Error: Server error.'
                });
            })
        }
    }).catch((err)=>{
        console.log(err)
        return res.send({
            success: false,
            message: 'Error: Server error.'
        });
    })
});


module.exports = router;
