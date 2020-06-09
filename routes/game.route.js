const express = require('express');
const router = express.Router();

const game_controller = require('../controllers/game.controller');

/* appel la methode create_new_personnage qui se trouve dans le controller game */
router.get('/create_personnage', game_controller.create_new_personnage);

module.exports = router;