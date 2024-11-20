import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const newUser = await this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hash,
      isActive: true,
    });
    return await this.userRepository.save(newUser);
  }

  async signin(createUserDto: CreateUserDto, jwt: JwtService): Promise<any> {
    const foundUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (foundUser) {
      const { password } = foundUser;
      if (bcrypt.compare(createUserDto.password, password)) {
        const payload = { email: createUserDto.email };
        return {
          token: jwt.sign(payload),
        };
      }
      return new HttpException(
        'Incorrect email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return new HttpException(
      'Incorrect email or password',
      HttpStatus.UNAUTHORIZED,
    );
  }
  async getOne(email): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }
}
