import { getDictionary, SupportedDictionaries } from '@/lib'

type PageProps = {
  params: {
    locale: SupportedDictionaries;
  }
}

export default async function Page({ params : {locale}} : PageProps) {
  const { Header } = await getDictionary(locale)

  return <h1>{Header.contacto}</h1>
}