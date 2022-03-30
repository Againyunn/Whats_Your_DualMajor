import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ logout, history }) {
  const handleClick = () => {
    logout();
    history.push("/");
  };
  return <button onClick={handleClick}>Logout</button>;
}

// export default useNavigate(LogoutButton);