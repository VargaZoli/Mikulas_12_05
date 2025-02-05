import { ApiProperty } from "@nestjs/swagger";
import {  IsInt, IsPositive, IsString  } from "class-validator";


export class CreateToyDto {


 /**
   * A játék neve
   */
  @IsString()
   @ApiProperty({
    example:'Társasjáték'
   })
    name: string;


      /**
   * milyen mati
   */
  @IsString()
  @ApiProperty({
    example: 'Fa'
  })
  Material: string;

  /**
   * a súlya a játéknak
   */
  @IsInt()
  @IsPositive()
  Weight: number;
}
