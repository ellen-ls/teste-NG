import { CustomError } from "../error/CustomError";
import { Users } from "../types/types";
import { BaseDatabase } from "./BaseDataBase";


export class UserDatabase extends BaseDatabase {
  public insertUser = async (user: Users) => {
    try {
      await UserDatabase.connection
        .insert({
          id: user.id,
          username: user.username,
          password: user.password,
          accountId: user.accountId,
         
        })
        .into("Users");
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
}
public findUserByUsername = async (username: string) => {
    try {
      const result = await UserDatabase.connection("Users")
      .select()
      .where({username})

      return result[0]

    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  };