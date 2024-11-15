import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from 'src/dto/create-book.dto';
import { Book } from 'src/Entity/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = await this.bookRepository.create({
      bookid: createBookDto.bookid,
      bookname: createBookDto.bookname,
      authorname: createBookDto.authorname,
      genre: createBookDto.genre,
      copies: createBookDto.copies,
      isActive: true,
    });
    //console.log(newBook);
    return await this.bookRepository.save(newBook);
  }

  async getAllBooks(): Promise<Book[]> {
    const bookData = await this.bookRepository.find();
    if (!bookData || bookData.length == 0) {
      throw new NotFoundException(`Books data not found!`);
    }
    return bookData;
  }

  async getBook(id: number): Promise<Book> {
    const existingBook = await this.bookRepository.findOneBy({ id });
    if (!existingBook) {
      throw new NotFoundException(`Book #${id} not found`);
    }
    return existingBook;
  }

  async editBook(bookid: string): Promise<Book> {
    const addbook = await this.bookRepository.findOneBy({ bookid });
    if (!addbook) {
      throw new NotFoundException(`Book #${bookid} not found`);
    }
    return addbook;
  }

  async updateBook(id: number, createBookDto: CreateBookDto): Promise<Book> {
    const existingBook = await this.bookRepository.findOneBy({ id });
    if (!existingBook) {
      throw new NotFoundException(`Book #${id} not found`);
    }
    const updatedBook = await this.bookRepository.update(id, createBookDto);
    //console.log(existingBook);
    return existingBook;
  }

  async deleteBook(id: number): Promise<Book> {
    const desiredBook = await this.bookRepository.findOneBy({ id });
    const deletedBook = await this.bookRepository.delete(desiredBook);
    if (!deletedBook) {
      throw new NotFoundException(`Book #${id} not found`);
    }
    return desiredBook;
  }
}
