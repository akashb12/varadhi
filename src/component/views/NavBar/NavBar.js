import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
const { Header} = Layout;
function NavBar(props) {
    const [Auth, setAuth] = useState(window.sessionStorage.getItem("loggedIn"));
    const loggedOut = () => {
        window.sessionStorage.removeItem("loggedIn")
        window.location.reload()
    }
    return (
        <div>
            <Layout className="layout">
                <Header>
                    {Auth ?
                        <Menu theme="dark" mode="horizontal" >
                            <Menu.Item key="1"><Link to='/home'>Home</Link></Menu.Item>
                            <Menu.Item key="2" onClick={() => loggedOut()}>Logout</Menu.Item>
                        </Menu> :
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} >
                            <Menu.Item key="1">Login</Menu.Item>
                        </Menu>
                    }

                </Header>
            </Layout>

            <h1 className="header">Akash Banaulikar</h1>
        </div>
    )
}

export default NavBar
