import { useState } from "react";

function ContactForm ({ existingContact = {}, updateCallback}){

    const[firstName , setFirstName] = useState(existingContact.firstName || "")
    const[lastName , setLastName] = useState(existingContact.lastName || "")
    const[email , setEmail] = useState(existingContact.email || "")

    const updating = Object.entries(existingContact).length != 0

    const onSubmit = async (e) => {
        e.preventDefault() //meken kiynne page eka automatically refersh krnne nha kiyla samnyen form ehma submit krpu gmn page eka refresh wenwa. eka mekn nathi wenwa

        const data = {
            firstName,
            lastName,
            email
        }

        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")

        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-type": "application/json"
            },

            body: JSON.stringify(data),
        }

        const response = await fetch(url, options)
        if(response.status !== 201 && response.status !== 200){
            const data = await response.json()
            alert(data.message)
        }
        else{
           updateCallback()
        }


    }
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input type = "text" id = "firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input type = "text" id = "LastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="email"> E-mail: </label>
                <input type = "text" id = "email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <button type = "submit">{updating ? "Update" : "Create"}</button>
        </form>
    )

}

export default ContactForm