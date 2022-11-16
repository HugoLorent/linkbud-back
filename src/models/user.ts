import { LinkList } from './link-list';

export type User = {
  id: number;
  login: string;
  password: string;
  linkList: LinkList[];
};
