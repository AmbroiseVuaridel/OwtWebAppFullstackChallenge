export class Boat {
  id: string;
  name: string;
  description:string;

  constructor(obj){
    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
  }
}
