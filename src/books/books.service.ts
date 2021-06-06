import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findById(id: string): Promise<Book> {
    return this.bookModel.findById(id);
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find();
  }

  async create(book: CreateBookDto): Promise<Book> {
    return this.bookModel.create(book);
  }

  async update(id: string, book: UpdateBookDto): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, book, { new: true });
  }

  async deleteById(id: string): Promise<Book> {
    return this.bookModel.findByIdAndDelete(id);
  }
}
