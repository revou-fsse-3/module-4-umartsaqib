import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Text, Button, Input } from '../../components';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface UserData {
  Name: string;
  Email: string;
  Password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const registerUser = async (userData: UserData) => {
    try {

      const responseData = await fetch(
        'https://mock-api.arikmpt.com/api/user/register', {
          method : 'POST',
          headers : {
            "Content-Type": "application/json"
          },
          body : JSON.stringify(
            {
              "name" : userData.Name,
              "email" :  userData.Email,
              "password" :  userData.Password
            }
          )          
          }
      );

      const data = await responseData.json()

      console.log(data)

      navigate('/');
    } catch (error) {
      console.error('An error occurred during registration:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      Name: '',
      Email: '',
      Password: '',
    },
    validationSchema: yup.object({
      Name: yup.string().required('Please Enter your Name'),
      Email: yup.string().email('Please enter a valid email address').required('Email is required'),
      Password: yup
        .string()
        .required('Please Enter your password')
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol'),
    }),
    onSubmit: (values) => {
      registerUser(values);
    },
  });

  return (
    <div className='mx-auto max-w-md p-8 bg-white border rounded-lg shadow-md'>
      <form onSubmit={formik.handleSubmit}>
        <p className='text-center text-2xl text-blue-600'>Register</p>

        <div className='mb-3'>
          <label className='block mb-1' htmlFor="Name">
            Name:
          </label>
          <Input
            className={`w-full border-neutral-400 border p-2 ${formik.touched.Name && formik.errors.Name ? 'border-red-500' : ''}`}
            type="text"
            id="Name"
            required
            value={formik.values.Name}
            onChange={formik.handleChange('Name')}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Name && formik.errors.Name && <Text className='text-red-500'>{formik.errors.Name}</Text>}
        </div>

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
          <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit" label='REGISTER'/>
          <p className='mx-4 text-center text-gray-600'>Or</p>
          <Link to="/">
            <Button className='w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded' type="button" label='LOGIN'/>
          </Link>
      </div>
      </form>
    </div>
  );
};

export default Register;
