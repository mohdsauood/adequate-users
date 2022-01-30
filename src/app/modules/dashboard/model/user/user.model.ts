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
  $id: '1';
  page: 1;
  per_page: 10;
  totalrecord: 2812;
  total_pages: 282;
  data: User[];
}

export interface AddUserReq {
  name: string;
  email: string;
  location: string;
}
