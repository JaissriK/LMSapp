import { React, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../add.module.css";
import axios from "axios";

export default function AddRental() {
  const [addrental, setAddrental] = useState({
    rentalid: "",
    memberid: "",
    bookid: "",
    rentstart: "",
    rentend: "",
    rentreturn: "false",
  });

  const handleInput = (e) => {
    e.persist();
    setAddrental({ ...addrental, [e.target.name]: e.target.value });
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
      memberid: "",
      bookid: "",
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
          <label>Member ID</label>
          <input
            className={styles.ipField}
            onChange={handleInput}
            type="text"
            name="memberid"
            value={addrental.memberid}
          />
          <label>Book ID</label>
          <input
            className={styles.ipField}
            onChange={handleInput}
            type="text"
            name="bookid"
            value={addrental.bookid}
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
