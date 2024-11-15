import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../add.module.css";
import axios from "axios";
import dateFormat from "dateformat";

export default function EditRental() {
  let { rentalid } = useParams();

  const [addrental, setAddrental] = useState({
    rentalid: "",
    memberid: "",
    bookid: "",
    rentstart: "",
    rentend: "",
    rentreturn: "false",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/rental/${rentalid}/edit`)
      .then((response) => setAddrental(response.data.addrental))
      .catch((error) => console.error("Error fetching rental data:", error));
  }, [rentalid]);

  const handleInput = (e) => {
    e.persist();
    setAddrental({ ...addrental, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addrental);
    try {
      const response = await axios.put(
        `http://localhost:3000/rental/${addrental.id}/update`,
        addrental
      );
      console.log("Data created:", response.data);
      alert("Updated successfully!");
    } catch (error) {
      console.error("Error creating rental data:", error);
    }
    /*setAddrental({
      rentalid: "",
      memberid: "",
      bookid: "",
      rentstart: "",
      rentend: "",
    });*/
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
            value={dateFormat(addrental.rentstart, "yyyy-mm-dd")}
          />
          <label>Rent End Date</label>
          <input
            className={styles.ipField}
            onChange={handleInput}
            type="date"
            name="rentend"
            value={dateFormat(addrental.rentend, "yyyy-mm-dd")}
          />
          <button className={styles.submitButton} type="submit">
            Update
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
