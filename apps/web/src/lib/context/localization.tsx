'use client'
import { createContext, ReactNode, useContext } from "react"

export type LocFile = {
  [key in string]: {
    [key in string]: string;
  };
}

type LocProviderProps = {
  loc: {},
  children: ReactNode
}

const LocContext = createContext<LocFile>({})

export const LocProvider = ({loc, children} : LocProviderProps) => {
  return (
    <LocContext.Provider value={loc}>
      {children}
    </LocContext.Provider>
  )
}


export const useLocalization = () => {
  const loc = useContext(LocContext);
  return loc;
}