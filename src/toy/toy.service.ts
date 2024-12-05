import { Injectable } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from '../prisma.service'; 
import { Toy } from '@prisma/client'; 



@Injectable()
export class ToyService {
  constructor(private readonly prisma: PrismaService) {}


  async addToy(data: CreateToyDto): Promise<Toy> {
    return this.prisma.toy.create({
      data,
    });
  }

  async findAll(): Promise<Toy[]> {
    return this.prisma.toy.findMany()
    }
    async findOne(id: number): Promise<Toy | null> {
      return this.prisma.toy.findFirst({
        where: { id:id },
        select: {
          id: true,
          name: true,
          Material: true,
          Weight: true,
        }
      });
    }

    

    async update(id: number, data: { name?: string; Material?: string; Weight?: number; }): Promise<Toy> {
      return this.prisma.toy.update({
        where: { id },
        data,
      });
    }
  

    async remove(id: number): Promise<Toy> {
      return this.prisma.toy.delete({
        where: { id },
      });
    }
}
