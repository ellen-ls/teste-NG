export type Users = {

    id: string,
    username: string,
    password: string,
    accountId: string


}

export interface UserInputDTO {
    username: string,
    password: string
}

export type Accounts = {

    id: string,
    balance: number,
    statement: Array<Transactions>

}

export interface AccountsDTO {
    balance:number,
    statement: Array<Transactions>
}

export interface LoginInputDTO {

    username: string,
    password: string
}

export type Transactions = {
    id: string,
    debitedAccountId: number,
    creditedAccountId: number,
    createdAt: Date,
    value: number
}

export type AuthenticationData = {
    id: string,
}



