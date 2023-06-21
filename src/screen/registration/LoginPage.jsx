import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Stack,
  Button,
  Container,
} from "@mui/material";

import { validationsLoginForm } from "./validationSchema";
import { withFormik } from "formik";
import * as yup from "yup";

import TasCatSvg from "../../assets/TasCat.svg";

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
    <Stack
      sx={{
        background:
          "linear-gradient(234.24deg,rgba(217, 217, 217, 0.12) -0.46%,rgba(217, 217, 217, 0.09) 100%)",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Container
        className="repeated-icon"
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
    </Stack>
  );
};

const Form = withFormik({
  mapPropsToValues: ({
    website,
    name,
    surname,
    email,
    course,
    password,
    confirmPassword,
  }) => {
    return {
      website: website || "",
      name: name || "",
      surname: surname || "",
      email: email || "",
      course: course || "",
      password: password || "",
      confirmPassword: confirmPassword || "",
    };
  },

  validationSchema: yup.object().shape(validationsLoginForm),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit to the server
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
})(form);

export default Form;
