import * as express from 'express';
import linkListController from '../controllers/link-list.controller';
import { auth } from '../middlewares/check-valid-token.middleware';
export const linkListRouter = express.Router();
linkListRouter.use(express.json());

linkListRouter.post('/', auth, linkListController.createLinkList);
linkListRouter.get('/', auth, linkListController.getAllLinkList);
linkListRouter.get('/:linkListId', auth, linkListController.getLinkList);
linkListRouter.delete('/:linkListId', auth, linkListController.deleteLinkList);
