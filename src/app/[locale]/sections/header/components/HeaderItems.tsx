import { UiText } from '@uireact/text'
import { UiNavbar, UiNavbarItem } from '@uireact/navbar'
import {UiReactHoverScaleUp } from '@uireact/framer-animations'
import StylesHeader from '../header.module.css'
import Link from 'next/link'
import { useLocalization } from '@/lib/context'

const HeaderItems = () => {
  const { Header } = useLocalization();

  const removeSession =  () => {
    fetch('/api/removeuser');
  }

  return (
    <UiNavbar rounded="all" className={StylesHeader.flex} stretch noBackground>
      <Link  className={StylesHeader.link} href='/contacts'>
        <UiNavbarItem  motion={{ ...UiReactHoverScaleUp }}>
          <UiText className={StylesHeader.padding} padding={{ all: 'five' }}>{ Header.contacts}</UiText>
        </UiNavbarItem>
      </Link>
      <UiNavbarItem motion={{ ...UiReactHoverScaleUp }} className={StylesHeader.link}>
          <UiText className={StylesHeader.padding} padding={{all: 'five'}}>18</UiText>
      </UiNavbarItem>
      <Link className={StylesHeader.link} href='https://www.google.com.mx/maps/place/Real+Santa+Fe,+Cdad.+de+Villa+de+%C3%81lvarez,+Col./@19.2882134,-103.7275877,17z/data=!3m1!4b1!4m6!3m5!1s0x84255b2be89559a1:0xdd6df5fd3a99ed4c!8m2!3d19.2882495!4d-103.7249345!16s%2Fg%2F1hhwltw5q?entry=ttu' target='_blank'>
        <UiNavbarItem  motion={{ ...UiReactHoverScaleUp }}>
          <UiText className={StylesHeader.padding} padding={{all: 'five'}}>{ Header.direccion}</UiText>
        </UiNavbarItem>
      </Link>
      <Link  className={StylesHeader.link} href='/contact'>
        <UiNavbarItem  motion={{ ...UiReactHoverScaleUp }}>
          <UiText className={StylesHeader.padding} padding={{all: 'five'}}> { Header.contacto}</UiText>
        </UiNavbarItem>
      </Link>
      <div onClick={ () => removeSession()} className={StylesHeader.link}>
        <UiNavbarItem motion={{ ...UiReactHoverScaleUp }} >
          <UiText className={StylesHeader.padding} padding={{ all: 'five' }}>{Header.logout }</UiText>
        </UiNavbarItem>
      </div>
    </UiNavbar>
  )
}

export default HeaderItems