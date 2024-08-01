import React from "react";
import PropTypes from "prop-types"

const ContactList = ({ contacts, updateContact, updateCallback } ) => { 

    const onDelete = async (id) => {
        try{
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://flask-backend-service:5000/delete_contact/${id}`, options)
            if(response.status === 200){
                updateCallback()
            }
            else{
                console.log("faild to delete")
            }
        }
        catch(error){
            alert(error)
        }
    }

    return <div>
        <h2>Contacts</h2>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                    <tr key = {contact.id}>
                        <td>{contact.firstName}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.email}</td>
                        <td>
                            <button onClick={() => updateContact(contact)}>Update</button>
                            <button onClick={() => onDelete(contact.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

//menna mehm defaultprop ekak danna one error ekak no enna nm , me widiyt default prop ekak damme nattnm error ekak enwa e error eka: Uncaught TypeError: Cannot read properties of undefined (reading 'map')

// ContactList.propTypes = {
//     contacts: PropTypes.arrayOf(PropTypes.shape({
//       firstName: PropTypes.string,
//       lastName: PropTypes.string,
//       email: PropTypes.string,
//     })),
//   };


// ContactList.defaultProps = {
//     contacts: []
// }
export default ContactList