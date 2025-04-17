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
router.post('/:id/append-question/:questionId', controller.append_question)
router.post('/:id/remove-question/:questionId', controller.remove_question)


module.exports = router;
