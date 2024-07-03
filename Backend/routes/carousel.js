const express = require('express')
const router = express.Router()
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate')
const { createCarousel, getAllCarousels, deleteCarousel } = require('../controllers/carouselController');

//for storing avatar images into uploads folder
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..','uploads/carousel'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });

  //create
  router.route('/carousel/new').post(isAuthenticatedUser,authorizeRoles('admin'),upload.single('image'), createCarousel)
  router.route('/carousels').get( getAllCarousels)

  router.route('/carousel/:id').delete(isAuthenticatedUser,authorizeRoles('admin'), deleteCarousel)


  module.exports = router