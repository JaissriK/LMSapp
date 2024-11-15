import { React, useEffect, useState } from "react";
import styles from "./search.module.css";
import { Button, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [searchresults, setSearchresults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setQuery("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchBook() {
      const res = await fetch(`http://localhost:3000/book/allbooks`);
      //const data = await res.json();
      setData((await res.json()).bookData);
    }
    fetchBook();
  }, []);

  const handleChange = (value) => {
    setQuery(value);
  };

  const search = async (e) => {
    e.preventDefault();
    setSearchresults(
      await data.filter(
        (data) =>
          data.bookname.toLowerCase() === query.toLowerCase() ||
          data.authorname.toLowerCase() === query.toLowerCase() ||
          data.genre.toLowerCase() === query.toLowerCase()
      )
    );
  };

  return (
    <div>
      <SearchOutlined onClick={showModal} className={styles.search} />

      <Modal
        title="Search"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <form onSubmit={search}>
          <input
            className={styles.search}
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            type="search"
            placeholder="Search a book"
          />
          <button type="submit" className={styles.submitButton}>
            Search
          </button>
        </form>
        <div className={styles.layout}>
          <div className={styles.formLayout}>
            <div className={styles.tablediv}>
              <table className={styles.table}>
                <tbody>
                  <tr className={styles.tableheader}>
                    <th>Book ID</th>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Copies</th>
                  </tr>
                  <tr></tr>
                  {searchresults
                    .filter((item) => item.isActive === true)
                    .map((item) => (
                      <tr key={item.id}>
                        <td>{item.bookid}</td>
                        <td>{item.bookname}</td>
                        <td>{item.authorname}</td>
                        <td>{item.genre}</td>
                        <td>{item.copies}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
