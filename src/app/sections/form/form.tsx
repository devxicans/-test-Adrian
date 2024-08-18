'use client'
import Link from 'next/link'
import stylesForm from './form.module.css'
import { useState } from 'react'
import React from 'react'
import { UiValidator, UiValidatorErrors } from '@uireact/validator';



export const Form = () => {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [isFocusName, setIsFocusName] = useState(false);
  const [isFocusEmail, setIsFocusEmail] = useState(false);
  const [isFocusMessage, setIsFocusMessage] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);

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
        setOnSubmit(true)
        contactInfo.name = '';
        contactInfo.email = '';
        contactInfo.message = '';
        setIsFocusName(false);
        setIsFocusEmail(false);
        setIsFocusMessage(false);
        console.log(newContact);
    } else {
     return console.log(result.errors);
    }
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
          <input type="text" name='name' id='name' value={contactInfo.name} className={stylesForm.input} onChange={onChangeInputs}  autoComplete='off' required/>
          <label className={isFocusName ? stylesForm.active : stylesForm.label} htmlFor='name'>Full Name</label>
          <span className={stylesForm.span}>This is an error message</span>
        </div>
        <div onFocus={() => setIsFocusEmail(true)} className={stylesForm.wrapper}>
          <input type="email" name='email' value={contactInfo.email} id='email' className={stylesForm.input} onChange={onChangeInputs}  autoComplete='off' required />
          <label className={isFocusEmail ? stylesForm.active  :  stylesForm.label} htmlFor='email'>Email</label>
          <span className={stylesForm.span}>This is an error message</span>
        </div>
        <div onFocus={() => setIsFocusMessage(true)} className={stylesForm.wrapper}>
          <textarea  className={stylesForm.input} name='message' id='message' value={contactInfo.message}  autoComplete='off' onChange={onChangeTextAreas} ></textarea>
          <label className={isFocusMessage ? stylesForm.active  :  stylesForm.label} htmlFor='message'>Message</label>
          <span className={stylesForm.span}>This is an error message</span>
        </div>
        <div className={stylesForm.flex}>
          <button type="submit" className={stylesForm.btn}>{ onSubmit ? `Sending...`: 'Send'}</button>
          <Link href='/' className={stylesForm.btn}>Go Home</Link>
        </div>
      </form>
    </div>
  )
}
