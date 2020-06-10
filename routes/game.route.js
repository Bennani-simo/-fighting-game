const express = require('express');
const router = express.Router();

const game_controller = require('../controllers/game.controller');

router.get('/', game_controller.main);
router.get('/monstres', game_controller.main2);

router.post('/recup_personnage', game_controller.recup_personnage);

router.get('/recup_classes', game_controller.recup_classes);

router.get('/recup_monstres', game_controller.recup_monstres);







/* appel la methode create_new_personnage qui se trouve dans le controller game */
router.post('/create_personnage', game_controller.create_new_personnage);

module.exports = router;