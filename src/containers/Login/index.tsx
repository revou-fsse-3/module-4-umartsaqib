import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Text, Button, Input } from '../../components';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface UserData {
  Email: string;
  Password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const loginUser = async (userData: UserData) => {

    const responseData = await fetch(
      'https://mock-api.arikmpt.com/api/user/login', {
        method : 'POST',
        headers : {
          "Content-Type": "application/json"
        },
        body : JSON.stringify(
          {
            "email" :  userData.Email,
            "password" :  userData.Password
          }
        )          
        }
    );
    
    const data = await responseData.json()
    if (data.data.token){
      localStorage.setItem('token', data.data.token)
    }
    console.log(data)
    navigate('/category');
  }

  const formik = useFormik({
    initialValues: {
      Email: '',
      Password: '',
    },
    validationSchema: yup.object({
      Email: yup.string().email('Please enter a valid email address').required('Email is required'),
      Password: yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
    loginUser (values) 
    },
  });

  return (
    <div className='mx-auto max-w-md p-4 bg-white border rounded shadow'>
      <form onSubmit={formik.handleSubmit}>
        <p className='text-center text-2xl text-blue-600'>Login</p>
        
        <div className='mb-3'>
          <label className='block mb-1' htmlFor="Email">
            Email:
          </label>
          <Input
            className={`w-full border-neutral-400 border p-2 ${formik.touched.Email && formik.errors.Email ? 'border-red-500' : ''}`}
            type="email"
            id="Email"
            required
            value={formik.values.Email}
            onChange={formik.handleChange('Email')}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Email && formik.errors.Email && <Text className='text-red-500'>{formik.errors.Email}</Text>}
        </div>

        <div className='mb-3'>
          <label className='block mb-1' htmlFor="Password">
            Password:
          </label>
          <Input
            className={`w-full border-neutral-400 border p-2 ${formik.touched.Password && formik.errors.Password ? 'border-red-500' : ''}`}
            type="password"
            id="Password"
            required
            value={formik.values.Password}
            onChange={formik.handleChange('Password')}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Password && formik.errors.Password && <Text className='text-red-500'>{formik.errors.Password}</Text>}
        </div>

        <div className='flex flex-row items-center justify-center mt-4'>
          <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit" label='LOGIN'/>
          <p className='mx-4 text-center text-gray-600'>Or</p>
          <Link to="/register">
            <Button className='w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded' type="button" label='REGISTER'/>
          </Link>
        </div>

      </form>
    </div>
  );
};

export default Login;
