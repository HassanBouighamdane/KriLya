import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from '../images/logo-nobg.png';
import '../assets/css/signup.css';

function Signup() {
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="signup-container">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Signup</h1>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema} // Use validation schema
        onSubmit={handleSubmit} // Use form submission function
      >
        {({ isSubmitting, errors }) => (
          <Form className="signup-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field placeholder="Username" type="text" name="username" className="form-control" />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field placeholder="email@example.com" type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field type="password" name="confirmPassword" className="form-control" />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
