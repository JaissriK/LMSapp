import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rentalid: string;

  @Column()
  memberid: string;

  @Column()
  bookid: string;

  @Column()
  rentstart: Date;

  @Column()
  rentend: Date;

  @Column()
  rentreturn: boolean;

  @Column()
  isActive: boolean;
}
