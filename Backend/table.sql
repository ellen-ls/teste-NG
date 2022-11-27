-- Active: 1667675128802@@35.226.146.116@3306@Hopper-4313268-ellen-silva
CREATE TABLE IF NOT EXISTS Users(
    id VARCHAR(70) PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    accountId VARCHAR(250),
    FOREIGN KEY (accountId) REFERENCES Accounts(id)
);

CREATE TABLE IF NOT EXISTS Accounts(

    id VARCHAR(70) PRIMARY KEY,
    balance BIGINT
);

CREATE TABLE IF NOT EXISTS Transactions(
    id VARCHAR(70) PRIMARY KEY,
    debitedAccountId VARCHAR(64),
    creditedAccountId VARCHAR(64),
    FOREIGN KEY(debitedAccountId) REFERENCES Accounts(id),
    FOREIGN KEY(creditedAccountId) REFERENCES Accounts(id),
    value INT,
    createdAt DATE
);