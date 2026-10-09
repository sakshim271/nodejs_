const express = require('express');
const router = express.Router();
const person = require('./../models/person');
const passport = require('../auth');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');


router.post('/signup', async (req, res) => {           
  try {
    const data = req.body                    
    const newperson = new person(data);    
    

    const response = await newperson.save();             
    console.log('data saved successfully');

    const payload = {
      id: response.id,
      username: response.username
    }
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is :", token);


    res.status(201).json({
      message: "Person registered successfully",
      user: {
        id: response._id,
        name: response.name,
        username: response.username,
        email: response.email,
        work: response.work
      },
      token: token
    });
  }
  catch (err) {
    console.log('Error saving person:', err);
    res.status(500).json({ error: 'Internal server error' })
  }
})


// Login Route
router.post('/login', async (req, res) => {
  try {
    //Extract username and password from request body
    const { username, password } = req.body;
    //Find the user by username
    const user = await person.findOne({ username: username });

    // if user does not exist or password doesnt match return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    // generate token 
    const payload = {
      id: user.id,
      username: user.username
    }
    const token = generateToken(payload);

    // return token as response 
    res.json({ token })
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message
    });
  }
});

//Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("User Data:", userData);

    const userId = userData.id;
    const user = await person.findById(userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        error: "Person not found"
      });
    }

    res.status(200).json({ user });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });

  }
})

// GET method to get person
router.get('/', jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await person.find();
    console.log('data fetched');
    res.status(200).json(data);

  } catch (err) {
    console.log('Error saving person:', err);
    res.status(500).json({ error: 'Internal server error' })

  }
})
router.get('/', passport.authenticate('local', { session: false }), async (req, res) => {
  try {
    const data = await person.find().select("-password");
    console.log('data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
);

router.get('/:worktype', async (req, res) => {
  const worktype = req.params.worktype;
  try {
    if (worktype == "chef" || worktype == "manager" || worktype == "waiter") {
      const response = await person.find({ work: worktype }).select("-password");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'invalid' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'server error' });
  }
})

router.put('/:id', async (req, res) => {
  try {
    const personid = req.params.id;
    const updatedperson = req.body;

    const response = await person.findByIdAndUpdate(personid, updatedperson, {
      new: true,
      runValidators: true,
    })
    if (!response) {
      return res.status(404).json({ error: "person not found" });

    }
    console.log("data updated");
    res.status(200).json({
    message: "Person updated successfully"
});

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'server error' });

  }
})

router.delete('/:id', async (req, res) => {
  try {
    const personid = req.params.id;
    const response = await person.findByIdAndDelete(personid);

    if (!response) {
      return res.status(404).json({ error: "person not found" });

    }
    console.log("data deleted");
    res.status(200).json({
    message: "Person deleted successfully"
});;


  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'server error' });
  }
})


module.exports = router;