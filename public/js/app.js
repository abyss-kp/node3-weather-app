
const weatherForm = document.querySelector("form")
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')

const msg2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    msg1.textContent = 'loading....'
    msg2.textContent = ""
    e.preventDefault()
    const location = search.value
    url = "http://localhost:3000/weather?address=" + location;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (!data.error) {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
            else {
                msg1.textContent = data.error
            }
        })
    })

})