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
    password: req.body.password,
    isAdmin: false    
  });

  let newAllowedUser = new allowedUser({
    fullName: req.body.test,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    isAdmin: false 
  });

allowedUser.findOne({ email: newUser.email }).then(user => {
    if (user) {
     isAllowed = true;
     newUser.isAdmin = user.isAdmin;
     console.log( newUser.isAdmin+" Between "+user.isAdmin);
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
     return true;

    }
  });
}

// Promise
const willIGetNewPhone = new Promise(
    (resolve, reject) => {
        if (validateEmail(newUser.email) && !isRegistered && isAllowed && phonenumber(newUser.phone)
        && passwordStrength(temp) && isPasswordValid) {
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
                    console.log( newUser.isAdmin+" Between "+user.isAdmin);
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

(async () => {
  await askMom();
})();




/*function tempy(subject, callback) {
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
  (async () => {
      await askMom();
   })();
}
tempy('math', alertFinished);
*/
});

//Add Organization
router.post('/addOrganization', (req, res, next) => {
  

  let newOrganization = new Organization({
    organization : [ ],
    userId: req.headers.userid      
  });

  
  for (i = 0; i < req.body.organization.length; i++) { 
  newOrganization.organization.push({
    name :  req.body.organization[i].name,
    title : req.body.organization[i].title,
    experience : req.body.organization[i].experience,
    fromDate : req.body.organization[i].fromDate,
    toDate : req.body.organization[i].toDate
     });
    }

    Organization.findOneAndDelete( req.headers.userid, (err, organization) => {
      if(err) throw err;
      if(!organization){
        console.log("Record Not Deleted");
      }
      else{
        console.log("Record Deleted");
      }
  });


  Organization.addOrganization(newOrganization, (err, organization) => {
    if(err){
      console.log(err);
      res.json({success: false, msg:'Failed to Add Organization'});
    } else {
      res.json({success: true, msg:'Organization Added'});
    }
  });
});
function stringToDate(_date,_format,_delimiter)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
}


//Add Training
router.post('/addTraining', (req, res, next) => {
  let newTraining = new Training({
    training : []
      ,
     userId: req.headers.userid
  });

  Training.findOneAndDelete( req.headers.userid, (err, training) => {
    if(err) throw err;
    if(!training){
      console.log("Record Not Deleted");
    }
    else{
      console.log("Record Deleted");
    }
});



  for (i = 0; i < req.body.training.length; i++) { 
    
   startDate =  stringToDate(req.body.training[i].start_date,"dd/MM/yyyy","/");
   endDate = stringToDate(req.body.training[i].end_date,"dd/MM/yyyy","/");
   const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 31)); 

    console.log(diffDays);

    newTraining.training.push({
      title : req.body.training[i].title,
      status : req.body.training[i].status,
      duration : diffDays +" months.",
      start_date : req.body.training[i].start_date,
      end_date: req.body.training[i].end_date
       });
      }


  Training.addTraining(newTraining, (err, training) => {
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
    skills : [],
     userId: req.headers.userid
  });
  
  Skills.findOneAndDelete( req.headers.userid, (err, skills) => {
    if(err) throw err;
    if(!skills){
      console.log("Record Not Deleted");
    }
    else{
      console.log("Record Deleted");
    }
});

  for (i = 0; i < req.body.skills.length; i++) { 
    newSkills.skills.push({
      name : req.body.skills[i].name,
      experience : req.body.skills[i].experience
       });
      }
   
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
            email: user.email,
            isAdmin: user.isAdmin
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Edit Profile
router.post('/editProfile', (req, res, next) => {

  var myquery = { _id: req.headers.userid};
  var newvalues = { fullName: req.body.fullName, phone: req.body.phone , image: req.body.image};
  User.updateOne(myquery, newvalues, function(err, res ) {
    if (err) throw err; 
  });
  return res.json({success: true, msg:'Profile Updated'});
    
});

//Get request Here

//getProfile
router.get('/getProfile', (req, res, next) => {
  User.getUserById( req.headers.userid, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
    else{
      return res.json(user);
    }
});
});

//Get skills
router.get('/getSkills', (req, res, next) => {
  Skills.getSkillsByUserId( req.headers.userid, (err, skills) => {
    if(err) throw err;
    if(!skills){
      return res.json({success: false, msg: 'Skills not found for the given user.'});
    }
    else{
      return res.json(skills.skills);
    }
});
});

//Get training
router.get('/getTrainings', (req, res, next) => {
  Training.getTrainingsByUserId( req.headers.userid, (err, trainings) => {
    if(err) throw err;
    if(!trainings){
      return res.json({success: false, msg: 'Trainings not found for the given user.'});
    }
    else{
      return res.json(trainings.training);
    }
});
});

//Get Organization
router.get('/getOrganization', (req, res, next) => {
  Organization.getOrganizationByUserId( req.headers.userid, (err, organization) => {
    if(err) throw err;
    if(!organization){
      return res.json({success: false, msg: 'Organization not found for the given user.'});
    }
    else{
      return res.json(organization.organization);
    }
});
});


//getListOfRegisteredUsers
router.get('/getListOfAllRegisteredUsers', (req, res, next) => {
  User.find(  (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'No Registered Users Found.'});
    }
    else{
      return res.json(user);
    }
});
});

//getListOfTrainings
router.get('/getListOfAllTrainings', (req, res, next) => {
  Training.find(  (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'No Trainings Found.'});
    }
    else{
      return res.json(user);
    }
});
});

//getListOfOrganizations
router.get('/getListOfAllOrganizations', (req, res, next) => {
  Organization.find(  (err, organization) => {
    if(err) throw err;
    if(!organization){
      return res.json({success: false, msg: 'No Organizations Found.'});
    }
    else{
      return res.json(organization);
    }
});
});


// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});



module.exports = router;
