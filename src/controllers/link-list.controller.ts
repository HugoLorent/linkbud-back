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

    return res.status(201).json({
      message: `${result.rows[0].ll_name} was succesfully created`,
    });
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
      [req.params.userId]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error,
    });
  }
};

export default { createLinkList, getAllLinkList };
