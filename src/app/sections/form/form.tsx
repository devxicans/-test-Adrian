'use client'
import Link from 'next/link'
import stylesForm from './form.module.css'
import { useState } from 'react'
import React from 'react'
import { UiValidator, UiValidatorErrors } from '@uireact/validator';
import { toast } from 'react-toastify'

const validator = new UiValidator();

const Schema = {
  name: validator.ruler().isRequired('First Name is required'),
  email: validator.ruler().isRequired('Email is required').type('email', 'Email is not valid'),
  message: validator.ruler().isRequired('Message is required'),
}


export const Form = () => {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    message: ""
  })


  const [isFocusName, setIsFocusName] = useState<boolean>(false);
  const [isFocusEmail, setIsFocusEmail] = useState<boolean>(false);
  const [isFocusMessage, setIsFocusMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<UiValidatorErrors>();


  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true);
    setErrors({});

    const { name, email, message } = contactInfo;

    const newContact = {
      name,
      email,
      message
    }


    const result = validator.validate(Schema, newContact, true);

    if (!result.passed) {
      setErrors(result.errors);
      setLoading(false)
      return;
    }

    if (result.passed) {
      sendContact(newContact)
    }
  }

  const sendEmail = async () => {
    const { email } = contactInfo;

    const response = await fetch('/api/email', {
      method: "POST",
      body: JSON.stringify({email})
    })


    if (!response.ok) {
      console.log(response);
      setLoading(false)
      return toast.error('Something went wrong')
    }

    toast.success('Email sent successfully')
    setLoading(false)
    setIsFocusName(false)
    setIsFocusEmail(false)
    setIsFocusMessage(false)
    setContactInfo({ ...contactInfo, name: '', email: '', message: ''})
  }

  const sendContact = async (info: {}) => {
    const response = await fetch('/api/contacts', {
        method: "POST",
        body: JSON.stringify(info)
    })

    if (!response.ok) {
      toast.error('Something went wrong')
    }

    sendEmail()
  }

  const onChangeTextAreas = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContactInfo({...contactInfo, [e.currentTarget.name] : e.currentTarget.value})
  }

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({
      ...contactInfo,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  return (
    <div className={stylesForm.container}>
      <form onSubmit={onSubmit} className={stylesForm.form}>
        <h3 className={stylesForm.title}>
          NewsLetter
        </h3>
        <div onFocus={() => setIsFocusName(true)} className={stylesForm.wrapper}>
          <input type="text" name='name' id='name' value={contactInfo.name} className={errors ? errors.name ? stylesForm.input__error : stylesForm.input : stylesForm.input}  onChange={onChangeInputs}  autoComplete='off'  required  />
          <label className={isFocusName ? stylesForm.active : stylesForm.label} htmlFor='name'>Full Name</label>
          {
            errors?.name?.[0].message && <span className={stylesForm.span}>{errors?.name?.[0].message} </span>
          }
        </div>
        <div onFocus={() => setIsFocusEmail(true)} className={stylesForm.wrapper}>
          <input  type='email' name='email' value={contactInfo.email} id='email' className={errors ? errors.email ? stylesForm.input__error : stylesForm.input : stylesForm.input} onChange={onChangeInputs}  autoComplete='off'    required />
          <label className={isFocusEmail ? stylesForm.active  :  stylesForm.label} htmlFor='email'>Email</label>
          {
            errors?.email?.map((msgError, inx) => (<span key={`Email_error_message_${inx}`} className={stylesForm.span}>{msgError.message} </span>))
          }
        </div>
        <div onFocus={() => setIsFocusMessage(true)} className={stylesForm.wrapper}>
          <textarea  className={errors ? errors.message ? stylesForm.input__error : stylesForm.input : stylesForm.input} name='message' id='message' value={contactInfo.message}  autoComplete='off' onChange={onChangeTextAreas} required  ></textarea>
          <label className={isFocusMessage ? stylesForm.active  :  stylesForm.label} htmlFor='message'>Message</label>
          {
            errors?.message?.[0].message && <span className={stylesForm.span}>{errors?.message?.[0].message} </span>
          }
        </div>
        <div className={stylesForm.flex}>
          <button type="submit" className={stylesForm.btn}>{ loading ? `Sending...`: 'Send'}</button>
          <Link href='/' className={stylesForm.btn}>Go Home</Link>
        </div>
      </form>
    </div>
  )
}
