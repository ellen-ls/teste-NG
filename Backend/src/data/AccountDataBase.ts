import { CustomError } from "../error/CustomError";
import { Accounts } from "../types/types";
import { BaseDatabase } from "./BaseDataBase";


export class AccountsDatabase extends BaseDatabase {
  public insertAccount = async (accounts: Accounts) => {
    try {
      await AccountsDatabase.connection
        .insert({
          id: accounts.id,
          balance: accounts.balance,
          
         
        })
        .into("Accounts");
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
}

  };