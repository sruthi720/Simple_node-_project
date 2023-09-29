//add members to this food model class
export class food{
  id!:  string;
  name!: string;
  price!: number;     //'!' reps required
  tags?:  string[];   // string array '?' reps optional
  favorite !: boolean;
  stars!:number;
  imageUrl !:string;
  origins !:string[];
  cookTime!:string;
}
