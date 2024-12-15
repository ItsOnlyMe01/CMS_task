import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ComplaintContext } from "./context/ComplaintProvider";

const SigninChoice = () => {
  const { isAdmin, setIsAdmin } = useContext(ComplaintContext);
  const navigate = useNavigate();

  const handleChoice = (role) => {
    setIsAdmin(role === "admin" ? true : false);
  };
  useEffect(() => {
    if (isAdmin !== undefined) {
      navigate("/home");
    }
  }, [isAdmin, navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Complaint Management System</h1>
      <p style={styles.subtitle}>Please choose your role to proceed:</p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => handleChoice("admin")}>
          Admin
        </button>
        <button style={styles.button} onClick={() => handleChoice("user")}>
          User
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  subtitle: {
    marginBottom: "1rem",
  },
  buttonContainer: {
    display: "flex",
    gap: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};

export default SigninChoice;
