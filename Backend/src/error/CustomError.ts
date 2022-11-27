export class CustomError extends Error {
    constructor(statusCode: number, message: string){
        super(message)
    }
}

export class InvalidUsername extends CustomError{ 
    constructor(){
        super(400, "invalid name")
    }
}

export class InvalidPassword extends CustomError{ 
    constructor(){
        super(400, "invalid password")
    }
}

export class UserNotFound extends CustomError{ 
    constructor(){
        super(400, "User not found")
    }
}

export class Unauthorized extends CustomError{ 
    constructor(){
        super(401, "User unauthorized")
    }
}

export class UserExist extends CustomError{
    constructor(){
        super(400, "User already exixts")
    }
}