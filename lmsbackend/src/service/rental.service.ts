import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from 'src/Entity/rental.entity';
import { CreateRentalDto } from 'src/dto/create-rental.dto';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental) private rentalRepository: Repository<Rental>,
  ) {}

  async createRental(createRentalDto: CreateRentalDto): Promise<Rental> {
    const newRental = await this.rentalRepository.create({
      rentalid: createRentalDto.rentalid,
      membername: createRentalDto.membername,
      bookname: createRentalDto.bookname,
      rentstart: createRentalDto.rentstart,
      rentend: createRentalDto.rentend,
      rentreturn: createRentalDto.rentreturn,
      isActive: true,
    });
    return await this.rentalRepository.save(newRental);
  }

  async getAllRentals(): Promise<Rental[]> {
    const rentalData = await this.rentalRepository.find();
    if (!rentalData || rentalData.length == 0) {
      throw new NotFoundException(`Rental data not found!`);
    }
    return rentalData;
  }
  async getRental(id: number): Promise<Rental> {
    const existingRental = await this.rentalRepository.findOneBy({ id });
    if (!existingRental) {
      throw new NotFoundException(`Rental #${id} not found`);
    }
    return existingRental;
  }

  async editRental(rentalid: string): Promise<Rental> {
    const addrental = await this.rentalRepository.findOneBy({ rentalid });
    if (!addrental) {
      throw new NotFoundException(`Book #${rentalid} not found`);
    }
    return addrental;
  }

  async updateRental(
    id: number,
    createRentalDto: CreateRentalDto,
  ): Promise<Rental> {
    const existingRental = await this.rentalRepository.findOneBy({ id });
    if (!existingRental) {
      throw new NotFoundException(`Rental #${id} not found`);
    }
    const updatedRental = await this.rentalRepository.update(
      id,
      createRentalDto,
    );
    return existingRental;
  }

  async deleteRental(id: number): Promise<Rental> {
    const desiredRental = await this.rentalRepository.findOneBy({ id });
    const deletedRental = await this.rentalRepository.delete(desiredRental);
    if (!deletedRental) {
      throw new NotFoundException(`Rental #${id} not found`);
    }
    return desiredRental;
  }
}
