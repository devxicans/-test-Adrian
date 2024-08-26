'use client'
import HeaderItems from "./components/HeaderItems"
import StylesHeader from './header.module.css'
import Link from "next/link"

export const Header = () => {
  return (
    <header title="heading" className={StylesHeader.header}>
      <div className="container">
        <div className={StylesHeader.wrapper}>
          <Link href='/profile'>
            <h3 className={StylesHeader.logo}>Adrian Covarrubias</h3>
          </Link>
          <HeaderItems/>
        </div>
      </div>
    </header>
  )
}

