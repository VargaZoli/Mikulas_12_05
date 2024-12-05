import { Injectable } from '@nestjs/common';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { PrismaService } from '../prisma.service'; 
import { Kid } from '@prisma/client'; 



@Injectable()
export class KidService {
  constructor(private readonly prisma: PrismaService) {}

  create(createKidDto: CreateKidDto) {
    
  }


  async addToyToKid(kidId: number, toyId: number): Promise<void> {
    await this.prisma.kid.update({
      where: { id: kidId },
      data: {
        toys: {
          connect: { id: toyId },  
        },
      },
    });
  }

  async removeToyFromKid(kidId: number, toyId: number): Promise<void> {
    await this.prisma.kid.update({
      where: { id: kidId },
      data: {
        toys: {
          disconnect: { id: toyId }, 
        },
      },
    });
  }



  async findAll(): Promise<Kid[]> {
    return this.prisma.kid.findMany()
    }
    async findOne(id: number): Promise<Kid | null> {
      return this.prisma.kid.findFirst({
        where: { id:id },
        select: {
          id: true,
          name: true,
          address: true,
          goodOrBad: true,
        }
      });
    }

    async update(id: number, data: { name?: string; address?: string; goodOrbad?: boolean; }): Promise<Kid> {
      return this.prisma.kid.update({
        where: { id },
        data,
      });
    }
  

    async remove(id: number): Promise<Kid> {
      return this.prisma.kid.delete({
        where: { id },
      });
    }
}
