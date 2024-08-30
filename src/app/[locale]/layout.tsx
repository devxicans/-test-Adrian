import { SupportedDictionaries, getDictionary } from "@/lib"
import { ReactNode } from "react"
import { LocProvider } from '@/lib/context'

type LayoutProps = {
  params: {
    locale: SupportedDictionaries;
  }
  children: ReactNode,
}


export default async function AppLayout({ params: {locale}, children} : LayoutProps) {
  const dic = await getDictionary(locale)

  return (
    <LocProvider loc={dic}>
      {children}
    </LocProvider>
  )
}

