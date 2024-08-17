import { UiText } from '@uireact/text'
import { UiNavbar, UiNavbarItem } from '@uireact/navbar'
import {UiReactHoverScaleUp } from '@uireact/framer-animations'
import StylesHeader from '../header.module.css'
import Link from 'next/link'

const HeaderItems = () => {
  return (
    <UiNavbar rounded="all"  className={StylesHeader.flex} stretch noBackground>
      <UiNavbarItem motion={{ ...UiReactHoverScaleUp }} className={StylesHeader.link}>
          <UiText padding={{all: 'five'}}>18</UiText>
      </UiNavbarItem>
      <Link className={StylesHeader.link} href='https://www.google.com.mx/maps/place/Real+Santa+Fe,+Cdad.+de+Villa+de+%C3%81lvarez,+Col./@19.2882134,-103.7275877,17z/data=!3m1!4b1!4m6!3m5!1s0x84255b2be89559a1:0xdd6df5fd3a99ed4c!8m2!3d19.2882495!4d-103.7249345!16s%2Fg%2F1hhwltw5q?entry=ttu' target='_blank'>
        <UiNavbarItem  motion={{ ...UiReactHoverScaleUp }}>
          <UiText padding={{all: 'five'}}>Address</UiText>
        </UiNavbarItem>
      </Link>
      <Link  className={StylesHeader.link} href='/contact'>
        <UiNavbarItem  motion={{ ...UiReactHoverScaleUp }}>
          <UiText padding={{all: 'five'}}>Contact</UiText>
        </UiNavbarItem>
      </Link>
    </UiNavbar>
  )
}

export default HeaderItems