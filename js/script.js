const firstButton = document.getElementById('firstButton')
const secondButton = document.getElementById('secondButton')

const myURL = `https://api.pexels.com/v1/search?query=`
const screenCards = []

const refreshScreen = function () {
    console.log(screenCards)
    document.getElementById('mainRow').innerHTML = ``
    let innerHtmlCards = ``
    for (let index = 0; index < screenCards.length; index++) {
        innerHtmlCards = innerHtmlCards + screenCards[index]
    }

    document.getElementById('mainRow').innerHTML = innerHtmlCards
}



const getPicWithQuery = function (query) {

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
            console.log(data.photos[Math.floor(Math.random() * 16)])
            console.log(data.photos[Math.floor(Math.random() * 16)].src)


            screenCards.push(
                buildCard(data.photos[Math.floor(Math.random() * 16)].alt,
                    data.photos[Math.floor(Math.random() * 16)].src.medium)

            )
            refreshScreen()
            return data
        })
        .catch((err) => {
            console.log(err)
        })

}

const buildCard = function (title = "Lorem Ipsum", src = "https://picsum.photos/id/237/300/200") {
    let mockup =
        `<div class="col-md-4">
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
                    <button type="button" class="btn btn-sm btn-outline-secondary">
                        Edit
                    </button>
                </div>
                <small class="text-muted">9 mins</small>
            </div>
        </div>
    </div>
</div>`

    return mockup
}

const pageFirstLoad = function () {
    let innerHtmlCards = ``
    for (let index = 0; index < 15; index++) {
        screenCards.push(buildCard())
        innerHtmlCards = innerHtmlCards + screenCards[index]
    }

    document.getElementById('mainRow').innerHTML = innerHtmlCards
}



////////////////////////////////////////////////////////////////////////////////////////////////////////
firstButton.addEventListener('click', function () {
    getPicWithQuery("Ufo")
})

secondButton.addEventListener('click', function () {
    getPicWithQuery("Aliens")
})

pageFirstLoad()