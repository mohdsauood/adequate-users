export interface DefaultRes {
  $id: string;
  code: number;
  message: string;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}
export interface LoginUser {
  email: string;
  password: string;
}

export interface UserRes extends DefaultRes {
  data: {
    $id: string;
    Id: string;
    Name: string;
    Email: string;
    Token: string;
  };
}

export interface EmailAlreadyExistsRes extends DefaultRes {
  data: null;
}

export interface InvalidUserRes extends DefaultRes {
  data: null;
}

export interface User {
  $id: string;
  Id: string;
  Name: string;
  Email: string;
  Token: string;
}
