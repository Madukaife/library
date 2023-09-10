import express from 'express';
import controller from '../controllers/author'
import {schemas, validateSchema} from '../middleware/validateSchema'

const router = express.Router();

router.post('/create', validateSchema(schemas.author.create), controller.createAuthor);
router.get('/readAuthor', controller.readAuthor);
router.get('/getAll', controller.readAllAuthor);
router.patch('/update', validateSchema(schemas.author.update), controller.updateAuthor);
router.delete('/delete', controller.deleteAuthor);

export = router; 