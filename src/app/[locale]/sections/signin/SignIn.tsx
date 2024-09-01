'use client'
import stylesForm from '../form/form.module.css'
import { signin } from './action'
import { useFormState } from 'react-dom'
import { useState } from 'react'
import Link from 'next/link'
import { TfiUser } from "react-icons/tfi";



export const SignIn = () => {
  const [state, action] = useFormState(signin, undefined);
  const [isFocusEmail, setIsFocusEmail] = useState<boolean>(false);
  const [isFocusPassword, setIsFocusPassword] = useState<boolean>(false);

  return (
    <div className={stylesForm.container}>
      <form action={action} className={stylesForm.form}>
        <h3 className={stylesForm.title}>
          Sign In
        </h3>
        <div onFocus={() => setIsFocusEmail(true)} className={stylesForm.wrapper}>
          <input  type='text' name='email' id='email' className={ stylesForm.input} autoComplete='off' />
          <label className={isFocusEmail ? stylesForm.active : stylesForm.label} htmlFor='email'>Email</label>
          {state?.errors?.email && <p className={stylesForm.span}>{state.errors.email}</p>}
        </div>
        <div onFocus={() => setIsFocusPassword(true)} className={stylesForm.wrapper}>
          <input  type='password' name='password' id='password' className={stylesForm.input}  autoComplete='off' />
          <label className={isFocusPassword ? stylesForm.active : stylesForm.label} htmlFor='password'>Password</label>
          {state?.errors?.password && <p className={stylesForm.span}>{state.errors.password}</p>}
        </div>
        <div className={stylesForm.flex}>
          <button  className={stylesForm.btn}>
            Submit
          </button>
        </div>
        <span className={stylesForm.account}>
          <TfiUser />
          If you don't have an account you can register
          <Link className={stylesForm.loggin} href='/register'>here</Link>
        </span>
      </form>
    </div>
  )
}