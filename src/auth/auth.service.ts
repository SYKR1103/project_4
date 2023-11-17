import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { HttpException, HttpStatus} from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadInterface } from './tokenPayload.interface';



@Injectable()
export class AuthService {

  constructor(
    private readonly userService : UserService,
    private readonly configService : ConfigService,
    private readonly jwtService : JwtService
    
  ) {}

  //회원가입
  async createUser(c:CreateUserDto) {try
    {return this.userService.createUser(c)}
  catch(e) {console.log(e)
  throw new HttpException('something wrong', HttpStatus.INTERNAL_SERVER_ERROR)}
  }


  //로그인
  async LoginUser(LoginUserDto : LoginUserDto) {

   
    const user = await this.userService.findUserByEmail(LoginUserDto.email)

    const isMatched = await user.checkPassword(LoginUserDto.password)
    if (!isMatched) throw new HttpException("not matched", HttpStatus.BAD_REQUEST)
    
    return user

  }


  //토큰 생성 
  async generateAccessToken(userId : string): Promise<string> {
    const payload : TokenPayloadInterface = {userId}
    const token = this.jwtService.sign(payload, {

      secret : this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn : this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')
    })

    return token
  }







}

