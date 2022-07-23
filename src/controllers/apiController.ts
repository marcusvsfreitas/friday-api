import { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();

export const ping = (req: Request, res: Response) => {
  res.json("Hello word!")
}