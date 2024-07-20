import { RowDataPacket } from "mysql2";

export interface IUsers extends RowDataPacket {
  name: string;
  nameUser: string;
  email: string;
  password: string;
  createAt: Date
}
