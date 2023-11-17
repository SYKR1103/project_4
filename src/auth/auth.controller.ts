import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { HttpException, HttpStatus} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post("/signup")
  async createUser(@Body() c:CreateUserDto) {
    return this.authService.createUser(c)
  }
  
  @Post("/login")
  async LoginUser(@Body() l:LoginUserDto) {
    try{
    const user = await this.authService.LoginUser(l)
    const token = await this.authService.generateAccessToken(user.id)
    return token}
    catch(e) {
      console.log(e)
      throw new HttpException("internal error", HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }




}

