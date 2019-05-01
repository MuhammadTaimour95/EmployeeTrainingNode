const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../model/users');
const allowedUser = require('../model/allowedUsers');
const Organization = require('../model/organization');
const Training = require('../model/training');
const Skills = require('../model/skills');

isAllowed =false;

// Register
router.post('/register', async (req, res, next) => {
  let newUser = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    organizationName : req.body.organizationName,
    password: req.body.password
  });

  let newAllowedUser = new allowedUser({
    fullName: req.body.test,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  });

allowedUser.findOne({ email: newUser.email }).then(user => {
    if (user) {
     isAllowed = true;
  }

});

  isRegistered = false;
  isPasswordValid = false;
  isAllowed = false;

  if (newUser.password.length < 6) {
    isPasswordValid = false;
  }
  else{
    isPasswordValid = true;
  }



  await User.findOne({ email: newUser.email }).then(user => {
    if (user) {
     isRegistered = true;
    }
    else{
    isRegistered = false;
    }
  });


console.log('registered', isRegistered);
  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function phonenumber(inputtxt) {
  var phoneno = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
  if(inputtxt.match(phoneno)) {
    return true;
  }
  else {
    return false;
  }
}
function passwordStrength(inputtxt) {
  var temppassword = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$/;
  if(req.body.password.match(temppassword)) {
    return true;
  }
  else {
    return false;
  }
}
const isMomHappy = false;

function temp(){
  allowedUser.findOne({ email: newUser.email }).then(user => {
    if (user) {
     isAllowed = true;
     console.log(isAllowed + "middle");
     return true;

    }
  });
}

// Promise
const willIGetNewPhone = new Promise(
    (resolve, reject) => {
        if (validateEmail(newUser.email) && !isRegistered && isAllowed && phonenumber(newUser.phone)
        && passwordStrength(temp) && isPasswordValid) {
          console.log("monday" + isRegistered);
            const phone = {
                brand: 'Samsung',
                color: 'blacccck'
            };
            resolve(phone);
        }else if (!validateEmail(newUser.email)) {
          res.json({success: false, msg:'Invalid Email'});
          const reason = new Error('Invalid Email');
          reject(reason);
        }
        else if (isRegistered) {
          res.json({success: false, msg:'User already registered'});
          const reason = new Error('User already registered');
          reject(reason);
        }
         else if (!isAllowed) {
          res.json({success: false, msg:'Email not allowed'});
          const reason = new Error('Email not allowed');
          reject(reason);
        }
        else if(!phonenumber(newUser.phone)){
          res.json({success: false, msg:'Invalid Phone Number'});
          const reason = new Error('Invalid Phone Number');
          reject(reason);
        }
        else if(!passwordStrength(temp)){
          res.json({success: false, msg:'Password should be atleast 8 characters long with a capital letter, small letter, special character and a number.'});
          const reason = new Error('Password should be atleast 8 characters long with a capital letter, small letter, special character and a number.');
          reject(reason);
        }
        else if(!isPasswordValid){
        res.json({success: false, msg:'Password Cannot be less than 6 characters'});
        const reason = new Error('mom is not happy');
        reject(reason);
        }else {
            const reason = new Error('mom is not happy');
            res.json({success: false, msg:'Failed to register user'});
            reject(reason);

        }

    }
);


// 2nd promise
async function showOff(phone) {
    return new Promise(
        (resolve, reject) => {
            var message = 'Hey friend, I have a new ' +
                phone.color + ' ' + phone.brand + ' phone';
                User.addUser(newUser, (err, user) => {
                  if(err){
                    console.log(err);
                    res.json({success: false, msg:'Failed to register user'});
                  }
                  else {
                    res.json({success: true, msg:'User registered', user: user});
                  }
                });
            resolve(message);
        }
    );
};

// call our promise
async function askMom() {
    try {
        let phone = await willIGetNewPhone;
        let message = await showOff(phone); 
    }
    catch (error) {
        console.log(error.message);
    }
}

function tempy(subject, callback) {
  allowedUser.getUserByEmail(newUser.email, (err, user) => {
    if(err) throw err;
    if(user){
      isAllowed = true;
      (async () => {
        await askMom();
     })();
    }
    else{
      console.log("user not present");
    }
  });
 
  callback();
}
function alertFinished(){
  console.log('Finished my homework');
  (async () => {
      await askMom();
   })();
}
tempy('math', alertFinished);

console.log("tuesday" + isRegistered)
});

//Add Organization
router.post('/addOrganization', (req, res, next) => {
  let newOrganization = new Organization({
    name: req.body.name,
    title: req.body.title,
    phone: req.body.experience,
    fromdate : req.body.fromDate,
    toDate :req.body.toDate,
    userId : req.body.userId
  });

  Organization.addOrganization(newOrganization, (err, user) => {
    if(err){
      console.log(err);
      res.json({success: false, msg:'Failed to Add Organization'});
    } else {
      res.json({success: true, msg:'Organization Added'});
    }
  });
});


//Add Training
router.post('/addTraining', (req, res, next) => {
  let newTraining = new Training({
    training : [{
      title :  "trainings",
      completionYear : "trainings",
      duration : "trainings",
     file :"trainings"
       },
       {
        title :  "trainings",
        completionYear : "trainings",
        duration : "trainings",
       file :"trainings"
         },
         {
          title :  "trainings",
          completionYear : "trainings",
          duration : "trainings",
         file :"trainings"
           },
           {
            title :  "trainings",
            completionYear : "trainings",
            duration : "trainings",
           file :"trainings"
             },
             {
              title :  "trainings",
              completionYear : "trainings",
              duration : "trainings",
             file :"trainings"
               }
      ]
  });


  numTraining = newTraining.training.length;
  while(req.body.training.length < numTraining){
    newTraining.training.pop();
    numTraining--;
  }

  for (i = 0; i < req.body.training.length; i++) { 
      newTraining.training[i].title = req.body.training[i].title;
      newTraining.training[i].completionYear = req.body.training[i].completionYear;
      newTraining.training[i].duration = req.body.training[i].duration;
      newTraining.training[i].file = req.body.training[i].file;
  }

  Training.addTraining(newTraining, (err, user) => {
    if(err){
      console.log(err);
      res.json({success: false, msg:'Failed to Add training'});
    } else {
      res.json({success: true, msg:'Training Added'});
    }
  });
});


//Add Skills
router.post('/addSkills', (req, res, next) => {
  let newSkills = new Skills({
    skills : [{
      name :  "skills",
      experience : "skills"
       },
       {
        name :  "skills",
        experience : "skills"
       },
       {
        name :  "skills",
        experience : "skills"
       },
       {
        name :  "skills",
        experience : "skills"
       },
        {
          name :  "skills",
          experience : "skills"
         }
      
     ] 
  });

  num = newSkills.skills.length;
  while(req.body.skills.length < num){
    newSkills.skills.pop();
    num--;
  }

  for (i = 0; i < req.body.skills.length; i++) { 
    newSkills.skills[i].name = req.body.skills[i].name;
    newSkills.skills[i].experience = req.body.skills[i].experience;
  }
   
console.log(req.body.skills.length);
  Skills.addSkills(newSkills, (err, skills) => {
    if(err){
      res.json({success: false, msg:'Failed to Add skills'});
    } else {
      res.json({success: true, msg:'Skills Added'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const fullName = req.body.fullName;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 604800 // 1 week
          });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            fullName: user.fullName,
            phone: user.phone,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Add Profile
router.post('/editProfile', (req, res, next) => {

  var myquery = { _id: req.headers.userid};
  var newvalues = { fullName: req.body.fullName, phone: req.body.phone , image: req.body.image};
  User.updateOne(myquery, newvalues, function(err, res ) {
    if (err) throw err; 
  });
  return res.json({success: true, msg:'Profile Updated'});
    
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
