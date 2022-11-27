import { AccountsDatabase } from "../data/AccountDataBase";
import { CustomError} from "../error/CustomError";
import { IdGenerator } from "../services/IdGenerator";
import { Accounts, AccountsDTO} from "../types/types";


const idGenerator = new IdGenerator()


export class AccountBusiness {
    public creatAccount = async (newAccount:AccountsDTO) => {
      try {
        const { balance, statement } = newAccount;
  
        if (!balance) {
          throw new CustomError(
            400,
            'Balance not found"'
          );
        }
                    
        const id: string = idGenerator.generatorId();
       
        
        const accounts: Accounts = {
            id,
            balance,
            statement,
            
          };
             const accountDatabase = new AccountsDatabase();
             await accountDatabase.insertAccount(accounts);
  
        return id
     
      } catch (error: any) {
        throw new CustomError(400, error.message);
      }
    }
};