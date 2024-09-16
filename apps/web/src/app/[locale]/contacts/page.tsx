import { Metadata } from "next"
import { GetContacts } from "../sections"
import stylesProfile from '../sections/profilePhotos/profile.module.css'
import Link from "next/link"


export const metadata: Metadata = {
  title: "Adrian - Contacts"
}

const Contacts = () => {

  return (
    <>
      <Link href='/' className={stylesProfile.link}>
        Home
      </Link>
      <GetContacts />
    </>
    )
}

export default Contacts