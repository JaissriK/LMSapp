import { Link } from "react-router-dom";
import styles from "../list.module.css";
import { React, useEffect, useState } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import { CloseCircleFilled } from "@ant-design/icons";

export default function Rentallist() {
  const [rentallist, setRentallist] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/rental/allrentals")
      .then((response) => setRentallist(response.data.rentalData))
      .catch((error) => console.error("Error fetching rental data:", error));
  }, []);

  //console.log(rentallist, setRentallist);

  const deleteRental = async (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Removing...";

    try {
      const response = await axios.put(
        `http://localhost:3000/rental/${id}/update`,
        { isActive: false }
      );
      thisClicked.closest("tr").remove();
      console.log("Data deleted:", response.data);
      alert("Rental removed successfully!");
    } catch (error) {
      console.error("Error deleting rental data:", error);
    }
    //setAddbook({ bookid: "", bookname: "", authorname: "", copies: 0 });
  };

  return (
    <div className={styles.layout}>
      <div className={styles.formLayout}>
        <h3 className={styles.titlePanel}>
          Rentals
          <Link to="/newrental">
            <button className={styles.addNewButton}>Add new rental</button>
          </Link>
          <Link to="/" className={styles.backButton}>
            <CloseCircleFilled />
          </Link>
        </h3>
        <div className={styles.tablediv}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.tableheader}>
                <th>Rental ID</th>
                <th>Member ID</th>
                <th>Book ID</th>
                <th>Rent Start</th>
                <th>Rent End</th>
                <th>Returned?</th>
                <th>Modify</th>
                <th>Delete</th>
              </tr>
              <tr></tr>
              {rentallist
                .filter((item) => item.isActive === true)
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.rentalid}</td>
                    <td>{item.memberid}</td>
                    <td>{item.bookid}</td>
                    <td>{dateFormat(item.rentstart, "dd/mm/yyyy")}</td>
                    <td>{dateFormat(item.rentend, "dd/mm/yyyy")}</td>
                    <td>{item.rentreturn.toString()}</td>
                    <td>
                      <Link to={`/rentals/${item.rentalid}/edit`}>
                        <button className={styles.removeButton} type="button">
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={(e) => deleteRental(e, item.id)}
                        className={styles.removeButton}
                        type="button"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
