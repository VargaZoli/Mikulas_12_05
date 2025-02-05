import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ToyService } from './toy.service';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { AddToyToKidDto } from '../kid/dto/add-toy-to-kid.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';



@Controller('toy')
@ApiBearerAuth()

export class ToyController {
  constructor(private readonly toyService: ToyService) {}



  /**
   * Modifies the details of an existing toy
   * 
   * @param id The unique ID of the toy
   * @param updatePhoneDto The data to get a toy
   * @returns JSON response
   */
  @Get()
  async findAll() {
    try {
      const toys = await this.toyService.findAll();
      if (!toys || toys.length === 0) {
        throw new HttpException(
          'Nincs talált játék.',
          HttpStatus.NOT_FOUND
        );
      }
      return { data: toys };
    } catch (error) {
      throw new HttpException(
        'Hiba a játékok lekérdezésénél.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  
  /**
   * Modifies the details of an existing toy
   * 
   * @param id The unique ID of the toy
   * @param updatePhoneDto The data to post a toy
   * @returns JSON response
   */
  @Post()
  addToy(@Body() createToyDto: CreateToyDto) {
    return this.toyService.addToy(createToyDto);
  }




  
  /**
   * Modifies the details of an existing toy
   * 
   * @param id The unique ID of the toy
   * @param updatePhoneDto The data to modify post a new toy
   * @returns JSON response
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const toy = await this.toyService.findOne(+id);
      if (!toy) {
        throw new HttpException(
          `Hiba az id keresésénél ${id} `,
          HttpStatus.NOT_FOUND
        );
      }
      return { data: toy };
    } catch (error) {
      throw new HttpException(
        `Hiba az id keresésénél ${id}.`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }




    /**
   * Modifies the details of an existing toy
   * 
   * @param id The unique ID of the toy
   * @param updateToyDto The data to modify
   * @returns JSON response
   */
  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The unique ID of the toy'
  })



  
  /**
   * Modifies the details of an existing toy
   * 
   * @param id The unique ID of the toy
   * @param updatePhoneDto The data to update toy
   * @returns JSON response
   */
  async update(@Param('id') id: string, @Body() updateToyDto: UpdateToyDto) {
    try {
      const updatedToy = await this.toyService.update(+id, updateToyDto);
      if (!updatedToy) {
        throw new HttpException(
          `lehet hogy ilyen id játék nem létezik ${id} .`,
          HttpStatus.NOT_FOUND
        );
      }
      return { message: 'Játék sikeresen frissítve', data: updatedToy };
    } catch (error) {
      throw new HttpException(
        `Hiba a játék frissítésénél ${id}.`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }




  
  /**
   * Deletes the details of an existing toy
   * 
   * @param id The unique ID of the toy
   * @param updatePhoneDto The data to delete the toy
   * @returns JSON response
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedToy = await this.toyService.remove(+id);
      if (!deletedToy) {
        throw new HttpException(
          `Játék ilyen id-val lehet nem létezik: ${id} `,
          HttpStatus.NOT_FOUND
        );
      }
      return { message: 'Sikeres játék törlés' };
    } catch (error) {
      throw new HttpException(
        `Hiba a játék törlésénél: ${id}.`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
