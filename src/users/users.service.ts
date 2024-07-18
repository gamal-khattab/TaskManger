import { Injectable , ConflictException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(registerDto: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const { email, password , username} = registerDto;
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      console.log("exist");
      throw new ConflictException('Email already exists');
      
    }
    else{
      const createdUser = new this.userModel({
        ...registerDto,
        password: hashedPassword,
      });
      return createdUser.save();
    }
  }

  async findByCredentials(loginDto: LoginDto): Promise<User> {
    const user = await this.userModel.findOne({ email: loginDto.email });
    
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      console.log("here");
      return user;
    }
   else{
    console.log("not here");
    return null;
   }
  }
}
