import { Link } from "react-router-dom";
import styles from "../list.module.css";
import { React, useEffect, useState } from "react";
import axios from "axios";
import { CloseCircleFilled } from "@ant-design/icons";

export default function Memberlist() {
  const [memberlist, setMemberlist] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/member/allmembers")
      .then((response) => setMemberlist(response.data.memberData))
      .catch((error) => console.error("Error fetching member data:", error));
  }, []);

  //console.log(memberlist, setMemberlist);

  const deleteMember = async (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Removing...";

    try {
      const response = await axios.put(
        `http://localhost:3000/member/${id}/update`,
        { isActive: false }
      );
      thisClicked.closest("tr").remove();
      console.log("Data deleted:", response.data);
      alert("Member removed successfully!");
    } catch (error) {
      console.error("Error deleting member data:", error);
    }
    //setAddbook({ bookid: "", bookname: "", authorname: "", copies: 0 });
  };

  return (
    <div className={styles.layout}>
      <div className={styles.formLayout}>
        <h3 className={styles.titlePanel}>
          Members
          <Link to="/newmember">
            <button className={styles.addNewButton}>Add new member</button>
          </Link>
          <Link to="/home" className={styles.backButton}>
            <CloseCircleFilled />
          </Link>
        </h3>
        <div className={styles.tablediv}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.tableheader}>
                <th>Member ID</th>
                <th>Member Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Modify</th>
                <th>Delete</th>
              </tr>
              <tr></tr>
              {memberlist
                .filter((item) => item.isActive === true)
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.memberid}</td>
                    <td>{item.membername}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <Link to={`/members/${item.memberid}/edit`}>
                        <button className={styles.removeButton} type="button">
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={(e) => deleteMember(e, item.id)}
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
