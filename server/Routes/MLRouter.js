const { predict } = require('../Controllers/mlController');


const router = require('express').Router();

router.post('/predict', predict);


module.exports = router;