import JWT from 'jsonwebtoken';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { User } from '../models/User';
dotenv.config();

const notAuthorizedJson = { status: 401, message: 'Não autorizado' };

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY as string
};

passport.use(new JWTStrategy(options, async (payload, done) => {
  const user = await User.findByPk(payload.id);

  user ? done(null, user) : done(notAuthorizedJson, false);
}));

export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
  const authFunction = passport.authenticate('jwt', (err, user) => {
    req.user = user;
    user ? next() : next(notAuthorizedJson);
  });

  authFunction(req, res, next);
};

export const generateToken = (data: Object) => {
  return JWT.sign(data, process.env.JWT_SECRET_KEY as string, { expiresIn: "30m" });
};

export default passport;