import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignUp = () => {
    const history = useHistory();

    // Formik Hook
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },

        // Yup Validation Schema
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Name must be at least 3 characters')
                .required('Name is required'),
            email: Yup.string()
                .email('Invalid email format')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),

        // Form Submission
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await axios.post('http://localhost:4000/users', {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    role: 'employee',
                });

                history.push('/login'); // Redirect to login after signup
            } catch (error) {
                console.error('Error signing up:', error);
            }
            setSubmitting(false);
        },
    });

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={formik.handleSubmit}>
                {/* Name Field */}
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        {...formik.getFieldProps('name')} 
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div style={{ color: 'red' }}>{formik.errors.name}</div>
                    ) : null}
                </div>

                {/* Email Field */}
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        {...formik.getFieldProps('email')} 
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div style={{ color: 'red' }}>{formik.errors.email}</div>
                    ) : null}
                </div>

                {/* Password Field */}
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        {...formik.getFieldProps('password')} 
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div style={{ color: 'red' }}>{formik.errors.password}</div>
                    ) : null}
                </div>

                <button type="submit" disabled={formik.isSubmitting}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
