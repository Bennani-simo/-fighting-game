const express = require('express');
const router = express.Router();

const game_controller = require('../controllers/game.controller');

router.get('/', game_controller.main);
/* appel la methode create_new_personnage qui se trouve dans le controller game */
router.post('/create_personnage', game_controller.create_new_personnage);

module.exports = router;