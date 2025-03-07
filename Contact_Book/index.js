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
    return fs.promises.readFile(newFileRoot, "utf-8")
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

            return fs.promises.writeFile(newFileRoot, JSON.stringify(contacts, null, 2))
                .then(() => {
                    console.log("File is updated")
                })
                .catch((err) => {
                    console.log(err.message)
                })

        })

}

// addContact("Anna", 123, "agmail.com")
//     .then(() => {
//         addContact("John", 456, "bgmail.com")
//     })

function viewContacts() {
    fs.promises.readFile(newFileRoot, "utf-8")
        .then((data) => {
            return JSON.parse(data || [])
        })
        .catch(() => [])
        .then((data) => {
            if (data.length == 0) {
                console.log("There is no contacts")
            }
            else {
                data.forEach((element) => {
                    console.log(`The name is ${element.name}, the phone number: ${element.phone}, eamil: ${element.email}`)
                })
            }
        })
}

viewContacts()

function deleteContact(id) {
    fs.promises.readFile(newFileRoot, "utf-8")
        .then((data) => {
            return JSON.parse(data || [])
        })
        .catch(() => [])
        .then((data) => {
            if (data.length == 0) {
                console.log("There is no contacts")
            }
            else {
                let updatedData = data.filter((data) => {
                    return data.id !== id
                })
                console.log(updatedData)
                fs.promises.writeFile(newFileRoot, JSON.stringify(updatedData, null, 2))
                    .then(() => {
                        console.log("file is updated")
                    })
                    .catch((err) => {
                        console.log(err.message)
                    })

            }

        })
}

deleteContact(1741362722992);
