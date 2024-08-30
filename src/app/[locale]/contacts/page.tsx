import { Metadata } from "next"
import { GetContacts } from "../sections"

export const metadata: Metadata = {
  title: "Adrian - Contacts"
}

const Contacts = () => {
    return (
      <GetContacts />
    )
}

export default Contacts