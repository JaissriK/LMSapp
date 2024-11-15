import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../add.module.css";
import axios from "axios";

export default function EditMember() {
  let { memberid } = useParams();

  const [addmember, setAddmember] = useState({
    memberid: "",
    membername: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/member/${memberid}/edit`)
      .then((response) => setAddmember(response.data.addmember))
      .catch((error) => console.error("Error fetching member data:", error));
  }, [memberid]);

  const handleInput = (e) => {
    e.persist();
    setAddmember({ ...addmember, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addmember);
    try {
      const response = await axios.put(
        `http://localhost:3000/member/${addmember.id}/update`,
        addmember
      );
      console.log("Data created:", response.data);
      alert("Updated successfully!");
    } catch (error) {
      console.error("Error creating member data:", error);
    }
    //setAddmember({ memberid: "", membername: "", email: "", phone: "" });
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
            type="text"
            name="phone"
            value={addmember.phone}
          />
          <button className={styles.submitButton} type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
