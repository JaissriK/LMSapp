import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import styles from "./home.module.css";
import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import axios from "axios";

export default function Login({ setIsLoggedIn }) {
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  /*const handleSubmit = async (value) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
  };*/

  const onFinish = async (values) => {
    const { data } = await axios.post(
      "http://localhost:3000/user/signin",
      values
    );
    if (data.status === parseInt("401")) {
      setErrorMessage(data.response);
    } else {
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      navigate("/home");
    }
    console.log("Received values of form: ", values);
  };

  return (
    <div className={styles.home}>
      <div className={styles.loginTitle}>
        <h1>JK LIBRARY</h1>
      </div>
      <div>
        <Form
          className={styles.formLayout}
          name="login"
          initialValues={{
            remember: true,
          }}
          style={{
            maxWidth: 360,
          }}
          onFinish={onFinish}
          //onSubmit={handleSubmit}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="">Forgot password</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>

          <Form.Item>
            <Signup />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
