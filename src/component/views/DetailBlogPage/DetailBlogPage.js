import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Axios from "axios";
function DetailBlogPage(props) {
    const auth = window.sessionStorage.getItem("loggedIn")
    if (auth === null) {
        props.history.push({
            pathname: '/login',
        })
    }
    const [Blogs, setBlogs] = useState([]);
    const blogId = useParams();
    //   get all blogs
    useEffect(() => {
        Axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
            if (response.data) {
                const data = response.data.filter((blog) => blog.id == blogId.id);

                setBlogs(data.map((blog) => ({
                    USERID: blog.userId,
                    BLOGID: blog.id,
                    TITLE: blog.title,
                    BODY: blog.body,
                })))
            }
            else {
                alert("no blogs")
            }
        });
    }, [Blogs])

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

    ];
    return (
        <div>
            <div className="filter"><button>
                <Link to={'/blogs'}>
                    {"Go Back"}
                </Link>
            </button></div>
            <Table dataSource={Blogs} columns={columns} />;
        </div>
    )
}

export default DetailBlogPage
