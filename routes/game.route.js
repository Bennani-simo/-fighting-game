const express = require('express');
const router = express.Router();

const game_controller = require('../controllers/game.controller');

router.get('/', game_controller.main);

module.exports = router;