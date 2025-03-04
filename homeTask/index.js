import { userName } from "./greeting.js"
userName("Anna")
    .then(result => console.log(result))
    .catch(error => console.log(error))
userName()
    .then(result => console.log(result))
    .catch(error => console.log(error))
