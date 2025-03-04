export function userName(userName) {
    let promise = new Promise((resolve, reject) => {

        if (!userName) {
            reject("Name is required!")
            return
        }

        setTimeout(() => resolve(`Hello, ${userName}!`), 1000)
    })
    return promise
}
