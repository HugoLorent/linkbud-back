import { Request, Response } from 'express';
import { client } from '../database/database';
import { LinkList } from '../models/link-list';

const createLinkList = async (req: Request, res: Response) => {
  const newLinkList: LinkList = req.body;

  try {
    const result = await client.query(
      'INSERT INTO l_link_list (ll_name, ll_description, u_id) VALUES ($1, $2, $3) RETURNING *',
      [newLinkList.name, newLinkList.description, newLinkList.userId]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error,
    });
  }
};

const getAllLinkList = async (req: Request, res: Response) => {
  try {
    const result = await client.query(
      'SELECT * FROM l_link_list WHERE u_id = $1',
      [res.locals.decodedToken.userId]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error,
    });
  }
};

const getLinkList = async (req: Request, res: Response) => {
  try {
    const result = await client.query(
      'SELECT * FROM l_link_list WHERE ll_id = $1 AND u_id = $2',
      [req.params.linkListId, res.locals.decodedToken.userId]
    );
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error,
    });
  }
};

const deleteLinkList = async (req: Request, res: Response) => {
  try {
    const result = await client.query(
      'DELETE FROM l_link_list WHERE ll_id = $1 RETURNING *',
      [req.params.linkListId]
    );
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error,
    });
  }
};

const updateLinkList = async (req: Request, res: Response) => {
  try {
    const result = await client.query(
      'UPDATE l_link_list SET ll_name = $1, ll_description = $2 WHERE ll_id = $3 AND u_id = $4 RETURNING *',
      [
        req.body.name,
        req.body.description,
        req.params.linkListId,
        res.locals.decodedToken.userId,
      ]
    );
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error,
    });
  }
};

export default {
  createLinkList,
  getAllLinkList,
  getLinkList,
  deleteLinkList,
  updateLinkList,
};
