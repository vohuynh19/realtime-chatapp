import { BaseModel } from "./base";

export interface User extends BaseModel {
  email: string; // Email
  username: string; // Username
  avatarUrl: string; // Url of avatar
  dob: string; // Date of birth
  gender: string; // FEMALE OR MALE
}
