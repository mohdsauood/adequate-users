export interface User {
  $id: string;
  id: string;
  name: string;
  email: string;
  profilepicture: string;
  location: string;
  createdat: string;
}

export interface UserRes {
  $id: string;
  page: number;
  per_page: number;
  totalrecord: number;
  total_pages: number;
  data: User[];
}

export interface AddUserReq {
  name: string;
  email: string;
  location: string;
}

export interface editUserReq extends AddUserReq {
  id: string;
}
