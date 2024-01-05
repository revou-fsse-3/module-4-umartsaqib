import React from 'react';
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
