import { Input, Text, Button, Card, Table } from '../../components'
import { useState } from 'react';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { setMaxIdleHTTPParsers } from 'http';

interface FormProps{
  FullName: string;
  Email: string;
  DoB: string;
  Street: string;
  City: string;
  State: string;
  Zip: string;
  Username: string;
  Password: string;
}

const PersonalInformation = () => {

    const [users, setUsers] = useState<FormProps[]>([]);
 

    const [step, setStep] = useState<number>(1);
  
    const handleNext = () => {
      if(step === 3) {
          return
      }
      setStep((prevState) => prevState + 1);
  }
  
  const handlePrevious = () => {
      if(step === 1) {
          return
      }
      setStep((prevState) => prevState - 1);
  }
  
  const formMik = useFormik ({
    initialValues: {
    FullName: '',
    Email: '',
    DoB: '',
    Street: '',
    City: '',
    State: '',
    Zip: '',
    Username: '',
    Password: ''
  },
  
  
  onSubmit: (values, { resetForm }) => {
    setUsers([...users, values])
    resetForm()
  },
    validationSchema: yup.object({
      FullName: yup.string().required('Please Enter your Fullname'),
      Email: yup.string().email().required('Please fill @ in between'),
      DoB: yup.date().required('Please Fill in your Date of Birth'),
      Street: yup.string().required('Please Fill in your street address'),
      City: yup.string().required('Please Fill in your city'),
      State: yup.string().required('Please Fill in your state'),
      Zip: yup.string().required('Please Fill in your zip code').
      matches(/^[0-9]+$/, "Must be only digits")
      .min(5, 'Must be exactly 5 digits')
      .max(5, 'Must be exactly 5 digits'),
      Username: yup.string().required('Please Enter your Username'),
      Password: yup.string().required('Please Enter your password'
      ).min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol'),
    })
    });
  
    return (
       <Card border>
        <form onSubmit={formMik.handleSubmit}>
          {step === 1 && (
            <>
            <p className='text-center text-xl text-blue-600'>Personal Information</p>
              <div className='my-3'>
              <Text>{'Full Name:'}</Text>
              <Input className='block border-neutral-400 border' 
                name={'FullName'}
                value={formMik.values.FullName}
                onChange={formMik.handleChange('FullName')}/>
                {
                  formMik.errors.FullName && (
                    <Text>{formMik.errors.FullName}</Text>
                  )
                }
            </div>
            <div className='my-3'>
              <Text>{'Email:'}</Text>
              <Input className='block border-neutral-400 border'
                name={'Email'}
                value={formMik.values.Email}
                onChange={formMik.handleChange('Email')}/>
                {
                  formMik.errors.Email && (
                    <Text>{formMik.errors.Email}</Text>
                  )
                }
            </div>
            <div className='my-3'>
              <Text>{'DoB:'}</Text>
              <Input className='block border-neutral-400 border'
                name={'DoB'}
                value={formMik.values.DoB}
                onChange={formMik.handleChange('DoB')}/>
                {
                  formMik.errors.DoB && (
                    <Text>{formMik.errors.DoB}</Text>
                  )
                }
                
            </div>
            </> 
          )}
          {step === 2 && (
                <>
                <p className='text-center text-xl text-blue-600'>Address Information</p>
                <div className='my-3'>
                <Text>{'Street Address:'}</Text>
                <Input className='block border-neutral-400 border' 
                  name={'Street'}
                  value={formMik.values.Street}
                  onChange={formMik.handleChange('Street')}/>
                  {
                    formMik.errors.Street && (
                      <Text>{formMik.errors.Street}</Text>
                    )
                  }
              </div>
              <div className='my-3'>
                <Text>{'City:'}</Text>
                <Input className='block border-neutral-400 border'
                  name={'City'}
                  value={formMik.values.City}
                  onChange={formMik.handleChange('City')}/>
                   {
                    formMik.errors.City && (
                      <Text>{formMik.errors.City}</Text>
                    )
                  }
              </div>
              <div className='my-3'>
                <Text>{'State:'}</Text>
                <Input className='block border-neutral-400 border'
                  name={'State'}
                  value={formMik.values.State}
                  onChange={formMik.handleChange('State')}/>
                   {
                    formMik.errors.State && (
                      <Text>{formMik.errors.State}</Text>
                    )
                  }
              </div>
              <div className='my-3'>
                <Text>{'Zip Code:'}</Text>
                <Input className='block border-neutral-400 border'
                  name={'Zip'}
                  value={formMik.values.Zip}
                  onChange={formMik.handleChange('Zip')}/>
                   {
                    formMik.errors.Zip && (
                      <Text>{formMik.errors.Zip}</Text>
                    )
                  }
              </div>
                </>
          )}
  
          {step === 3 && (
                <>
                <p className='text-center text-xl text-blue-600'>Account Information</p>
                <div className='my-3'>
                <Text>{'Username:'}</Text>
                <Input className='block border-neutral-400 border' 
                  name={'Username'}
                  value={formMik.values.Username}
                  onChange={formMik.handleChange('Username')}/>
                  {
                    formMik.errors.Username && (
                      <Text>{formMik.errors.Username}</Text>
                    )
                  }
              </div>
              <div className='my-3'>
                <Text>{'Password:'}</Text>
                <Input className='block border-neutral-400 border'
                  name={'Password'}
                  value={formMik.values.Password}
                  onChange={formMik.handleChange('Password')}/>
                   {
                    formMik.errors.Password && (
                      <Text>{formMik.errors.Password}</Text>
                    )
                  }
              </div>
                </>
          )} 
          <div className="grid gap-4 grid-cols-2">
          <Button label={'Previous'}  onClick={handlePrevious} type={'button'} className={'bg-red-500 my-3'}/> 
          <Button label={'Next'}  onClick={handleNext} type={'button'} className={'bg-red-500 my-3'}/> 
          <Button label={'Submit'} type={'submit'} className={'bg-blue-500'}/>
          </div>
      </form>
    </Card>

)
}

export default PersonalInformation