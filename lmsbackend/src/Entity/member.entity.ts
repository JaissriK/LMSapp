import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  memberid: string;

  @Column()
  membername: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  isActive: boolean;
}
