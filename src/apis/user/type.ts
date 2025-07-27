export interface loginForm {
    username: string;
    password: string;
}

interface dataType {
    token?: string
    message?: string
}

export interface loginResponseData {
    code: number;
    data: dataType
}

interface checkUserType {
    userId: number;
    avatar: string;
    username: string;
    password: string;
    desc: string;
    roles: Array<string>;
    buttons: Array<string>;
    routes: Array<string>;
    token: string;
}

interface dataResponseType {
    checkUser: checkUserType
}

export interface userResponseData {
    code: number;
    data: dataResponseType
}