import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/service/auth.service';

@Controller('auth')
export class AuthController {}
