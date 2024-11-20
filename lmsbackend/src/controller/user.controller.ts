import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from 'src/service/users.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  async signup(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.signup(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }
  @Post('/signin')
  async SignIn(@Res() response, @Body() createUserDto: CreateUserDto) {
    const token = await this.usersService.signin(
      createUserDto,
      this.jwtService,
    );
    return response.status(HttpStatus.OK).json(token);
  }
}
