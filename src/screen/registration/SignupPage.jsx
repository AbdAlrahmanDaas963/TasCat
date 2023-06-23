import React from "react";

import {
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  Button,
  Container,
} from "@mui/material";

import { validationsSignupForm } from "./validationSchema";

import { withFormik } from "formik";
import * as yup from "yup";

import TasCatSvg from "../../assets/TasCat.svg";
import googleSvg from "../../assets/google.svg";
import catPrintSvg from "../../assets/catPrint.svg";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const form = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        minHeight: "500px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Card
          sx={{
            background:
              "linear-gradient(90deg, #283048 0%, rgba(40, 48, 72, 0.49) 100%)",
            border: "2px solid #FFFFFF",
            backdropFilter: "blur(7px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "400px",
            borderRadius: "8px",
            padding: "50px 30px",
          }}
        >
          <img src={TasCatSvg} alt="" width={"200px"} />
          <CardContent>
            <TextField
              sx={{ color: "white" }}
              id="name"
              label="First Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.name ? errors.name : ""}
              error={touched.name && Boolean(errors.name)}
              margin="dense"
              variant="standard"
              fullWidth
            />

            <TextField
              id="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.email ? errors.email : ""}
              error={touched.email && Boolean(errors.email)}
              margin="dense"
              variant="standard"
              fullWidth
            />

            <TextField
              id="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
              margin="dense"
              variant="standard"
              fullWidth
            />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.confirmPassword ? errors.confirmPassword : ""}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              margin="dense"
              variant="standard"
              fullWidth
            />
          </CardContent>
          <CardActions>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              SUBMIT
            </Button>
            <Button color="info" onClick={handleReset}>
              CLEAR
            </Button>
          </CardActions>
        </Card>
      </form>
    </Container>
  );
};

const SingupForm = withFormik({
  mapPropsToValues: ({ name, email, password, confirmPassword }) => {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      confirmPassword: confirmPassword || "",
    };
  },

  validationSchema: yup.object().shape(validationsSignupForm),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit to the server
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
})(form);

export default SingupForm;
