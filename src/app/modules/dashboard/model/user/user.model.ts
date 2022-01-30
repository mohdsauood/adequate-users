export interface User {
  $id: string;
  id: number;
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
