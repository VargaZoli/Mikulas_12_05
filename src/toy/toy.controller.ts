import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ToyService } from './toy.service';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { AddToyToKidDto } from '../kid/dto/add-toy-to-kid.dto';


@Controller('toy')
export class ToyController {
  constructor(private readonly toyService: ToyService) {}


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
  
  @Post()
  addToy(@Body() createToyDto: CreateToyDto) {
    return this.toyService.addToy(createToyDto);
  }


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

  @Patch(':id')
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
