import { Link } from "react-router-dom";
import styles from "../list.module.css";
import { React, useEffect, useState } from "react";
import axios from "axios";
import {
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Table } from "antd";

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

  const columns = [
    {
      title: "Member ID",
      dataIndex: "memberid",
      key: "memberid",
    },
    {
      title: "Member Name",
      dataIndex: "membername",
      key: "membername",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
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
  const data = memberlist
    .filter((item) => item.isActive === true)
    .map((item) => ({
      key: item.id,
      memberid: item.memberid,
      membername: item.membername,
      email: item.email,
      phone: item.phone,
      modify: (
        <Link to={`/members/${item.memberid}/edit`}>
          <EditOutlined className={styles.editButton} />
        </Link>
      ),
      delete: (
        <DeleteOutlined
          onClick={(e) => deleteMember(e, item.id)}
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
          Members
          <Link to="/newmember">
            <button className={styles.addNewButton}>Add new member</button>
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
            <EditOutlined className={styles.removeButton} />
          </Link>
        </td>
        <td>
          <DeleteOutlined
            onClick={(e) => deleteMember(e, item.id)}
            className={styles.removeButton}
          />
        </td>
      </tr>
    ))}
</tbody>
</table>*/
