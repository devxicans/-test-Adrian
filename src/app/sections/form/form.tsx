'use client'
import Link from 'next/link'
import stylesForm from './form.module.css'
import { useState } from 'react'
import React from 'react'


export const Form = () => {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [isFocusName, setIsFocusName] = useState(false);
  const [isFocusEmail, setIsFocusEmail] = useState(false);
  const [isFocusMessage, setIsFocusMessage] = useState(false);





  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({...contactInfo, [e.target.name] : [e.target.value]})
  }

  // const submitContact = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault()
  //   const {name, email, message} = contactInfo;
  //   const newContact = {
  //     name,
  //     email,
  //     message
  //   }

  //   console.log(newContact);
  // }


  return (
    <div className={stylesForm.container}>
      <form className={stylesForm.form}>
        <h3 className={stylesForm.title}>
          NewsLetter
        </h3>
        <div onFocus={() => setIsFocusName(true)} className={stylesForm.wrapper}>
          <input type="text" name='name' id='name' value={contactInfo.name} className={stylesForm.input} onChange={onChange} required autoComplete='off'/>
          <label className={isFocusName ? stylesForm.active  :  stylesForm.label} htmlFor='name'>Full Name</label>
        </div>
        <div onFocus={() => setIsFocusEmail(true)} className={stylesForm.wrapper}>
          <input type="text" name='email' value={contactInfo.email} id='email' className={stylesForm.input} onChange={onChange} required autoComplete='off' />
          <label className={isFocusEmail ? stylesForm.active  :  stylesForm.label} htmlFor='email'>Email</label>
        </div>
        <div onFocus={() => setIsFocusMessage(true)} className={stylesForm.wrapper}>
          <textarea  className={stylesForm.input} name='message' id='message' value={contactInfo.message}  autoComplete='off' required></textarea>
          <label className={isFocusMessage ? stylesForm.active  :  stylesForm.label} htmlFor='message'>Message</label>
        </div>
        <div className={stylesForm.flex}>
          <button type="submit" className={stylesForm.btn}>Send</button>
          <Link href='/' className={stylesForm.btn}>Go Home</Link>
        </div>
      </form>
    </div>
  )
}
