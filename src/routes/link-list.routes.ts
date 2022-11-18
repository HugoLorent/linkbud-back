import * as express from 'express';
import linkListController from '../controllers/link-list.controller';
import { auth } from '../middlewares/check-valid-token.middleware';
export const linkListRouter = express.Router();
linkListRouter.use(express.json());

linkListRouter.post('/', linkListController.createLinkList);
linkListRouter.get('/:userId', auth, linkListController.getAllLinkList);
