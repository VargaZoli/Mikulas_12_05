import { IsInt } from 'class-validator';

export class AddToyToKidDto {
  @IsInt()
  kidId: number;

  @IsInt()
  toyId: number;
}
