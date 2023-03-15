import React, { useState } from "react";
import { Col } from "reactstrap";
import OrderForm from "../../components/order-form";
import Success from "./success";

const Order = () => {
  // posttan gelen cevap
  const [addedOrder, setAddedOrder] = useState({});
  return (
    <Col
      md={{
        offset: 3,
        size: 6,
      }}
      sm="12"
    >
      {addedOrder.id ? (
        <Success addedOrder={addedOrder} />
      ) : (
        <OrderForm setAddedOrder={setAddedOrder} />
      )}
    </Col>
  );
};

export default Order;
