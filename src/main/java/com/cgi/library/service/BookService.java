package com.cgi.library.service;

import com.cgi.library.entity.Book;
import com.cgi.library.model.BookDTO;
import com.cgi.library.model.BookStatus;
import com.cgi.library.repository.BookRepository;
import com.cgi.library.util.ModelMapperFactory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Page<BookDTO> getBooks(BookStatus status, Pageable pageable) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        return bookRepository.findAllByStatus(status, pageable).map(book -> modelMapper.map(book, BookDTO.class));
    }

    public Page<BookDTO> searchBooks(String term, BookStatus status, Pageable pageable) {
        //https://www.baeldung.com/java-modelmapper-lists
        //https://www.youtube.com/watch?v=NMA4ndswwuo
        //https://www.bezkoder.com/spring-data-pageable-custom-query/
        //Need aitasid õigest käima panna, aga loogika on ise loodud
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        return bookRepository.searchBooks(term, status.name(), pageable).map(book -> modelMapper.map(book, BookDTO.class));
    }

    public BookDTO getBook(UUID bookId) {
        Book book = bookRepository.getOne(bookId);
        return ModelMapperFactory.getMapper().map(book, BookDTO.class);
    }

    public UUID saveBook(BookDTO bookDTO) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        return bookRepository.save(modelMapper.map(bookDTO, Book.class)).getId();
    }

    public void deleteBook(UUID bookId) {
        bookRepository.deleteById(bookId);
    }
}
