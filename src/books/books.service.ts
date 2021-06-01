import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

// TODO Удалить
const testBooks = [
  {
    id: '1',
    title: 'Book Title 1',
    description: 'Description 1',
    authors: 'Author 1',
  },
  {
    id: '2',
    title: 'Book Title 2',
    description: 'Description 2',
    authors: 'Author 2',
  },
];

@Injectable()
export class BooksService {
  private books: Book[] = [...testBooks];

  findById(id: string): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  findAll(): Book[] {
    return this.books;
  }

  create(book: CreateBookDto): void {
    this.books.push(book);
  }

  update(id: string, updatedBook: UpdateBookDto): void {
    this.books = this.books.map((book) =>
      book.id === id ? { id, ...updatedBook } : book,
    );
  }

  deleteById(id: string): void {
    this.books = this.books.filter((book) => book.id !== id);
  }
}
