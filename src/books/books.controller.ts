import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Res,
  HttpStatus,
  Delete,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const books = await this.booksService.findAll();
    res.status(HttpStatus.OK).json(books);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const book = await this.booksService.findById(id);
    res.status(HttpStatus.OK).json(book);
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Res() res: Response) {
    const book = await this.booksService.create(createBookDto);
    res.status(HttpStatus.CREATED).json(book);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Res() res: Response,
  ) {
    const book = await this.booksService.update(id, updateBookDto);
    res.status(HttpStatus.OK).json(book);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const book = await this.booksService.deleteById(id);
    res.status(HttpStatus.OK).json(book);
  }
}
