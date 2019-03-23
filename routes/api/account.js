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
    //   db.User.findOne({
    //     email: email
    //   }, (err, previousUsers) => {
    //     if (err) {
    //       return res.send({
    //         success: false,
    //         message: 'Error: Server error.'
    //       });
    //     } else if (previousUsers.length > 0) {
    //       return res.send({
    //         success: false,
    //         message: 'Error: Account already exists.'
    //       });
    //     }
  
    //     // Save new user
    //     let dnewUser = new User();
  
    //     newUser.email = email;
    //     newUser.password = newUser.generateHash(password);
    //     newUser.name = name;
    //     newUser.save((err, user) => {
    //       if (err) {
    //         return res.send({
    //           success: false,
    //           message: 'Error: Server error.'
    //         });
    //       }
    //       return res.send({
    //         success: true,
    //         message: 'Sign-up complete.'
    //       });
    //     });
    //   });
  

    // res.json("Success")
})


router.post('/signin', function(req,res){

});


module.exports = router;
