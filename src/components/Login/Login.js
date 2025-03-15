import React, { useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../../context/UserContext';

const Login = () => {
    const history = useHistory();
    const { login } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email format').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axios.get(`http://localhost:4000/users?email=${values.email}&password=${values.password}`);
                if (response.data.length > 0) {
                    const user = response.data[0];
                    login(user);
                    history.push(user.role === 'admin' ? '/' : '/profiles');
                } else {
                    alert('Invalid email or password');
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
            setSubmitting(false);
        },
    });

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit}>
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

                <button type="submit" disabled={formik.isSubmitting}>Login</button>
            </form>
            
            <button onClick={() => history.push('/signup')}>Sign Up</button>
        </div>
    );
};

export default Login;
