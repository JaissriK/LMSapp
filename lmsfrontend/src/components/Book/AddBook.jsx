import { React, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../add.module.css";
import axios from "axios";

export default function AddBook() {
  const [addbook, setAddbook] = useState({
    bookid: "",
    bookname: "",
    authorname: "",
    genre: "",
    copies: 0,
  });

  const handleInput = (e) => {
    e.persist();
    setAddbook({ ...addbook, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addbook);
    try {
      const response = await axios.post("http://localhost:3000/book/", addbook);
      console.log("Data created:", response.data);
      alert("Book added successfully!");
    } catch (error) {
      console.error("Error creating book data:", error);
    }
    setAddbook({
      bookid: "",
      bookname: "",
      authorname: "",
      genre: "",
      copies: 0,
    });
  };

  return (
    <div className={styles.layout}>
      <div className={styles.formLayout}>
        <h3 className={styles.titlePanel}>
          New Book
          <Link to="/books" className={styles.backButton}>
            <h5>Back</h5>
          </Link>
        </h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Book ID</label>
          <input
            className={styles.ipField}
            onChange={handleInput}
            type="text"
            name="bookid"
            value={addbook.bookid}
          />
          <label>Book Title</label>
          <input
            className={styles.ipField}
            onChange={handleInput}
            type="text"
            name="bookname"
            value={addbook.bookname}
          />
          <label>Author</label>
          <input
            className={styles.ipField}
            onChange={handleInput}
            type="text"
            name="authorname"
            value={addbook.authorname}
          />
          <label>Genre</label>
          <input
            className={styles.ipField}
            onChange={handleInput}
            type="text"
            name="genre"
            value={addbook.genre}
          />
          <label>No. of copies</label>
          <input
            className={styles.ipField}
            onChange={handleInput}
            type="number"
            name="copies"
            value={addbook.copies}
          />
          <button className={styles.submitButton} type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

/*const data = {
      bookname: addbook.bookname,
      authorname: addbook.authorname,
      copies: addbook.copies,
    };*/
