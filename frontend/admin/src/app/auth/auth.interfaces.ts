export interface User {
  username: string;
  password: string;
}

export class TokenPayload{
  username: string;
  _id: string;
  email: string;
  fullname: string;
  role: string[];
  sub: string;
  iat: number;
  exp: number;

  constructor(userData: UserData) {
    
    this._id = userData._id;
    this.username = userData['show_Felhasználónév'];
    this.fullname = userData['show_Név'];
    this.email = userData['show_Email'];
    this.role = userData['array_Szerepkör(ök)'];
    this.sub = userData.sub;
    this.iat = userData.iat;
    this.exp = userData.exp;
  }
}

export class UserData {
  _id: string;
  'show_Felhasználónév': string;
  'show_Név': string;
  'show_Email': string;
  'array_Szerepkör(ök)': string[];
  sub: string;
  iat: number;
  exp: number;

  constructor(payload: TokenPayload) {
    
    this._id = payload._id;
    this['show_Felhasználónév'] = payload.username;
    this['show_Név'] = payload.fullname;
    this['show_Email'] = payload.email;
    this['array_Szerepkör(ök)'] = payload.role;
    this.sub = payload.sub;
    this.iat = payload.iat;
    this.exp = payload.exp;
  }
}

interface Info {
  message?: string;
}

export interface TokenResponse {
  access_token?: string;
  info?: Info;
}
