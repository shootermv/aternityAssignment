export interface IRole {
  id?: string;
  name: string;
  description: string;
  privileges: Array<string>;
  isSelected?:boolean
}
export class Role implements IRole{
  constructor(
  public name: string,
  public description: string,
  public privileges: Array<string>,
  public id?: string){}
}