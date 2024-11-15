import { React, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../add.module.css";
import axios from "axios";

export default function AddMember() {
  const [addmember, setAddmember] = useState({
    memberid: "",
    membername: "",
    email: "",
    phone: "",
  });

  const handleInput = (e) => {
    e.persist();
    setAddmember({ ...addmember, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addmember);
    try {
      const response = await axios.post(
        "http://localhost:3000/member/",
        addmember
      );
      console.log("Data created:", response.data);
      alert("Member added successfully!");
    } catch (error) {
      console.error("Error creating member data:", error);
    }
    setAddmember({ memberid: "", membername: "", email: "", phone: "" });
  };

  return (
    <div className={styles.layout}>
      <div className={styles.formLayout}>
        <h3 className={styles.titlePanel}>
          New Member
          <Link to="/members" className={styles.backButton}>
            <h5>Back</h5>
          </Link>
        </h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Member ID</label>
          <input
            className={styles.ipField}
            onChange={handleInput}
            type="text"
            name="memberid"
            value={addmember.memberid}
          />
          <label>Member Name</label>
          <input
            className={styles.ipField}
            onChange={handleInput}
            type="text"
            name="membername"
            value={addmember.membername}
          />
          <label>Email</label>
          <input
            className={styles.ipField}
            onChange={handleInput}
            type="email"
            name="email"
            value={addmember.email}
          />
          <label>Phone Number</label>
          <input
            className={styles.ipField}
            onChange={handleInput}
            type="number"
            name="phone"
            value={addmember.phone}
          />
          <button className={styles.submitButton} type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
