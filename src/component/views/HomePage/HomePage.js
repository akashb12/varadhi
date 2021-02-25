import React from 'react'
import { Link } from "react-router-dom";
function HomePage(props) {
  const auth = window.sessionStorage.getItem("loggedIn")
  if (auth === null) {
    props.history.push({
      pathname: '/login',
    })
  }
  return (
    <div className="HomePage">
      <div>

        <button className="button">
          <Link style={{ color: "white" }} to="/users"> All Users</Link>
        </button>
      </div>
      <div>

        <button className="button">
          <Link style={{ color: "white" }} to="/blogs"> All blogs</Link>
        </button>

      </div>
    </div>
  )
}

export default HomePage
