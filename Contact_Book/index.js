import path from "path";
import fs from "fs";

let CurrentDirectory = path.resolve()


let newFileRoot = path.join(CurrentDirectory, "contacts.json")

// fs.promises.writeFile(newFileRoot, "")
// .then(()=>{
//     comnsole.log("file is created")
// })
// .catch((err)=>{
//     console.log(err.message)
// })

function addContact(contactName, contactPhone, contactEmail) {
    fs.promises.readFile(newFileRoot, "utf-8")
        .then((data) => {
            return JSON.parse(data || [])
        })
        .catch(() => [])
        .then((contacts) => {
            let newContact = {
                id: Date.now(),
                name: contactName,
                phone: contactPhone,
                email: contactEmail
            }
            contacts.push(newContact)
          
            fs.promises.writeFile(newFileRoot, JSON.stringify(contacts))
                .then(() => {
                    console.log("file is updated")
                })
                .catch((err) => {
                    console.log(err.message)
                })

        })

}

addContact("Anna", "123", "a@gmail.com")

// viewContacts();
// deleteContact(id);
