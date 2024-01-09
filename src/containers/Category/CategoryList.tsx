import React, { useEffect } from 'react';
import { Text, Button } from '../../components';

interface Category {
  id: number;
  name: string;
  description: string;
}

interface CategoryListProps {
  categories: Category[];
  onSelect: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onSelect, onDelete }) => {

  const token = localStorage.getItem('token')

  const fetchData = async () => { 
    const response = await fetch ('https://mock-api.arikmpt.com/api/category?page=1&name=mock category', {
        method : 'GET',
        headers : {
          "Content-Type": "application/json",
          "Authorization": "Bearer" + token
        },        
      }
    )
    const dataCategories = await response.json()
    const categories = dataCategories.data
  }
  

useEffect(() => {fetchData()}, [] )
  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Text>{category.name}</Text>
            <Button label={'Edit'} onClick={() => onSelect(category)} />
            <Button label={'Delete'} onClick={() => onDelete(category)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
