import Contacts from '../../contacts/page'
import Styles from './getcontacts.module.css';
import connectDB from '@/lib/db/mongoDB';
import contact from '@/lib/schema/contactsSchema';

type Contacts = {
  id: number,
  name: string,
  email: string,
  message: string,
}
const developmentEnv = process.env.development || 'https://test-adrian-olive.vercel.app';



export const GetContacts = async () => {
  await connectDB();
  const getContacts = await contact.find();

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
              getContacts.map((contact : Contacts) => (
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
