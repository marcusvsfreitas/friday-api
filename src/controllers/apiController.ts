import { Request, Response } from "express";
import { User } from "../models/User";
import { generateToken } from '../config/passport';
import dotenv from 'dotenv';
dotenv.config();

export const ping = (req: Request, res: Response) => {
  res.json("Hello word!")
}

export const register = async (req: Request, res: Response) => {
  
  if(req.body.name && req.body.email && req.body.password){
    let { name, email, password } = req.body;
    let hasUser = await User.findOne({where: { email }});

    if(!hasUser){
      let newUser = await User.create({ name, email, password });

      const token = generateToken(
        { id: newUser.id, name: newUser.name, email: newUser.email }
      );

      res.status(201);
      res.json({ id: newUser.id, token });
    } else {
      res.json(`Esse e-mail já está sendo utilizado.`);
    }
  } else {
    res.json(`Necessário preencher todos os campos!`);
  }
}
  
export const login = async (req: Request, res: Response) => {
  if(req.body.email, req.body.password){
    let { email, password } = req.body;
    let user = await User.findOne({
      where: { email, password }
    })
    
    if(user){
      const token = generateToken(
        { id: user.id, name: user.name, email: user.email }
      );

      res.json({ status: true, token });
      return
    }
  }

  res.json({ status: false });
}