import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get("all")
  async getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Patch(':id')
  async updateProductById(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProductById(id, updateProductDto);
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: string) {
    return this.productService.deleteProductById(id);
  }
}
