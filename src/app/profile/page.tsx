import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import { ProfilePhotos } from "../sections"
import stylesProfile from '../sections/profilePhotos/profile.module.css'

export const metadata: Metadata = {
  title: "Adrian - Profile"
}

const Profile = () => {

  return (
    <>
    <section className={stylesProfile.gradient}>
      <Link href='/' className={stylesProfile.link}>
        Go to Home
      </Link>
      <ProfilePhotos />
    </section>
    </>
  )
}

export default Profile