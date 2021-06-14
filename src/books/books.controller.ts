import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  UsePipes,
} from '@nestjs/common';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { createBookSchema } from './joi/create-book.schema';
import { Book } from './schemas/book.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findById(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createBookSchema))
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(createBookSchema))
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Book> {
    return this.booksService.deleteById(id);
  }
}
