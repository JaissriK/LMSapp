import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../add.module.css";
import axios from "axios";

export default function EditBook() {
  let { bookid } = useParams();

  const [addbook, setAddbook] = useState({
    bookid: "",
    bookname: "",
    authorname: "",
    genre: "",
    copies: 0,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/book/${bookid}/edit`)
      .then((response) => setAddbook(response.data.addbook))
      .catch((error) => console.error("Error fetching book data:", error));
  }, [bookid]);

  const handleInput = (e) => {
    e.persist();
    setAddbook({ ...addbook, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    //console.log(addbook);

    try {
      const response = await axios.put(
        `http://localhost:3000/book/${addbook.id}/update`,
        addbook
      );
      console.log("Data created:", response.data);
      alert("Updated successfully!");
    } catch (error) {
      console.error("Error updating book data:", error);
    }
    //setAddbook({ bookid: "", bookname: "", authorname: "", copies: 0 });
  };

  return (
    <div className={styles.layout}>
      <div className={styles.formLayout}>
        <h3 className={styles.titlePanel}>
          Modify Book
          <Link to="/books" className={styles.backButton}>
            <h5>Back</h5>
          </Link>
        </h3>
        <form onSubmit={handleUpdate} className={styles.form}>
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
            Update
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
