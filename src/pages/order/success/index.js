import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const Success = ({ addedOrder }) => {
  const navigate = useNavigate();
  return (
    <Card
      style={{
        backgroundColor: "#e37d71",
      }}
    >
      <CardBody>
        <CardTitle tag="h5">Tesekkurler, siparisiniz alindi.</CardTitle>
        <CardText>
          {addedOrder.pizzaName} isimli pizzaniz hazirlaniyor. Siparis
          detaylari;
        </CardText>
      </CardBody>
      <ListGroup flush>
        <ListGroupItem>Pizza Buyuklugu: {addedOrder.pizzaSize}</ListGroupItem>

        <ListGroupItem>
          Eklenen Malzemeler:{" "}
          {Object.keys(addedOrder)
            .filter((top) => addedOrder[top] === true)
            .map((top, index) => (
              <span key={index}>{top} </span>
            ))}
        </ListGroupItem>
        <ListGroupItem>Notlar: {addedOrder.pizzaSpecials}</ListGroupItem>
        <ListGroupItem>Siparis saati: {addedOrder.createdAt}</ListGroupItem>
      </ListGroup>
      <CardBody>
        <Button color="primary" onClick={() => navigate("/")}>
          Anasayfa
        </Button>
      </CardBody>
    </Card>
  );
};

export default Success;
