import React, { useState } from 'react';
import { Button } from '../../components';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
  description: string;
}

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token')

  const CreateCategory = async (userData: Category) => {

    const responseData = await fetch(
      'https://mock-api.arikmpt.com/api/category/create', {
        method : 'POST',
        headers : {
          "Content-Type": "application/json",
          "Authorization": "Bearer" + token
        },
        body : JSON.stringify(
          {
            "name" : userData.name
          }
        )          
        }
    );
    
    const data = await responseData.json()
   
  }

  const handleSaveCategory = (category: Category) => {
    const newCategory = { ...category, id: categories.length + 1 };
    setCategories([...categories, newCategory]);
    setSelectedCategory(null);
  };

  const handleUpdateCategory = (category: Category) => {
    setCategories(categories.map((c) => (c.id === category.id ? category : c)));
    setSelectedCategory(null);
  };

  const handleDeleteCategory = (category: Category) => {
    setCategories(categories.filter((c) => c.id !== category.id));
    setSelectedCategory(null);
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className='container mx-auto px-4 py-8 bg-white rounded-lg shadow-md'>
      <h1 className='text-3xl font-bold mb-6 text-center text-blue-600'>Category Page</h1>

      {selectedCategory ? (
        <div className='mb-6'>
          <h2 className='text-xl font-semibold mb-4 text-blue-600'>Edit Category</h2>
          <CategoryForm onSave={handleUpdateCategory} initialValues={selectedCategory} />
        </div>
      ) : (
        <div className='mb-6'>
          <h2 className='text-xl font-semibold mb-4'>Add Category</h2>
          <CategoryForm onSave={handleSaveCategory} initialValues={null} />
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
              Description
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className='px-6 py-4 whitespace-nowrap'>{category.id}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{category.name}</td>
              <td className='px-6 py-4'>{category.description}</td>
              <td className='px-6 py-4'>
                <Button
                  onClick={() => handleSelectCategory(category)}
                  className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold mr-2' label='Edit'/>
                <Button
                  onClick={() => handleDeleteCategory(category)}
                  className='bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold' label='Delete'/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='mt-6'>
        <Button onClick={handleLogout} className='bg-gray-400 text-white px-4 py-2 rounded font-semibold' label='Logout' />
      </div>
    </div>
  );
};

export default CategoryPage;
