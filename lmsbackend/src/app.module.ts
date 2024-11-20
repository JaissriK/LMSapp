import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { secret } from './utils/constants';
import { join } from 'path/posix';
import { User } from './Entity/user.entity';
import { UsersService } from './service/users.service';
import { UserController } from './controller/user.controller';
import { isAuthenticated } from './app.middleware';

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
    TypeOrmModule.forFeature([User]),

    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],

  controllers: [
    AppController,
    BookController,
    MemberController,
    RentalController,
    UserController,
  ],
  providers: [
    AppService,
    BookService,
    MemberService,
    RentalService,
    UsersService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated);
  }
}
