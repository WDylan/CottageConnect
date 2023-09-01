import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [username, setUsername] = useState("");
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => {
        if (res.data.role === 1) {
          setUsername(res.data.username);
        } else {
          navigate("/profil");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h2>{username}'s ADMIN DASHBOARD</h2>
    </div>
  );
}

export default Admin;
