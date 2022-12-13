import { Request, Response } from 'express';
import { client } from '../database/database';
import { Link } from '../models/link';

const createLink = async (req: Request, res: Response) => {
  const newLink: Link = req.body;

  try {
    const result = await client.query(
      'INSERT INTO l_link (l_name, l_url, ll_id) VALUES ($1, $2, $3) RETURNING *',
      [newLink.name, newLink.url, newLink.linkListId]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error,
    });
  }
};

const getAllLink = async (req: Request, res: Response) => {
  try {
    const result = await client.query(
      `SELECT l_link.* FROM l_link 
      INNER JOIN l_link_list ON l_link_list.ll_id = l_link.ll_id
      WHERE l_link_list.u_id = $1`,
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

const getLink = async (req: Request, res: Response) => {
  try {
    const result = await client.query('SELECT * FROM l_link WHERE l_id = $1', [
      req.params.linkId,
    ]);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error,
    });
  }
};

const updateLink = async (req: Request, res: Response) => {
  try {
    const result = await client.query(
      'UPDATE l_link SET l_name = $1, l_url = $2 WHERE l_id = $3 AND u_id = $4 RETURNING *',
      [
        req.body.name,
        req.body.url,
        req.params.linkId,
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

const deleteLink = async (req: Request, res: Response) => {
  try {
    const result = await client.query(
      'DELETE FROM l_link WHERE l_id = $1 RETURNING *',
      [req.params.linkId]
    );
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error,
    });
  }
};

export default { createLink, getAllLink, getLink, updateLink, deleteLink };
