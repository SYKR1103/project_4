import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus} from '@nestjs/common';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepo : Repository<Product>
  ) {}

    async createProduct(c:CreateProductDto) {
      const newproduct = await this.productRepo.create(c)
      await this.productRepo.save(newproduct)
      return newproduct
    }

    async getProducts() {
      return this.productRepo.find()
    }

    async getProductById(id : string) {
      const foundproduct = await this.productRepo.findOneBy({id})
      if (foundproduct) return foundproduct
      throw new HttpException("not found", HttpStatus.NOT_FOUND)
    }

    async updateProductById(id : string, product:UpdateProductDto) {
      await this.productRepo.update(id, product)
      const updatedproduct = await this.productRepo.findOneBy({id})
      if (updatedproduct) return updatedproduct
      throw new HttpException("not found", HttpStatus.NOT_FOUND)
    }

    async deleteProductById(id : string) {
      const deleteresponse = await this.productRepo.delete(id)
      if (! deleteresponse.affected) {throw new HttpException("not found", HttpStatus.NOT_FOUND)}
    }


}
