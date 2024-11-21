import { Link } from "react-router-dom";
import styles from "../list.module.css";
import { React, useEffect, useState } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import {
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Table } from "antd";

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

  const columns = [
    {
      title: "Rental ID",
      dataIndex: "rentalid",
      key: "rentalid",
    },
    {
      title: "Member Name",
      dataIndex: "membername",
      key: "membername",
    },
    {
      title: "Book Name",
      dataIndex: "bookname",
      key: "bookname",
    },
    {
      title: "Rent Start",
      dataIndex: "rentstart",
      key: "rentstart",
    },
    {
      title: "Rent End",
      key: "rentend",
      dataIndex: "rentend",
    },
    {
      title: "Returned?",
      key: "rentreturn",
      dataIndex: "rentreturn",
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
  const data = rentallist
    .filter((item) => item.isActive === true)
    .map((item) => ({
      key: item.id,
      rentalid: item.rentalid,
      membername: item.membername,
      bookname: item.bookname,
      rentstart: dateFormat(item.rentstart, "dd/mm/yyyy"),
      rentend: dateFormat(item.rentend, "dd/mm/yyyy"),
      rentreturn: item.rentreturn.toString(),
      modify: (
        <Link to={`/rentals/${item.rentalid}/edit`}>
          <EditOutlined className={styles.editButton} />
        </Link>
      ),
      delete: (
        <DeleteOutlined
          onClick={(e) => deleteRental(e, item.id)}
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
          Rentals
          <Link to="/newrental">
            <button className={styles.addNewButton}>Add new rental</button>
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
                        <EditOutlined className={styles.removeButton} />
                      </Link>
                    </td>
                    <td>
                      <DeleteOutlined
                        onClick={(e) => deleteRental(e, item.id)}
                        className={styles.removeButton}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>*/
