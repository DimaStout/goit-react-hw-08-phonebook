import React from 'react';
import s from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContactThunk, getContacts } from '../../redux/operations';
import { nanoid } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phone: Yup.string()
      .matches(
        /^\d{3}-\d{3}-\d{4}$/,
        'Phone number must be in the format "000-000-0000"'
      )
      .required('Number is required'),
  });

  const initialValues = {
    name: '',
    phone: '',
  };

  const formatPhoneNumber = value => {
    const phoneNumber = value.replace(/\D/g, '');

    if (phoneNumber.length <= 10) {
      return phoneNumber.replace(/(\d{3})(\d{0,3})(\d{0,4})/, '$1-$2-$3');
    } else {
      return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
  };

  const handlePhoneChange = (e, setFieldValue) => {
    const { value } = e.target;
    const formattedValue = formatPhoneNumber(value);
    setFieldValue('phone', formattedValue);
  };

  const isContactExist = name => {
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const isExist = isContactExist(values.name);

      if (isExist) {
        return alert(`${values.name} is already in contacts.`);
      }

      const contact = {
        id: nanoid(),
        name: values.name,
        number: values.phone,
      };

      dispatch(addContactThunk(contact));
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={s.form}>
      <label className={s.label}>
        <p className={s.title}>Name</p>
        <input
          className={s.input}
          type="text"
          name="name"
          placeholder="Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className={s.error}>{formik.errors.name}</div>
        ) : null}
      </label>
      <label className={s.label}>
        <p className={s.title}>Number</p>
        <input
          className={s.input}
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={e => handlePhoneChange(e, formik.setFieldValue)}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className={s.error}>{formik.errors.phone}</div>
        ) : null}
      </label>
      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
