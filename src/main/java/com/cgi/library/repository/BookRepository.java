package com.cgi.library.repository;

import com.cgi.library.entity.Book;
import com.cgi.library.model.BookStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {

    //
    @Query(value = "SELECT * FROM book WHERE (title ILIKE %:term% OR author ILIKE %:term% OR genre ILIKE %:term%) AND status=:status",
            nativeQuery = true)
    Page<Book> searchBooks(@Param("term") String term, @Param("status") String status, Pageable pageable);

    Page<Book> findAllByStatus(BookStatus status, Pageable pageable);
}
