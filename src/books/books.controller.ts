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
  findAll(@Res() res: Response) {
    const books = this.booksService.findAll();
    res.status(HttpStatus.OK).json(books);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const book = this.booksService.findById(id);
    res.status(HttpStatus.OK).json(book);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto, @Res() res: Response) {
    this.booksService.create(createBookDto);
    res.status(HttpStatus.CREATED).send();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Res() res: Response,
  ) {
    this.booksService.update(id, updateBookDto);
    res.status(HttpStatus.OK).send();
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    this.booksService.deleteById(id);
    res.status(HttpStatus.OK).send();
  }
}
