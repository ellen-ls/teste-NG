import { Request, Response } from "express";
import { UserBusiness } from "../bussines/UserBussines";
import { LoginInputDTO, UserInputDTO } from "../types/types";

export class UserController {

      public signup = async (req: Request, res: Response) => {
        try {
          const {username, password } = req.body;
    
          const input: UserInputDTO = {
            username,
            password
          };

          const userBusiness = new UserBusiness()
          const token = await userBusiness.signup(input);
          
    
          res.status(201).send({ message: "Usuário criado!" , token });
        } catch (error: any) {
          res.status(400).send(error.message);
        }
      }
      public login = async (req: Request, res: Response) => {
        try {
          const { username, password } = req.body;
    
          const input: LoginInputDTO = {
            
            username,
            password,
          };
          const userBusiness = new UserBusiness()
          const token = await userBusiness.login(input);
    
          res.status(201).send({ token });
        } catch (error: any) {
          res.status(400).send(error.message);
        }
      };
    };