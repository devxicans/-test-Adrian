'use client'
import stylesForm from '../form/form.module.css'
import Link from 'next/link'
import { signup } from './action'
import { useFormState, useFormStatus } from 'react-dom'
import { useState } from 'react'

export const SignUpForm = () => {
  const [state, action] = useFormState(signup, undefined)
  const { pending}  = useFormStatus();
  const [isFocusName, setIsFocusName] = useState<boolean>(false);
  const [isFocusEmail, setIsFocusEmail] = useState<boolean>(false);
  const [isFocusPassword, setIsFocusPassword] = useState<boolean>(false);

  return (
    <div className={stylesForm.container}>
      <form action={action} className={stylesForm.form}>
        <h3 className={stylesForm.title}>
          Sign Up
        </h3>
        <div onFocus={() => setIsFocusName(true)} className={stylesForm.wrapper}>
          <input type="text" name='name' id='name' className={stylesForm.input} autoComplete='off' />
          <label className={isFocusName ? stylesForm.active : stylesForm.label} htmlFor='name'>Name</label>
          {state?.errors?.name && <p className={stylesForm.span}>{state.errors.name}</p>}
        </div>
        <div onFocus={() => setIsFocusEmail(true)} className={stylesForm.wrapper}>
          <input  type='text' name='email' id='email' className={ stylesForm.input} autoComplete='off' />
          <label className={isFocusEmail ? stylesForm.active : stylesForm.label} htmlFor='email'>Email</label>
          {state?.errors?.email && <p className={stylesForm.span}>{state.errors.email}</p>}
        </div>
        <div onFocus={() => setIsFocusPassword(true)} className={stylesForm.wrapper}>
          <input  type='text' name='password' id='password' className={stylesForm.input}  autoComplete='off' />
          <label className={isFocusPassword ? stylesForm.active : stylesForm.label} htmlFor='password'>Password</label>
          {state?.errors?.password && (
            <div className={stylesForm.span}>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
        </div>
        <div className={stylesForm.flex}>
          <button disabled={pending} type="submit" className={stylesForm.btn}>
            {pending ? 'Submitting...' : 'Sign Up'}
          </button>
          <Link href='/' className={stylesForm.btn}>Go Home</Link>
        </div>
      </form>
    </div>
  )
}
