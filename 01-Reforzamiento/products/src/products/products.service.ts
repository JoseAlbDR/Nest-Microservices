import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { v4 as Uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(createProductDto: CreateProductDto) {
    const { name, price, description } = createProductDto;

    const newProduct = new Product(Uuidv4(), name, description, price);

    this.products.push(newProduct);

    return this.products;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const { id: _, ...toUpdate } = updateProductDto;

    const product = this.findOne(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, toUpdate);

    return this.products;
  }

  remove(id: string) {
    const product = this.findOne(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.products.filter((product) => product.id !== id);
  }
}
