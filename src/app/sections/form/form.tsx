'use client'
import Link from 'next/link'
import stylesForm from './form.module.css'
import { useState } from 'react'
import React from 'react'
import { UiValidator, UiValidatorErrors } from '@uireact/validator';
import { toast } from 'react-toastify'
import { POST } from '@/app/api/contacts/route'


export const Form = () => {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    message: ""
  })



  const [isFocusName, setIsFocusName] = useState<boolean>(false);
  const [isFocusEmail, setIsFocusEmail] = useState<boolean>(false);
  const [isFocusMessage, setIsFocusMessage] = useState<boolean>(false);
  const [onSubmit, setOnSubmit] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false)

  //  Validate from client to then sent to API (using UiReact)
  const validator = new UiValidator();


  const Schema = {
    name: validator.ruler().isRequired('first Name is required'),
    email: validator.ruler().isRequired('email is required'),
    message: validator.ruler().isRequired('message is required'),
  }

  const checkValidation = (e: React.FormEvent) => {
    e.preventDefault()
      const { name, email, message } = contactInfo;

      const newContact = {
        name,
        email,
        message
      }

      const result = validator.validate(Schema, newContact);

      if (result.passed) {
        setTimeout(() => {
          setOnSubmit(false)
          setIsError(false)
          contactInfo.name = '';
          contactInfo.email = '';
          contactInfo.message = '';
          setIsFocusName(false);
          setIsFocusEmail(false);
          setIsFocusMessage(false);
        }, 2000)
        setOnSubmit(true)
        return sendContact(newContact);
      }

      if (result.errors) {
        // const { name, email, message } = result.errors;
        toast.error(`Please be sure to fill out every field of the form`)
        setIsError(true)
      }
  }

  
  
  const sendEmail = async () => {
    const { email } = contactInfo;



    const response = await fetch('/api/emails', {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    })


    if (!response.ok) {
      console.log(response);
      return toast.error('Something went wrong')
    }

    await response.json();
    toast.success('Email sent successfully to your email')
  }



  const sendContact = async (info: {}) => {
    const response = await fetch('/api/contacts', {
        method: "POST",
        body: JSON.stringify(info)
    })

    if (!response.ok) {
      toast.error('Something went wrong')
    }

    await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait 2 seconds

    
    const data = await response.json();


    sendEmail()
  }



  const onChangeTextAreas = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContactInfo({...contactInfo, [e.currentTarget.name] : [e.currentTarget.value]})
  }

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({...contactInfo, [e.currentTarget.name] : [e.currentTarget.value]})
  }



  return (
    <div className={stylesForm.container}>
      <form onSubmit={checkValidation} className={stylesForm.form}>
        <h3 className={stylesForm.title}>
          NewsLetter
        </h3>
        <div onFocus={() => setIsFocusName(true)} className={stylesForm.wrapper}>
          <input type="text" name='name' id='name' value={contactInfo.name} className={isError ? stylesForm.input__error : stylesForm.input}  onChange={onChangeInputs}  autoComplete='off' required />
          <label className={isFocusName ? stylesForm.active : stylesForm.label} htmlFor='name'>Full Name</label>
          <span className={isError ? stylesForm.span : stylesForm.span__close}>Full Name is required</span>
        </div>
        <div onFocus={() => setIsFocusEmail(true)} className={stylesForm.wrapper}>
          <input type="email" name='email' value={contactInfo.email} id='email' className={isError ? stylesForm.input__error : stylesForm.input} onChange={onChangeInputs}  autoComplete='off' required  />
          <label className={isFocusEmail ? stylesForm.active  :  stylesForm.label} htmlFor='email'>Email</label>
          <span className={isError ? stylesForm.span : stylesForm.span__close}>Email is required</span>
        </div>
        <div onFocus={() => setIsFocusMessage(true)} className={stylesForm.wrapper}>
          <textarea  className={isError ? stylesForm.input__error : stylesForm.input} name='message' id='message' value={contactInfo.message}  autoComplete='off' onChange={onChangeTextAreas} required></textarea>
          <label className={isFocusMessage ? stylesForm.active  :  stylesForm.label} htmlFor='message'>Message</label>
          <span className={isError ? stylesForm.span : stylesForm.span__close}>Message is required</span>
        </div>
        <div className={stylesForm.flex}>
          <button type="submit" className={stylesForm.btn}>{ onSubmit ? `Sending...`: 'Send'}</button>
          <Link href='/' className={stylesForm.btn}>Go Home</Link>
        </div>
      </form>
    </div>
  )
}
