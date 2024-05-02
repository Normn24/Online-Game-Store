import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import * as Yup from "yup";
import "./CheckOutForm.scss";

export default function CheckOutForm({ cartItems, removeFromCart }) {
  const dispatch = useDispatch();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required  "),
    lastName: Yup.string().required("Last name is required  "),
    email: Yup.string().email("Invalid email").required("Email is required"),
    year: Yup.number()
      .max(2014, "You are too young")
      .required("Year is required"),
    address: Yup.string()
      .min(6, "Address should contain 6")
      .required("Address is required"),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "Phone number should contain 10 numbers")
      .required("Phone number is required"),
  });

  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    year: "",
    address: "",
    phoneNumber: "",
  };

  function onSubmit(value) {
    cartItems.map((product) => {
      console.log(
        `Product Name: ${product.name}; Price: ${product.price}; Article: ${product.article}`
      );
      dispatch(removeFromCart(product));
    });
    console.log("User info:", value);
  }

  return (
    <>
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <h2>Billing Details</h2>
          <div className="form__content">
            <div className="input-group">
              <Field
                type="text"
                id="firstName"
                name="firstName"
                className="input"
              />
              <label htmlFor="firstName" className="user-label">
                First Name
              </label>
              <ErrorMessage
                name="firstName"
                component="div"
                className="error-msg"
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName" className="user-label">
                Last Name
              </label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                className="input"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="error-msg"
              />
            </div>
            <div className="input-group">
              <label htmlFor="email" className="user-label">
                Email
              </label>
              <Field type="email" id="email" name="email" className="input" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-msg"
              />
            </div>
            <div className="input-group">
              <label htmlFor="year" className="user-label">
                Birth Year
              </label>
              <Field
                as="select"
                id="year"
                name="year"
                className="input year-container"
              >
                {new Array(100)
                  .fill("")
                  .map((item, index) => new Date().getFullYear() - index)
                  .map((year) => (
                    <option style={{ color: "#000" }} value={year} key={year}>
                      {year}
                    </option>
                  ))}
              </Field>
              <ErrorMessage name="year" component="div" className="error-msg" />
            </div>
            <div className="input-group">
              <label htmlFor="address" className="user-label">
                Address{" "}
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                className="input"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="error-msg"
              />
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber" className="user-label">
                Phone Number
              </label>
              <Field
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="input"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="error-msg"
              />
            </div>
          </div>
          <button type="submit" className="form-btn">
            <span>Continue</span>
            <svg
              width="34"
              height="34"
              viewBox="0 0 74 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="37"
                cy="37"
                r="35.5"
                stroke="black"
                strokeWidth="3"
              ></circle>
              <path
                d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                fill="black"
              ></path>
            </svg>
          </button>
        </Form>
      </Formik>
    </>
  );
}

CheckOutForm.propTypes = {
  cartItems: PropTypes.array,
  removeFromCart: PropTypes.func,
};
