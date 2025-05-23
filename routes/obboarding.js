// routes/onboardingRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer(); 

const {
  createOnboarding,
  getAllOnboardings,
  updateOnboarding,
  deleteOnboarding
} = require('../controllers/onboardingController');

router.post('/create',upload.none(), createOnboarding);
router.get('/all',upload.none(), getAllOnboardings);
router.put('/update/:id',upload.none(), updateOnboarding);
router.delete('/delete/:id',upload.none(), deleteOnboarding);

module.exports = router;
