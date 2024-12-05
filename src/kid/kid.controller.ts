import { Controller, Get, Post, Body, Param, Patch, Delete, HttpException, HttpStatus,Put } from '@nestjs/common';
import { KidService } from './kid.service';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { AddToyToKidDto } from './dto/add-toy-to-kid.dto';


@Controller('kid')
export class KidController {
  constructor(private readonly kidService: KidService) {}

  @Put(':kidId/toy/:toyId')
  addToyToKid(@Param('kidId') kidId: string, @Param('toyId') toyId: string) {
    return this.kidService.addToyToKid(Number(kidId), Number(toyId));
  }
    
  @Delete(':kidId/toy/:toyId')
  removeToyFromKid(@Param('kidId') kidId: string, @Param('toyId') toyId: string) {
    return this.kidService.removeToyFromKid(Number(kidId), Number(toyId));
  }



  @Post()
  async create(@Body() createKidDto: CreateKidDto) {
    try {
      const newKid = await this.kidService.create(createKidDto);
      return { message: 'Gyerek sikeresen létrehozva', data: newKid };
    } catch (error) {
      throw new HttpException(
        'Hiba a gyerek létrehozása közben, nézd meg helyesek-e az adatok.',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const kids = await this.kidService.findAll();
      if (!kids || kids.length === 0) {
        throw new HttpException(
          'Nincsenek gyerekek.',
          HttpStatus.NOT_FOUND
        );
      }
      return { data: kids };
    } catch (error) {
      throw new HttpException(
        'Hiba a gyerekek lekérésekor.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const kid = await this.kidService.findOne(+id);
      if (!kid) {
        throw new HttpException(
          `Ilyen id gyerek nem található: ${id}`,
          HttpStatus.NOT_FOUND
        );
      }
      return { data: kid };
    } catch (error) {
      throw new HttpException(
        `Hiba az id keresésekor: ${id}.`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateKidDto: UpdateKidDto) {
    try {
      const updatedKid = await this.kidService.update(+id, updateKidDto);
      if (!updatedKid) {
        throw new HttpException(
          `Ilyen id gyerek lehet nem létezik: ${id}`,
          HttpStatus.NOT_FOUND
        );
      }
      return { message: 'Kid updated successfully', data: updatedKid };
    } catch (error) {
      throw new HttpException(
        `Hiba a gyerek frissítésekor: ${id}.`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedKid = await this.kidService.remove(+id);
      if (!deletedKid) {
        throw new HttpException(
          `Ilyen id gyerek nem létezik:${id}`,
          HttpStatus.NOT_FOUND
        );
      }
      return { message: 'Gyerek sikeresen törölve' };
    } catch (error) {
      throw new HttpException(
        `Hiba a gyerek törlésekor ${id}.`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
