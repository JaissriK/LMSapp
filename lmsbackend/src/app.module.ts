import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Book } from './Entity/book.entity';
import { BookController } from './controller/book.controller';
import { BookService } from './service/book.service';
import { Member } from './Entity/member.entity';
import { Rental } from './Entity/rental.entity';
import { RentalController } from './controller/rental.controller';
import { RentalService } from './service/rental.service';
import { MemberController } from './controller/member.controller';
import { MemberService } from './service/member.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Root',
      database: 'librarymgmtsystem',
      entities: [Book, Member, Rental],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Book]),
    TypeOrmModule.forFeature([Member]),
    TypeOrmModule.forFeature([Rental]),
  ],

  controllers: [
    AppController,
    BookController,
    MemberController,
    RentalController,
  ],
  providers: [AppService, BookService, MemberService, RentalService],
})
export class AppModule {}
