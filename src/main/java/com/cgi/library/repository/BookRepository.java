package com.cgi.library.repository;

import com.cgi.library.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {

    Page<Book> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    @Query(value = "SELECT * FROM book WHERE title ILIKE %:term% or author ILIKE %:term% or genre ILIKE %:term%",
            nativeQuery = true)
    Page<Book> searchBooks(@Param("term") String term, Pageable pageable);

}
