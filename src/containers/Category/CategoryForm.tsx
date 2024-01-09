import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Text, Button, Input } from '../../components';


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

interface CategoryFormProps {
  onSave: (category: Category) => void;
  initialValues: Category | null;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSave, initialValues }) => {

  const token = localStorage.getItem('token')

 
  
  const formik = useFormik({
    initialValues: initialValues || { id: 0, name: '', description: '' },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      description: yup.string().required('Description is required'),
    }),
    onSubmit: (values) => {
      onSave(values);
    },
    enableReinitialize: true,
  });

  return (
  <>
    <form onSubmit={formik.handleSubmit}>
      <div className='my-3'>
        <Text>{'Name:'}</Text>
        <Input
          name={'name'}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='block border-neutral-400 border p-2'
        />
        {formik.touched.name && formik.errors.name && <Text>{formik.errors.name}</Text>}
      </div>
      <div className='my-3'>
        <Text>{'Description:'}</Text>
        <Input
          name={'description'}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='block border-neutral-400 border p-2'
        />
        {formik.touched.description && formik.errors.description && (
          <Text>{formik.errors.description}</Text>
        )}
      </div>
      <Button label={'Save'} type={'submit'} className={'bg-red-500 my-3 px-4 py-2 rounded font-semibold'}/>
    </form> 
  </>
  );
};

export default CategoryForm;
