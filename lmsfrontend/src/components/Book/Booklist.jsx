import { Link } from "react-router-dom";
import styles from "../list.module.css";
import { React, useEffect, useState } from "react";
import axios from "axios";
import { Button, ConfigProvider } from "antd";
import {
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Table } from "antd";

export default function Booklist() {
  const [booklist, setBooklist] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/book/allbooks/")
      .then((response) => setBooklist(response.data.bookData))
      .catch((error) => console.error("Error fetching book data:", error));
  }, []);

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

  const columns = [
    {
      title: "Book ID",
      dataIndex: "bookid",
      key: "bookid",
      //render: (text) => <a>{text}</a>,
    },
    {
      title: "Book Title",
      dataIndex: "bookname",
      key: "bookname",
    },
    {
      title: "Author",
      dataIndex: "authorname",
      key: "authorname",
    },
    {
      title: "Genre",
      key: "genre",
      dataIndex: "genre",
    },
    {
      title: "Copies",
      key: "copies",
      dataIndex: "copies",
    },
    {
      title: "Modify",
      key: "modify",
      dataIndex: "modify",
    },
    {
      title: "Delete",
      key: "delete",
      dataIndex: "delete",
    },
  ];
  const data = booklist
    .filter((item) => item.isActive === true)
    .map((item) => ({
      key: item.id,
      bookid: item.bookid,
      bookname: item.bookname,
      authorname: item.authorname,
      genre: item.genre,
      copies: item.copies,
      modify: (
        <Link to={`/books/${item.bookid}/edit`}>
          <EditOutlined className={styles.editButton} />
        </Link>
      ),
      delete: (
        <DeleteOutlined
          onClick={(e) => deleteBook(e, item.id)}
          className={styles.removeButton}
        />
      ),
    }));
  console.log(data);

  const [top, setTop] = useState("topCenter");

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
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: "rgb(236, 224, 192)",
                  colorBgContainer: "rgb(236, 224, 192)",
                  padding: 5,
                  paddingXS: 5,
                  paddingXXS: 1,
                },
                Pagination: {
                  colorPrimary: "rgb(96, 49, 3)",
                  colorPrimaryHover: "rgb(222, 184, 135)",
                  colorBgContainer: "rgb(236, 224, 192)",
                },
              },
            }}
          >
            <Table
              columns={columns}
              dataSource={data}
              size="small"
              pagination={{
                position: [top],
                pageSize: 5,
              }}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}

/*<table className={styles.table}>
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
          )}*/
