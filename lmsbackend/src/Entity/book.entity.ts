import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bookid: string;

  @Column()
  bookname: string;

  @Column()
  authorname: string;

  @Column()
  genre: string;

  @Column()
  copies: number;

  @Column()
  isActive: boolean;
}
