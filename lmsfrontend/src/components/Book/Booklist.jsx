import { Link } from "react-router-dom";
import styles from "../list.module.css";
import { React, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import {
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Pagination } from "antd";

export default function Booklist() {
  const [booklist, setBooklist] = useState([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(() => {
    axios
      .get("http://localhost:3000/book/allbooks/", {
        params: { page, limit: PAGE_SIZE },
      })
      .then((response) => setBooklist(response.data.bookData))
      .catch((error) => console.error("Error fetching book data:", error));
  }, [page]);

  //console.log(booklist, setBooklist);

  const deleteBook = async (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Removing...";

    try {
      const response = await axios.put(
        `http://localhost:3000/book/${id}/update`,
        { isActive: false }
      );
      thisClicked.closest("tr").remove();
      console.log("Data deleted:", response.data);
      alert("Book removed successfully!");
    } catch (error) {
      console.error("Error deleting book data:", error);
    }
    //setAddbook({ bookid: "", bookname: "", authorname: "", copies: 0 });
  };

  return (
    <div className={styles.layout}>
      <div className={styles.formLayout}>
        <h3 className={styles.titlePanel}>
          Books
          <Link to="/newbook">
            <Button className={styles.addNewButton}>Add new book</Button>
          </Link>
          <Link to="/home" className={styles.backButton}>
            <CloseCircleFilled />
          </Link>
        </h3>
        <div className={styles.tablediv}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.tableheader}>
                <th>Book ID</th>
                <th>Book Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Copies</th>
                <th>Modify</th>
                <th>Delete</th>
              </tr>
              <tr></tr>
              {booklist
                .filter((item) => item.isActive === true)
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.bookid}</td>
                    <td>{item.bookname}</td>
                    <td>{item.authorname}</td>
                    <td>{item.genre}</td>
                    <td>{item.copies}</td>
                    <td>
                      <Link to={`/books/${item.bookid}/edit`}>
                        <EditOutlined className={styles.editButton} />
                      </Link>
                    </td>
                    <td>
                      <DeleteOutlined
                        onClick={(e) => deleteBook(e, item.id)}
                        className={styles.removeButton}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {booklist.length / PAGE_SIZE > 1 && (
            <Pagination
              size="small"
              current={page}
              total={booklist.length}
              align="center"
              pageSize={PAGE_SIZE}
              onChange={(page) => setPage(page)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
