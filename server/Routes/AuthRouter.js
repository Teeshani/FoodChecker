const router = require('express').Router();

router.post('/login', (req,res) => {
    res.send('login success');
});

router.post('/signup', signupValidation, signup);


module.exports = router;