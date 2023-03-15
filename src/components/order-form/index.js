import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
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

const OrderForm = ({ setAddedOrder }) => {
  // validasyon errorlari
  const [orderError, setOrderError] = useState({});

  //is form invalid
  const [disabled, setDisabled] = useState(true);

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
  const [order, setOrder] = useState({
    pizzaName: "",
    pizzaSize: "",
    pizzaSauce: "",
    pizzaSpecials: "",
    pepperoni: false,
    sausage: false,
    canadianBacon: false,
    spicyItalianSausage: false,
    grilledChicken: false,
    onions: false,
    greenPepper: false,
    dicedTomatos: false,
    blackOlives: false,
    roastedGarlic: false,
    artichokeHearts: false,
    threeCheese: false,
    pinapple: false,
    extraCheese: false,
  });

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

  const resetForm = () => {
    setOrder({
      pizzaName: "",
      pizzaSize: "",
      pizzaSauce: "",
      pizzaSpecials: "",
      pepperoni: false,
      sausage: false,
      canadianBacon: false,
      spicyItalianSausage: false,
      grilledChicken: false,
      onions: false,
      greenPepper: false,
      dicedTomatos: false,
      blackOlives: false,
      roastedGarlic: false,
      artichokeHearts: false,
      threeCheese: false,
      pinapple: false,
      extraCheese: false,
    });
  };

  // form invalid ise button disable olur
  useEffect(() => {
    orderSchema.isValid(order).then((valid) => {
      setDisabled(!valid);
    });
  }, [order]);

  return (
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
          data-cy="name-input"
          value={order.pizzaName}
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
          value={order.pizzaSize}
        >
          <option value="">Select Size</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">XLarge</option>
        </Input>
        <FormFeedback>{orderError.pizzaSize}</FormFeedback>
      </FormGroup>
      <FormGroup tag="fieldset" required>
        <Label for="pizzaSauce">Choice of Sauce</Label>
        <FormGroup check>
          <Input
            id="Original Red"
            value="Original Red"
            onChange={updateOrder}
            name="pizzaSauce"
            type="radio"
            required
            checked={order.pizzaSauce === "Original Red"}
          />{" "}
          <Label for="Original Red" check>
            Original Red
          </Label>
        </FormGroup>
        <FormGroup check>
          <Input
            value="Garlic Ranch"
            id="Garlic Ranch"
            onChange={updateOrder}
            name="pizzaSauce"
            type="radio"
            checked={order.pizzaSauce === "Garlic Ranch"}
          />{" "}
          <Label for="Garlic Ranch" check>
            Garlic Ranch
          </Label>
        </FormGroup>
        <FormGroup check>
          <Input
            id="BBQ Sauce"
            value="BBQ Sauce"
            onChange={updateOrder}
            name="pizzaSauce"
            type="radio"
            checked={order.pizzaSauce === "BBQ Sauce"}
          />{" "}
          <Label for="BBQ Sauce" check>
            BBQ Sauce
          </Label>
        </FormGroup>
        <FormGroup check>
          <Input
            id="Spinach Alfredo"
            value="Spinach Alfredo"
            onChange={updateOrder}
            name="pizzaSauce"
            type="radio"
            checked={order.pizzaSauce === "Spinach Alfredo"}
          />{" "}
          <Label for="Spinach Alfredo" check>
            Spinach Alfredo
          </Label>
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
                checked={order[topping.id]}
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
          value={order.pizzaSpecials}
        />
      </FormGroup>
      <Button
        disabled={disabled}
        color="danger"
        id="order-button"
        type="submit"
      >
        Add to Order
      </Button>
      <Button
        color="warning"
        id="reset-button"
        type="button"
        onClick={resetForm}
      >
        Reset Order
      </Button>
    </Form>
  );
};

export default OrderForm;
