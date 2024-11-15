import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { response } from 'express';
import { CreateBookDto } from 'src/dto/create-book.dto';
import { BookService } from 'src/service/book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Res() response, @Body() createBookDto: CreateBookDto) {
    try {
      const newBook = await this.bookService.createBook(createBookDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Book has been created successfully',
        newBook,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Book not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get('/allbooks')
  async getBooks(@Res() response) {
    try {
      const bookData = await this.bookService.getAllBooks();
      return response.status(HttpStatus.OK).json({
        message: 'All books data found successfully',
        bookData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getBook(@Res() response, @Param('id') id: number) {
    try {
      const existingBook = await this.bookService.getBook(id);
      return response.status(HttpStatus.OK).json({
        message: 'Book found successfully',
        existingBook,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:bookid/edit')
  async editBook(@Res() response, @Param('bookid') bookid: string) {
    try {
      const addbook = await this.bookService.editBook(bookid);
      return response.status(HttpStatus.OK).json({
        message: 'Book found successfully',
        addbook,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id/update')
  async updateBook(
    @Res() response,
    @Param('id') id: number,
    @Body() createBookDto: CreateBookDto,
  ) {
    try {
      const existingBook = await this.bookService.updateBook(id, createBookDto);
      //console.log(existingBook);
      return response.status(HttpStatus.OK).json({
        message: 'Book has been successfully updated',
        existingBook,
      });
    } catch (err) {
      console.log(err);
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id/delete')
  async deleteBook(@Res() response, @Param('id') id: number) {
    try {
      const deletedBook = await this.bookService.deleteBook(id);
      return response.status(HttpStatus.OK).json({
        message: 'Book deleted successfully',
        deletedBook,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
