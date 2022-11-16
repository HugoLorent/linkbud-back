import { Link } from './link';

export type LinkList = {
  id: number;
  name: string;
  description: string;
  links?: Link[];
};
