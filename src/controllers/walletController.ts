import { User, UserInstance } from './../models/User';
import { Request, Response } from "express";
import { Wallet } from "../models/Wallet";
import { generateToken } from '../config/passport';
import dotenv from 'dotenv';
dotenv.config();
import { Op } from "sequelize";

export const getWallets = async (req: Request, res: Response) => {
  let user = req.user as UserInstance;
  let filter:boolean | object = false;
  
  if(req.query.name){
    filter = {
      name: {
        [Op.like]: `%${req.query.name}%`
      }
    }
  }
  
  let wallets = await Wallet.findAll({
    where: { iduser: user?.id },
    ...(filter && filter)
  });

  res.json({ data: wallets });
}

export const getWalletByID = async (req: Request, res: Response) => {
  let user = req.user as UserInstance;
  let { id } = req.params;

  let wallet = await Wallet.findOne({
    where: { iduser: user?.id, id },
  });

  if(wallet){
    res.json(wallet);
  }
  
  res.status(404);
  res.json({ error: "A carteira não foi encontrada"});
}

export const newWallet = async (req: Request, res: Response) => {
  if(req.body.name && req.body.type && req.body.color && req.body.icon && req.body.balance){
    let user = req.user as UserInstance;

    let { name, description, type, color, icon, balance } = req.body;
    
    let hasWalletName = await Wallet.findOne({where: { iduser: user.id, name }});

    if(!hasWalletName){
      let newWallet = await Wallet.create({ name, description, type, color, icon, balance, iduser: user.id });

      res.status(201);
      res.json({ id: newWallet.id, success: "A carteira foi criada com sucesso!" });
    } else {
      res.status(400);
      res.json({ error: `Esse nome de carteira já está sendo utilizado.` });      
    }
  } else {
    res.status(400);
    res.json({ error: `Necessário preencher todos os campos!` });
  }
}

export const editWallet = async (req: Request, res: Response) => {
  let user = req.user as UserInstance;
  let { name, description, type, color, icon, balance } = req.body;
  
  let hasWalletName = await Wallet.findOne({where: { iduser: user.id, name, id: {
    [Op.not]: req.params.id
  }}});

  let postData = { name, description, type, color, icon, balance };

  if(!hasWalletName){
    await Wallet.update(postData, { where: { iduser: user.id, id: req.params.id }});

    res.status(201);
    res.json({ success: "A carteira foi atualizada com sucesso!" });
  } else {
    res.status(400);
    res.json({ error: `Esse nome de carteira já está sendo utilizado.` });      
  }
}

export const deleteWallet = async (req: Request, res: Response) => {
  let user = req.user as UserInstance;
  
  await Wallet.destroy({ where: { iduser: user.id, id: req.params.id }});

  res.status(201);
  res.json({ success: "A carteira foi deletada com sucesso!" });
}