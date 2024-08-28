import stylesProfile from './profile.module.css'
import Image from 'next/image'
import Image1 from '@/../public/image1.jpg'
import Image2 from '@/../public/image2.jpg'
import Image3 from '@/../public/image3.jpg'


export const ProfilePhotos = () => {
  return (
      <div className={stylesProfile.container}>
        <Image className={stylesProfile.img} src={Image1} width="500" height="500" alt="Profile Image"/>
        <Image className={stylesProfile.img}  src={Image2} width="500" height="500" alt="Profile Image"/>
        <Image className={stylesProfile.img}  src={Image3} width="500" height="500" alt="Profile Image"/>
      </div>
  )
}
