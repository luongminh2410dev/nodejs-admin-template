const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/login', siteController.login);
router.post('/login', siteController.auth);
router.get('/logout', siteController.logout);
router.get('/search', siteController.search);
router.get('/', siteController.index);

module.exports = router;