import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { HttpException, HttpStatus} from '@nestjs/common';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepo:Repository<User>
  ) {}
 
  async createUser(c:CreateUserDto) {
    const newuser = await this.userRepo.create(c)
    await this.userRepo.save(newuser)
    return newuser
  }

  async findUserById(id:string) {
    const founduser = await this.userRepo.findOneBy({id})
    if (founduser) return founduser
    throw new HttpException("not found", HttpStatus.NOT_FOUND
    )
  }

  async findUserByEmail(email :string) {
    const founduser = await this.userRepo.findOneBy({email})
    if (founduser) return founduser
    throw new HttpException("not found", HttpStatus.NOT_FOUND
    )
  }




}
