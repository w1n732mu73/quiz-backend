var express = require('express');
var router = express.Router();

const controller = require('../../controllers/admin/QuizesController')

router.get('/', controller.index);
router.get('/new', controller.new);
router.get('/:id', controller.show)
router.get('/:id/edit', controller.edit)
router.post('/', controller.create);
router.delete('/:id', controller.destroy)
router.put('/:id', controller.update)


module.exports = router;
