'use client'
import { UiTable } from '@uireact/table'
import Styles from './getcontacts.module.css'

async function fetchContacts() {
  const response = await fetch('/api/contacts', {
    next: {
      revalidate: 10,
    }
  });

  const contacts = await response.json();
  return contacts;
}

export const GetContacts = async () => {
  const contacts = await fetchContacts();

  return (
    <div className={Styles.container}>
      <UiTable className={Styles.wrapper}
      bordered
      data={{
        headings: [{ label: 'Name', sort: false }, { label: 'Email', sort: false } , { label: 'Message', sort: false }],
        items: [
          { id: '1', cols: [] },
        ],
      }}
      selected="3"
      onClick={(id) => {
        console.log(`id ${id} selected`);
        }}
        category="tertiary"
        withSort={false}
        withFilter={false}
    />
  </div>
  )
}
