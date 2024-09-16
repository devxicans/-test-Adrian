'use client'
import Link from "next/link"
import { ProfilePhotos } from "../sections"
import stylesProfile from '../sections/profilePhotos/profile.module.css'
import { useLocalization } from "@/lib/context"

const Profile = () => {
  const { Header } = useLocalization();

  return (
    <>
    <section className={stylesProfile.gradient}>
      <Link href='/' className={stylesProfile.link}>
        {Header.goHome}
      </Link>
      <ProfilePhotos />
    </section>
    </>
  )
}

export default Profile