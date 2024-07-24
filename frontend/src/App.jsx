import { useState, useEffect } from 'react'
import './App.css'
import ContactList from './ContactList'
import ContactForm from './ContactForm'

function App() {

  const [contacts, setContacts] = useState([]) //methna athule sagala warahan deka damme nattnm error ekak enwa code ek muladi 

  const[isModelOpen, setModelOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts()
  },  [])

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json()
    setContacts(data.contacts)
    console.log(data.contacts[0].firstName)
    
  }

  const closeModel = () => {
    setModelOpen(false)
    setCurrentContact({})
  }

  const openCreateModel = () => {
    if(!isModelOpen){
      setModelOpen(true)
    }
  }

  const openEditModal = (contact) => {
    if(isModelOpen) return
    setCurrentContact(contact)
    setModelOpen(true)
  }
  const onUpdate = () => {
    closeModel()
    fetchContacts()
  }

  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
      <button onClick = {openCreateModel}>Create New Contact</button>
      {isModelOpen && <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModel}>&times;</span>
            <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
          </div>
        </div>
        }
    </>
      
  )
}

export default App
 