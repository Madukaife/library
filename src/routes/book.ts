import express from 'express';
import controller from '../controllers/book';
import { schemas, validateSchema } from '../middleware/validateSchema';



const router = express.Router();

router.post('/create', validateSchema(schemas.book.create), controller.createBook);
router.get('/readBook', controller.readBook);
router.get('/getAll', controller.readAllBook);
router.patch('/update', validateSchema(schemas.book.update), controller.updateBook);
router.delete('/delete', controller.deleteBook);

export = router;