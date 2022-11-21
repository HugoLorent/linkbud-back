import * as express from 'express';
import linkController from '../controllers/link.controller';
import { auth } from '../middlewares/check-valid-token.middleware';

export const linkRouter = express.Router();
linkRouter.use(express.json());

linkRouter.post('/', auth, linkController.createLink);
linkRouter.get('/', auth, linkController.getAllLink);
linkRouter.get('/:linkId', auth, linkController.getLink);
linkRouter.put('/:linkId', auth, linkController.updateLink);
linkRouter.delete('/:linkId', auth, linkController.deleteLink);
