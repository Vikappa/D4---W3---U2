const firstButton = document.getElementById('firstButton')
const secondButton = document.getElementById('secondButton')


const URL = `https://api.pexels.com/v1/search?query=`
const screenCards = []


const getPicWithQuery = function (query, myURL) {
    let pagineScorse = 0

    fetch(myURL + query, {
        headers: {
            Authorization: "KRnL0eTtRPS9t81c0qjpP4DTgkXjne0537FX088gqlinFRDNqMKitPwa"
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('errore nella chiamata')
            }
        })
        .then((data) => {
            pagineScorse++

            console.log(data)

            return data
        })
        .catch((err) => {
            console.log(err)
        })

}


const mockupcarta = function (id, title = "Lorem Ipsum", src = "https://picsum.photos/id/237/300/200", picId = "9 min") {
    let mockup =
        `<div class="col-md-4" id="card${id}">
    <div class="card mb-4 shadow-sm">
        <img src="${src}" class="bd-placeholder-img card-img-top" />
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
            </p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">
                        View
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" onclick=removeCard(${id})>
                        Hide
                    </button>
                </div>
                <small class="text-muted">${picId}</small>
            </div>
        </div>
    </div>
</div>`

    return mockup
}

const pageFirstLoad = function () {

}



////////////////////////////////////////////////////////////////////////////////////////////////////////
firstButton.addEventListener('click', function () {
    getPicWithQuery("Ufo")
})

secondButton.addEventListener('click', function () {
    getPicWithQuery("Ghost")
})

document.getElementById("inputRicerca").addEventListener("input", function () {
    console.log(document.getElementById("inputRicerca").value)
})

//////////////////////////////////////////////////////////////////////////////////////////////////////
getPicWithQuery("ufo", URL)
