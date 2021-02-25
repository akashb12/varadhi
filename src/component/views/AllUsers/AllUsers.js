import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { Select } from 'antd';
import Axios from "axios";
function AllUsers(props) {
  const { Option } = Select;
  const auth = window.sessionStorage.getItem("loggedIn")
  if (auth === null) {
    props.history.push({
      pathname: '/login',
    })
  }
  const [Users, setUsers] = useState([]);
  const [ByName, setByName] = useState([]);
  const [Filter, setFilter] = useState(false);
  const [Value, setValue] = useState('');

  // selected value
  function handleChange(value) {
    setValue(value)
    setFilter(true)
  }

  // select dropdown
  const selectuser = ByName.map((user, index) => {
    return (
      <Option value={user.Name}>{user.Name}</Option>
    )
  });

  //   get all users
  useEffect(() => {
    Axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      if (response.data) {
        if (Filter && Value != "") {
          const data = response.data.filter((user) => user.name === Value);
          setUsers(data.map((user) => ({
            Name: user.name,
            Username: user.username,
            Email: user.email,
            Phone: user.phone,
            Website: user.website
          })))
        } else {
          setUsers(
            response.data.map((user) => ({
              Name: user.name,
              Username: user.username,
              Email: user.email,
              Phone: user.phone,
              Website: user.website
            })))
          setByName(
            response.data.map((user) => ({
              Name: user.name,
              Username: user.username,
              Email: user.email,
              Phone: user.phone,
              Website: user.website
            })))
        }
      }
      else {
        alert("no users")
      }
    });
  }, [Users, Filter])



  const columns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'Username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'Phone',
      key: 'phone',
    },
    {
      title: 'Website',
      dataIndex: 'Website',
      key: 'website',
    },

  ];
  return (
    <div>
      <div className="filter">
      <label>Filter By Name:</label> &nbsp;&nbsp;
      <Select defaultValue="" style={{ width: 120 }} onChange={handleChange}>
        <Option value="">All</Option>
        {selectuser}
      </Select>
      </div>
      <Table dataSource={Users} columns={columns} />;
    </div>
  )
}

export default AllUsers
