const firstButton = document.getElementById('firstButton')
const secondButton = document.getElementById('secondButton')

const myURL = `https://api.pexels.com/v1/search?query=`


const getPicWithQuery = function (query) {
    console.log(query)

    fetch(myURL, {
        headers: {
            Authorization: "KRnL0eTtRPS9t81c0qjpP4DTgkXjne0537FX088gqlinFRDNqMKitPwa"
        }
    })
        .then((response) => {
            console.log('response', response)
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('errore nella chiamata')
            }
        })
        .then((data) => {
            console.log('DATA', data)
            console.log(data)
        })
        .catch((err) => {
            console.log(err)
        })

}



getConcerts()





////////////////////////////////////////////////////////////////////////////////////////////////////////
firstButton.addEventListener('click', function () {
    let primaquery = "Ufo"
    getPicWithQuery(primaquery)
})

secondButton.addEventListener('click', function () {
    let secondaQuery = "Aliens"

})