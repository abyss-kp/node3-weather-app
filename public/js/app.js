const weatherForm = document.querySelector("form")
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')
const msg3 = document.querySelector('#message-3')
const msg4 = document.querySelector('#message-4')

weatherForm.addEventListener('submit', (e) => {
    msg1.textContent = 'loading....'
    msg2.textContent = ""
    msg3.textContent = ""
    msg4.textContent = ""
    e.preventDefault()

    const location = search.value
    url = "/weather?address=" + location;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (!data.error) {
                const temp = data.temp + "%"
                const tempLow = data.tempLow + "%"
                const tempHigh = data.tempHigh + "%"
                    //  console.log(temp, tempHigh, tempLow)
                document.getElementById('progressbar1').style.backgroundColor = "#e0e0e0";
                document.getElementById('progressbar2').style.backgroundColor = "#e0e0e0";
                document.getElementById('progressbar3').style.backgroundColor = "#e0e0e0";
                document.getElementById('temp').style.backgroundColor = "#f99d2b";
                document.getElementById('temp').style.width = temp;
                document.getElementById('minTemp').style.backgroundColor = "#5aa2ec";
                document.getElementById('minTemp').style.width = tempLow;
                document.getElementById('maxTemp').style.backgroundColor = "#ff0000";
                document.getElementById('maxTemp').style.width = tempHigh;
                msg1.textContent = data.location
                const arr = data.forecast.split(".")
                msg2.textContent = arr[0]
                msg4.textContent = arr[1]
                msg3.textContent = arr[2]
            } else {
                msg1.textContent = data.error
            }
        })
    })

})