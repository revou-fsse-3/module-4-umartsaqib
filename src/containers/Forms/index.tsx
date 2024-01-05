import React from "react";
import { Input, Text, Button, Card } from "../../components";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormProps {
  FullName: string;
  Email: string;
  DoB: Date | null;
  Street: string;
  City: string;
  State: string;
  Zip: string;
  Username: string;
  Password: string;
}

const Forms = () => {
  const [users, setUsers] = useState<FormProps[]>([]);
  const [step, setStep] = useState<number>(1);

  const formMik = useFormik({
    initialValues: {
      FullName: "",
      Email: "",
      DoB: null,
      Street: "",
      City: "",
      State: "",
      Zip: "",
      Username: "",
      Password: "",
    },
    validationSchema: yup.object({
      FullName: yup.string().required("Please Enter your Fullname"),
      Email: yup.string().email().required("Please fill @ in between"),
      DoB: yup.date().required("Please Fill in your Date of Birth"),
      Street: yup.string().required("Please Fill in your street address"),
      City: yup.string().required("Please Fill in your city"),
      State: yup.string().required("Please Fill in your state"),
      Zip: yup
        .string()
        .required("Please Fill in your zip code")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(5, "Must be exactly 5 digits")
        .max(5, "Must be exactly 5 digits"),
      Username: yup.string().required("Please Enter your Username"),
      Password: yup
        .string()
        .required("Please Enter your password")
        .min(8, "Password must be 8 characters long")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (step === 3) {
        setUsers([...users, values]);
        resetForm();
        setStep(1);
        console.log("Data Pengguna:", values);
        console.log("Form submitted successfully!");
      }
    },
  });

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return yup.object({
          FullName: yup.string().required("Please Enter your Fullname"),
          Email: yup.string().email().required("Please fill @ in between"),
          DoB: yup.date().required("Please Fill in your Date of Birth"),
        });
      case 2:
        return yup.object({
          Street: yup.string().required("Please Fill in your street address"),
          City: yup.string().required("Please Fill in your city"),
          State: yup.string().required("Please Fill in your state"),
          Zip: yup
            .string()
            .required("Please Fill in your zip code")
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(5, "Must be exactly 5 digits")
            .max(5, "Must be exactly 5 digits"),
        });
      case 3:
        return yup.object({
          Username: yup.string().required("Please Enter your Username"),
          Password: yup
            .string()
            .required("Please Enter your password")
            .min(8, "Password must be 8 characters long")
            .matches(/[0-9]/, "Password requires a number")
            .matches(/[a-z]/, "Password requires a lowercase letter")
            .matches(/[A-Z]/, "Password requires an uppercase letter")
            .matches(/[^\w]/, "Password requires a symbol"),
        });
      default:
        return yup.object({});
    }
  };

  const handleNext = () => {
    const stepValidationSchema = validateStep(step);
    formMik.setValues(formMik.values);
    stepValidationSchema
      .validate(formMik.values, { abortEarly: false })
      .then(() => {
        if (step < 3) {
          setStep((prevStep) => prevStep + 1);
        } else {
          formMik.handleSubmit();
        }
      })
      .catch((errors) => {
        const newErrors: Record<string, string> = {};
        errors.inner.forEach((error: { path: any; message: string }) => {
          newErrors[error.path!] = error.message;
        });
        formMik.setErrors(newErrors);
      });
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <Card border>
      <form onSubmit={formMik.handleSubmit}>
        {step === 1 && (
          <>
            <p className="text-center text-xl text-blue-600">
              Personal Information
            </p>
            <div className="my-3">
              <Text>{"Full Name:"}</Text>
              <Input
                className="block border-neutral-400 border"
                name={"FullName"}
                value={formMik.values.FullName}
                onChange={formMik.handleChange("FullName")}
              />
              {formMik.errors.FullName && (
                <Text>{formMik.errors.FullName}</Text>
              )}
            </div>
            <div className="my-3">
              <Text>{"Email:"}</Text>
              <Input
                className="block border-neutral-400 border"
                name={"Email"}
                value={formMik.values.Email}
                onChange={formMik.handleChange("Email")}
              />
              {formMik.errors.Email && <Text>{formMik.errors.Email}</Text>}
            </div>
            <div className="my-3">
              <Text>{"DoB:"}</Text>
              <DatePicker
                selected={formMik.values.DoB}
                onChange={(date) => formMik.setFieldValue("DoB", date)}
                dateFormat="yyyy-MM-dd"
                className="block border-neutral-400 border p-2"
              />
              {formMik.errors.DoB && <Text>{formMik.errors.DoB}</Text>}
            </div>
            <div className="grid gap-4 grid-cols-2">
              <Button
                label={"Next"}
                onClick={handleNext}
                type={"button"}
                className={"bg-red-500 my-3"}
              />
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <p className="text-center text-xl text-blue-600">
              Address Information
            </p>
            <div className="my-3">
              <Text>{"Street Address:"}</Text>
              <Input
                className="block border-neutral-400 border"
                name={"Street"}
                value={formMik.values.Street}
                onChange={formMik.handleChange("Street")}
              />
              {formMik.errors.Street && <Text>{formMik.errors.Street}</Text>}
            </div>
            <div className="my-3">
              <Text>{"City:"}</Text>
              <Input
                className="block border-neutral-400 border"
                name={"City"}
                value={formMik.values.City}
                onChange={formMik.handleChange("City")}
              />
              {formMik.errors.City && <Text>{formMik.errors.City}</Text>}
            </div>
            <div className="my-3">
              <Text>{"State:"}</Text>
              <Input
                className="block border-neutral-400 border"
                name={"State"}
                value={formMik.values.State}
                onChange={formMik.handleChange("State")}
              />
              {formMik.errors.State && <Text>{formMik.errors.State}</Text>}
            </div>
            <div className="my-3">
              <Text>{"Zip Code:"}</Text>
              <Input
                className="block border-neutral-400 border"
                name={"Zip"}
                value={formMik.values.Zip}
                onChange={formMik.handleChange("Zip")}
              />
              {formMik.errors.Zip && <Text>{formMik.errors.Zip}</Text>}
            </div>
            <div className="grid gap-4 grid-cols-2">
              <Button
                label={"Previous"}
                onClick={handlePrevious}
                type={"button"}
                className={"bg-red-500 my-3"}
              />
              <Button
                label={"Next"}
                onClick={handleNext}
                type={"button"}
                className={"bg-red-500 my-3"}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-center text-xl text-blue-600">
              Account Information
            </p>
            <div className="my-3">
              <Text>{"Username:"}</Text>
              <Input
                className="block border-neutral-400 border"
                name={"Username"}
                value={formMik.values.Username}
                onChange={formMik.handleChange("Username")}
              />
              {formMik.errors.Username && (
                <Text>{formMik.errors.Username}</Text>
              )}
            </div>
            <div className="my-3">
              <Text>{"Password:"}</Text>
              <Input
                className="block border-neutral-400 border"
                name={"Password"}
                value={formMik.values.Password}
                onChange={formMik.handleChange("Password")}
              />
              {formMik.errors.Password && (
                <Text>{formMik.errors.Password}</Text>
              )}
            </div>
            <div className="grid gap-4 grid-cols-2">
              <Button
                label={"Previous"}
                onClick={handlePrevious}
                type={"button"}
                className={"bg-red-500 my-3"}
              />
              <Button
                label={"Submit"}
                type={"submit"}
                className={"bg-blue-500"}
              />
            </div>
          </>
        )}
      </form>
    </Card>
  );
};

export default Forms;
