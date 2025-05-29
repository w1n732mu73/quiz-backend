var express = require('express');
var router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

const controller = require('../../controllers/admin/QuestionsController')

router.get('/', controller.index);
router.get('/new', controller.new);
router.get('/search', controller.search)
router.get('/:id', controller.show)
// router.get('/:id/edit', controller.edit)
router.post('/', upload.single('picture'), controller.create);
router.delete('/:id', controller.destroy)
// router.put('/:id', controller.update)


module.exports = router;
