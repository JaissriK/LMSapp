import { React, useEffect, useState } from "react";
import styles from "./search.module.css";
import { Button, ConfigProvider, Modal } from "antd";
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

  /*useEffect(() => {
    async function fetchBook() {
      const res = await fetch(`http://localhost:3000/book/allbooks`);
      //const data = await res.json();
      setData((await res.json()).bookData);
      setSearchresults((await res.json()).bookData);
    }
    fetchBook();
  }, []);*/

  useEffect(() => {
    fetch(`http://localhost:3000/book/allbooks`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.bookData);
        setSearchresults(data.bookData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    console.log(e.target.value);
    console.log(searchTerm);
    setSearchresults(
      data.filter(
        (data) =>
          data.bookid.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.bookname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.authorname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.genre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    //console.log(setSearchresults);
  };

  const search = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <SearchOutlined onClick={showModal} className={styles.searchIcon} />
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              headerBg: "rgb(236, 224, 192)",
              contentBg: "rgb(236, 224, 192)",
            },
          },
        }}
      >
        <Modal
          title="Search"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          destroyOnClose={true}
        >
          <form>
            <input
              className={styles.search}
              value={query}
              onChange={handleChange}
              type="search"
              placeholder="Search a book"
            />
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
      </ConfigProvider>
    </div>
  );
}
