package com.cgi.library.controller;

import com.cgi.library.entity.Book;
import com.cgi.library.model.BookDTO;
import com.cgi.library.model.BookStatus;
import com.cgi.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping(value = "getBooks")
    public ResponseEntity<Page<BookDTO>> getBooks(@RequestParam(required = false) String term, @RequestParam(required = false) String status, Pageable pageable) {
        BookStatus bookStatus = status == null ? BookStatus.AVAILABLE : BookStatus.valueOf(status);

        if (term != null) {
            return ResponseEntity.ok(bookService.searchBooks(term, bookStatus, pageable));
        }
        return ResponseEntity.ok(bookService.getBooks(bookStatus, pageable));
    }

    @GetMapping(value = "getBook")
    public ResponseEntity<BookDTO> getBook(@RequestParam(value = "bookId") UUID bookId) {
        return ResponseEntity.ok(bookService.getBook(bookId));
    }

    @PostMapping(value = "saveBook", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> saveBook(@RequestBody BookDTO book) {
        return ResponseEntity.ok(String.valueOf(bookService.saveBook(book)));
    }

    @DeleteMapping(value = "deleteBook")
    public ResponseEntity<String> deleteBook(@RequestParam(value = "bookId") UUID bookId) {
        bookService.deleteBook(bookId);
        return ResponseEntity.ok("");
    }
}
