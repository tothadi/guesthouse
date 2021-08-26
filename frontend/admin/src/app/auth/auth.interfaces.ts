export interface User {
    username: string;
    password: string;
}

export interface TokenPayload {
    username: string;
    sub: string;
    iat: number;
    exp: number;
}

interface Info {
    message?: string;
}

export interface TokenResponse {
    access_token?: string;
    info?: Info;
}