import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import background from "../../Assets/Pizza.jpg";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container
      style={{
        backgroundImage: `url(${background})`,
        padding: "0",
        backgroundPosition: "center",
        minHeight: "90vh",
      }}
    >
      <Container
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          display: "flex",
          minHeight: "90vh",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>KOD YAZMAK ACIKTIRIR</h2>
        <Button onClick={() => navigate("/pizza")}>
          Pizza Olusturmak Icin Tiklayin!
        </Button>
      </Container>
    </Container>
  );
};

export default Home;
