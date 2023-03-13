import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import * as Yup from "yup";
import pizzaImg from "../../Assets/Pizza.png";

const toppings = [
  { name: "Pepperoni", id: "pepperoni" },
  { name: "Sausage", id: "sausage" },
  { name: "Canadian Bacon", id: "canadianBacon" },
  { name: "Spicy Italian Sousage", id: "spicyItalianSausage" },
  { name: "Grilled Chicken", id: "grilledChicken" },
  { name: "Onions", id: "onions" },
  { name: "Green Pepper", id: "greenPepper" },
  { name: "Diced Tomatos", id: "dicedTomatos" },
  { name: "Black Olives", id: "blackOlives" },
  { name: "Roasted Garlic", id: "roastedGarlic" },
  { name: "Artichoke Hearts", id: "artichokeHearts" },
  { name: "Three Cheese", id: "threeCheese" },
  { name: "Pinapple", id: "pinapple" },
  { name: "Extra Cheese", id: "extraCheese" },
];

const OrderForm = () => {
  // validasyon errorlari
  const [orderError, setOrderError] = useState({});

  //validasyon semasi
  const orderSchema = Yup.object().shape({
    pizzaName: Yup.string()
      .required("Pizza adi giriniz")
      .min(2, "Pizza adi en az 2 harf icermeli"),
    pizzaSize: Yup.string().required("Pizza olcusu seciniz"),
    pizzaSauce: Yup.string().required("Pizza sosu seciniz"),
    pizzaSpecials: Yup.string(),
  });

  // order objesi
  const [order, setOrder] = useState({});

  // posttan gelen cevap
  const [addedOrder, setAddedOrder] = useState({});

  // order objesini guncelle
  const updateOrder = (evt) => {
    // checkbox value degerlerini checked(true/false) olarak al
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;

    // yup validasyonu (checkbox olmayanlar icin)
    evt.target.type !== "checkbox" &&
      Yup.reach(orderSchema, evt.target.name)
        .validate(evt.target.value)
        .then(setOrderError({ ...orderError, [evt.target.name]: "" }))
        .catch((err) =>
          setOrderError({ ...orderError, [evt.target.name]: err.errors[0] })
        );

    setOrder({ ...order, [evt.target.name]: value });
  };

  // submitte order objesini postla
  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post("https://reqres.in/api/orders", order)
      .then((res) => setAddedOrder(res.data));
  };

  return (
    <Col
      md={{
        offset: 3,
        size: 6,
      }}
      sm="12"
    >
      <Form
        id="pizza-form"
        style={{
          backgroundColor: "#e37d71",
          padding: "1rem",
        }}
        onSubmit={handleSubmit}
      >
        <h3 style={{ textAlign: "center" }}>Build Your Own Pizza</h3>
        <img width="100%" src={pizzaImg} alt="pizza" />
        <FormGroup>
          <Label for="pizzaName">Name Your Pizza</Label>
          <Input
            required
            type="text"
            id="name-input"
            name="pizzaName"
            onChange={updateOrder}
            invalid={Boolean(orderError.pizzaName)}
          />
          <FormFeedback>{orderError.pizzaName}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="pizzaSize">Choice of Size</Label>
          <Input
            required
            onChange={updateOrder}
            type="select"
            name="pizzaSize"
            invalid={Boolean(orderError.pizzaSize)}
          >
            <option value="">Select Size</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">XLarge</option>
          </Input>
          <FormFeedback>{orderError.pizzaSize}</FormFeedback>
        </FormGroup>
        <FormGroup tag="fieldset">
          <Label for="pizzaSauce">Choice of Sauce</Label>
          <FormGroup check>
            <Input
              value="Original Red"
              onChange={updateOrder}
              name="pizzaSauce"
              type="radio"
              required
            />{" "}
            <Label check>Original Red</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              value="Garlic Ranch"
              onChange={updateOrder}
              name="pizzaSauce"
              type="radio"
            />{" "}
            <Label check>Garlic Ranch</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              value="BBQ Sauce"
              onChange={updateOrder}
              name="pizzaSauce"
              type="radio"
            />{" "}
            <Label check>BBQ Sauce</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              value="Spinach Alfredo"
              onChange={updateOrder}
              name="pizzaSauce"
              type="radio"
            />{" "}
            <Label check>Spinach Alfredo</Label>
          </FormGroup>
        </FormGroup>
        <FormGroup
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Label style={{ flexBasis: "100%" }}>Add Toppings</Label>

          {toppings.map((topping, index) => {
            return (
              <Label
                key={index}
                style={{ flexBasis: "50%" }}
                htmlFor={topping.id}
              >
                <Input
                  type="checkbox"
                  id={topping.id}
                  name={topping.id}
                  value={topping.name}
                  onChange={updateOrder}
                />{" "}
                {topping.name}
              </Label>
            );
          })}
        </FormGroup>
        <FormGroup>
          <Label for="pizzaSpecials">Special Instructions</Label>
          <Input
            type="text"
            id="specials-input"
            name="pizzaSpecials"
            placeholder="Anything else you'd like to add?"
            onChange={updateOrder}
          />
        </FormGroup>
        <Button color="danger" id="order-button" type="submit">
          Add to Order
        </Button>

        {/* Post cevabi gelince calisir */}
        {addedOrder.id && (
          <span>
            Tesekkurler, siparisiniz alindi. {addedOrder.pizzaName} isimli
            pizzaniz hazirlaniyor.
            <p>Pizza Adi: {addedOrder.pizzaName}</p>
            <p>Pizza Buyuklugu: {addedOrder.pizzaSize}</p>
            <p>
              Eklenen Malzemeler:{" "}
              {Object.keys(addedOrder)
                .filter((top) => addedOrder[top] === true)
                .map((top, index) => (
                  <span key={index}>{top}, </span>
                ))}
            </p>
            <p>Notlar: {addedOrder.pizzaSpecials}</p>
            <p>Siparis saati: {addedOrder.createdAt}</p>
          </span>
        )}
      </Form>
    </Col>
  );
};

export default OrderForm;
