import { UserDatabase } from "../data/UserDataBase";
import { CustomError, InvalidPassword, InvalidUsername, UserExist, UserNotFound } from "../error/CustomError";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { AccountsDTO, LoginInputDTO, UserInputDTO, Users } from "../types/types";
import { AccountBusiness } from "./AccountsBussines";


const idGenerator = new IdGenerator()
const authenticator = new Authenticator
const balance_default = 100

export class UserBusiness {
    public signup = async (input: UserInputDTO) => {
      try {
        const { username, password } = input;
  
        if (!username ||!password) {
          throw new CustomError(
            400,
            'Fill in the fields "username" and "password"'
          );
        }
  
        if (username.length < 3) {
          throw new InvalidUsername();
        }
        
        const passwordRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})")
        if (!passwordRegex.test(password)) {
            throw new InvalidPassword();
        }
       
        if(password.length < 8){
          throw new InvalidPassword();
        }

          
        const userDatabase = new UserDatabase();
        const userExist = await userDatabase.findUserByUsername(username)

        if(userExist){
          throw new UserExist()
        }

        const id: string = idGenerator.generatorId();
        
        const account: AccountsDTO = {
          balance:balance_default,
          statement:[]
        }

        const accountBussines = new AccountBusiness()
        const accountId = await accountBussines.creatAccount(account)
        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(password)
        
        const user: Users = {
          id,
          username,
          password:hashPassword,
          accountId,
                    
        };
         
        await userDatabase.insertUser(user);
  
         
      } catch (error: any) {
        throw new CustomError(400, error.message);
      }
    };
  
    public login = async (input: LoginInputDTO) => {
      try {
        const { username, password } = input;
  
        if (!username || !password) {
          throw new CustomError(
            400,
            'Fill in the fields "username" and "password"'
          );
        }
            
        const userDatabase = new UserDatabase();
        const user = await userDatabase.findUserByUsername(username);
  
        if(!user){
          throw new UserNotFound();
        }

        const hashManager = new HashManager()
        const hashCompare = await hashManager.compare(password, user.password)
  
        if(!hashCompare){
          throw new InvalidPassword()
        }
        const token = authenticator.generateToken({id: user.id})
  
        return token
  
      } catch (error: any) {
        throw new CustomError(400, error.message);
      }
    }
};