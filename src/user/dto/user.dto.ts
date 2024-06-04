import { IsNumber, IsString } from "class-validator";


//username , age , gender and dob.

export class user{
   @IsString()
   username:string

   @IsNumber()
   age:number 

   @IsString()
   password:string

   @IsString()
   gender :string 

   @IsString()
   dob:string
}