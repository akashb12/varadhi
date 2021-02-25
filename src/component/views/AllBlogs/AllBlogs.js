import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { Link } from "react-router-dom";
import { Select } from 'antd';
import Axios from "axios";
function AllBlogs(props) {
  const { Option } = Select;
  const auth = window.sessionStorage.getItem("loggedIn")
  if (auth === null) {
    props.history.push({
      pathname: '/login',
    })
  }
  const [Blogs, setBlogs] = useState([]);
  const [ByTitleDropdown, setByTitleDropdown] = useState([]);
  const [ByAuthorDropdown, setByAuthorDropdown] = useState([]);
  const [Filter, setFilter] = useState(false);
  const [Value, setValue] = useState('');

  // selected value
  function handleChange(value) {
    setValue(value)
    setFilter(true)
  }

  // select title dropdown
  const selectTitle = ByTitleDropdown.map((blog, index) => {
    return (
      <Option value={blog.TITLE}>{blog.TITLE}</Option>
    )
  });
  // select author dropdown
  const selectAuthor = ByAuthorDropdown.map((user, index) => {
    return (
      <Option value={user.Id}>{user.Name}</Option>
    )
  });

  //   get all blogs
  useEffect(() => {
    Axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      if (response.data) {
        if (Filter && Value != "" && typeof Value === 'string') {
          const data = response.data.filter((blog) => blog.title === Value);
          setBlogs(data.map((blog) => ({
            USERID: blog.userId,
            BLOGID: blog.id,
            TITLE: blog.title,
            BODY: blog.body,
          })))
        }
        else if (Filter && Value != "" && typeof Value !== 'string') {
          const data = response.data.filter((blog) => blog.userId === Value);
          setBlogs(data.map((blog) => ({
            USERID: blog.userId,
            BLOGID: blog.id,
            TITLE: blog.title,
            BODY: blog.body,
          })))
        }
        else {
          setBlogs(
            response.data.map((blog) => ({
              USERID: blog.userId,
              BLOGID: blog.id,
              TITLE: blog.title,
              BODY: blog.body,
            })))
          setByTitleDropdown(
            response.data.map((blog) => ({
              USERID: blog.userId,
              TITLE: blog.title,
              BODY: blog.body,
            })))
        }
      }
      else {
        alert("no blogs")
      }
    });
  }, [Blogs, Filter])

  // get all users
  useEffect(() => {
    Axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      if (response.data) {
        setByAuthorDropdown(
          response.data.map((user) => ({
            Name: user.name,
            Id: user.id,
          })))


      }
      else {
        alert("no users")
      }
    });
  }, [])

  const columns = [
    {
      title: 'USERID',
      dataIndex: 'USERID',
      key: 'userId',
    },
    {
      title: 'BLOGID',
      dataIndex: 'BLOGID',
      key: 'id',
    },
    {
      title: 'TITLE',
      dataIndex: 'TITLE',
      key: 'title',
    },
    {
      title: 'BODY',
      dataIndex: 'BODY',
      key: 'body',
    },
    {
      title: 'VIEW',
      key: 'view',
      dataIndex: 'VIEW',
      render: (text, record) => (
        <Link to={'/blogs/' + record.BLOGID}>
          {"View Blog"}
        </Link>
      ),
    },

  ];
  return (
    <div>
      <div className="filter"><label>Filter By Title:</label> &nbsp;&nbsp;
      <Select defaultValue="" style={{ width: 120 }} onChange={handleChange}>
        <Option value="">All</Option>
        {selectTitle}
      </Select> &nbsp;&nbsp;
      <label>Filter By Author:</label> &nbsp;&nbsp;
      <Select defaultValue="" style={{ width: 120 }} onChange={handleChange}>
        <Option value="">All</Option>
        {selectAuthor}
      </Select></div>

      <Table scroll={{ x: 400 }} dataSource={Blogs} columns={columns} />;
    </div>
  )
}

export default AllBlogs
