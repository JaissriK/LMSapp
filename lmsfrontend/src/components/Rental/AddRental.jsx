import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../add.module.css";
import axios from "axios";
import { Select } from "antd";

export default function AddRental() {
  const [addrental, setAddrental] = useState({
    rentalid: "",
    membername: "",
    bookname: "",
    rentstart: "",
    rentend: "",
    rentreturn: "false",
  });
  const [booklist, setBooklist] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/book/allbooks")
      .then((response) => setBooklist(response.data.bookData))
      .catch((error) => console.error("Error fetching book data:", error));
  }, []);

  const books = booklist
    .filter((book) => book.isActive === true)
    .map((book) => ({
      value:
        book.bookname +
        " - " +
        book.authorname +
        " - " +
        book.genre +
        " - " +
        book.bookid,
      label:
        book.bookname +
        " - " +
        book.authorname +
        " - " +
        book.genre +
        " - " +
        book.bookid,
    }));
  //console.log(books);

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const handleInput = (e) => {
    e.persist();
    setAddrental({ ...addrental, [e.target.name]: e.target.value });
  };

  const handleDropdown = (value) => {
    setAddrental({ ...addrental, ["bookname"]: value });
    console.log(`selected ${value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addrental);
    try {
      const response = await axios.post(
        "http://localhost:3000/rental/",
        addrental
      );
      console.log("Data created:", response.data);
    } catch (error) {
      console.error("Error creating rental data:", error);
    }
    setAddrental({
      rentalid: "",
      membername: "",
      bookname: "",
      rentstart: "",
      rentend: "",
    });
  };

  return (
    <div className={styles.layout}>
      <div className={styles.formLayout}>
        <h3 className={styles.titlePanel}>
          New Rental
          <Link to="/rentals" className={styles.backButton}>
            <h5>Back</h5>
          </Link>
        </h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Rental ID</label>
          <input
            className={styles.ipField}
            onChange={handleInput}
            type="text"
            name="rentalid"
            value={addrental.rentalid}
          />
          <label>Member Name</label>
          <input
            className={styles.ipField}
            onChange={handleInput}
            type="text"
            name="membername"
            value={addrental.membername}
          />
          <label>Book Name</label>
          <Select
            showSearch
            placeholder="Select a Book"
            optionFilterProp="label"
            onSearch={onSearch}
            className={styles.ipField}
            onChange={handleDropdown}
            type="text"
            name="bookname"
            //value={addrental.bookname}
            options={books}
          />
          <label>Rent Start Date</label>
          <input
            className={styles.ipField}
            onChange={handleInput}
            type="date"
            name="rentstart"
            value={addrental.rentstart}
          />
          <label>Rent End Date</label>
          <input
            className={styles.ipField}
            onChange={handleInput}
            type="date"
            name="rentend"
            value={addrental.rentend}
          />
          <button className={styles.submitButton} type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

/* <label>Rent Return Date</label>
          <input
            className={styles.ipField}
            onChange={handleInput}
            type="date"
            name="rentreturn"
            value={addrental.rentreturn}
          /> */
