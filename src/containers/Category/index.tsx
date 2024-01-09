import React, { useEffect, useState } from 'react';
import { Button, Input } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';


interface Category {
  id: string;
  name: string;
  description: string;
  is_active: boolean; // Assuming is_active is part of your category structure
}

const CategoryPage: React.FC = () => {
  const [ListCategories, setListCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const showCategories = async () => {
    const response = await fetch('https://mock-api.arikmpt.com/api/category', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    const dataCategories = await response.json();
    const categories = dataCategories.data;
    setListCategories(categories);
    console.log(categories);
  };

  useEffect(() => {
    showCategories();
  }, []);

  const createCategories = async (data: { name: string }) => {
    const response = await fetch('https://mock-api.arikmpt.com/api/category/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        'name': data.name,
    
      }),
    });

    showCategories();
  };

  const UpdateCategories = async (data: { id: any; name: any; is_active: any; }) => { 
    try {
      const response = await fetch('https://mock-api.arikmpt.com/api/category/update', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },  
        body: JSON.stringify({
          'id': data.id,
          'name': data.name,
          'is_active': data.is_active
        })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const dataCategories = await response.json();
      
      if (dataCategories && dataCategories.data) {
        const categories = dataCategories.data;
        setListCategories(categories);
        console.log(categories);
      } else {
        console.error('Invalid response format from the server:', dataCategories);
      }
    } catch (error) {
      console.error('Error updating categories:', error);
    }
  }
  

  const handleUpdateCategory = async () => {
    if (selectedCategory) {
      await UpdateCategories({
        id: selectedCategory.id,
        name: formik.values.name,
        is_active: selectedCategory.is_active,
      });

      formik.resetForm();
      showCategories();
      setSelectedCategory(null);
    }
  };

  const handleDeleteCategory = (id: string) => async () => {
    const response = await fetch('https://mock-api.arikmpt.com/api/category/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    showCategories();
  };

  const handleSelectCategory = (id: string) => async () => {
    const response = await fetch('https://mock-api.arikmpt.com/api/category/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    const categoryDetails = await response.json();
    setSelectedCategory(categoryDetails.data);
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsEditMode(false);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      is_active: ''
    },
    onSubmit: (values) => {
      if (isEditMode) {
        handleUpdateCategory();
      } else {
        createCategories(values);
      }
      formik.resetForm();
      showCategories();
      setSelectedCategory(null);
      setIsEditMode(false);
    },
  });

  return (
    <div className=''>
      <h1 className='text-3xl font-bold mb-6 text-center text-blue-600'>List Category</h1>

      {selectedCategory ? (
        <div className='mb-6'>
          <h2 className='text-xl font-semibold mb-4 text-blue-600'>Edit Category</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className='mb-3'>
            <Link to={'/Category'}>Kembali</Link>
            <label className='block mb-1' htmlFor='name'>
            Name:
          </label>
          <Input
            className={`w-full border-neutral-400 border p-2`}
            type='name'
            required
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur}
          />
          <label className='block mb-1 mt-4' htmlFor='is_active'>
            Status:
          </label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.is_active as string}
            onChange={(e: SelectChangeEvent<string>) => {
              formik.handleChange('is_active')(e.target.value);
            }}
            size="small"
          >
            <MenuItem value={'1'}>Active</MenuItem>
            <MenuItem value={'0'}>Deactive</MenuItem>
          </Select>
              <Button
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font.bold mt-4 py-2 px-4 rounded'
                type='button'
                label='Edit'
                onClick={handleUpdateCategory}
              />
            </div>
          </form>
        </div>
      ) : (
        <div className='mb-6'>
          <h2 className='text-xl font-semibold mb-4 text-blue-600'>Add Category</h2>
          <form onSubmit={formik.handleSubmit}>
        <div className='mb-3'>
          <label className='block mb-1' htmlFor='name'>
            Name:
          </label>
          <Input
            className={`w-full border-neutral-400 border p-2`}
            type='name'
            required
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur}
          />
          <label className='block mb-1 mt-4' htmlFor='is_active'>
            Status:
          </label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.is_active as string}
            onChange={(e: SelectChangeEvent<string>) => {
              formik.handleChange('is_active')(e.target.value);
            }}
            size="small"
          >
            <MenuItem value={'1'}>Active</MenuItem>
            <MenuItem value={'0'}>Deactive</MenuItem>
          </Select>
          <Button
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font.bold mt-4 py-2 px-4 rounded'
            type='submit'
            label='Add'
          />
        </div>
      </form>
        </div>
      )}

<h2 className='text-xl font-semibold mb-4'>Category List</h2>
<table className='min-w-full border divide-y divide-gray-200'>
  <thead className='bg-gray-50'>
    <tr>
      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
        ID
      </th>
      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
        Name
      </th>
      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
        Status
      </th>
      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
        Actions
      </th>
    </tr>
  </thead>
  <tbody className='bg-white divide-y divide-gray-200'>
    {ListCategories && ListCategories.map((category: Category) => (
      <tr key={category.id}>
        <td className='px-6 py-4 whitespace-nowrap'>{category.id}</td>
        <td className='px-6 py-4 whitespace-nowrap'>{category.name}</td>
        <td className='px-6 py-4 '>{category.is_active}</td>
        <td className='px-6 py-4 '>
          <Button
            onClick={handleSelectCategory(category.id)}
            className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font.bold mr-2'
            label='Edit'
          />
          <Button
            onClick={handleDeleteCategory(category.id)}
            className='bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded font.bold'
            label='Delete'
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>


      <div className='mt-6'>
        <Button
          onClick={handleLogout}
          className='bg-gray-400 text-white px-4 py-2 rounded font-semibold'
          label='Logout'
        />
      </div>
    </div>
  );
};

export default CategoryPage;