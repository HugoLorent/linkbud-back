import { LinkList } from './link-list';

export type User = {
  id?: number;
  email: string;
  password: string;
  linkList?: LinkList[];
};
