import Contacts from '../../contacts/page'
import Styles from './getcontacts.module.css';

type Contacts = {
  id: number,
  name: string,
  email: string,
  message: string,
}
const developmentEnv = process.env.development || 'https://test-adrian-olive.vercel.app';

async function fetchContacts() {
  const response = await fetch(`${developmentEnv}/api/contacts`, {
    next : {
      revalidate: 10
    }
  }
  );
  const dataContacts = await response.json();
  return dataContacts;
}


export const GetContacts = async () => {
  const data = await fetchContacts()

  return (
    <div className={Styles.container}>
      <table className={Styles.styledtable}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
            </tr>
        </thead>
          <tbody>
            {
              data.contacts.map((contact : Contacts) => (
                <tr key={contact.id}>
                  <td>{ contact.name}</td>
                  <td>{ contact.email }</td>
                  <td>{contact.message}</td>
                </tr>
                ))
            }
          </tbody>
      </table>
   </div>
  )
}
