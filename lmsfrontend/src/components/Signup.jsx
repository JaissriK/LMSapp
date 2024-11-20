import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import axios from "axios";

export default function Signup() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adduser, setAdduser] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (name, value) => {
    setAdduser({ ...adduser, value });
    console.log(adduser);
  };

  const onFinish = async (value) => {
    console.log(value);
    try {
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        value
      );

      console.log("Data created:", response.data);
      alert("User added successfully!");
    } catch (error) {
      console.error("Error creating user data:", error);
    }
    setAdduser("");
    console.log("Success", value);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/signin",
        adduser
      );
      console.log(adduser);
      console.log("Data created:", response.data);
      alert("User added successfully!");
    } catch (error) {
      console.error("Error creating user data:", error);
    }
    setAdduser({
      name: "",
      email: "",
      password: "",
    });*/

  return (
    <>
      <div>New user ?...</div>
      <Button type="primary" onClick={showModal}>
        Sign up
      </Button>
      <Modal
        title="Sign up"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onValuesChange={handleChange}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
