const URL = `https://api.pexels.com/v1/search?query=`

const screenCards = []
let currentPexelPages = []

class pexelPage {
    constructor(next_page, page, photos, total_results) {
        this.next_page = next_page
        this.page = page
        this.photos = photos
        this.total_results = total_results
    }
}

class pexelPhoto {
    constructor(alt, height, id, photographer, photographer_id, photographer_url, src, url, width) {
        this.alt = alt,
            this.height = height,
            this.id = id,
            this.photographer = photographer,
            this.photographer_id = photographer_id,
            this.photographer_url = photographer_url,
            this.src = src,
            this.url = url,
            this.width = width
    }

    buildPhotoCard() {
        return `<div class="card text-bg-light col-12 col-md-4 col-lg-3">
        <img src="${this.src.medium}" class="card-img" alt="${this.alt}">
        <div class="card-img-overlay">
          <h5 class="card-title">${this.alt}</h5>
          <p class="card-text">Autore:${this.photographer}</p>
          <p class="card-text">Visita il suo blog: <a class="text-primary" href="${this.photographer_url}">${this.photographer_url}</a></p>
          <p class="card-text"><small>id: ${this.id}</small></p>
        </div>
      </div>`
    }
}

class pexelSrc {
    constructor(landscape, large, large2x, medium, original, portait, small, tiny) {
        this.landscape = landscape,
            this.large = large,
            this.large2x = large2x,
            this.medium = medium,
            this.original = original,
            this.portait = portait,
            this.small = small,
            this.tiny = tiny
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let foto_per_pagina = 9

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const updateScreen = function () {
    let stringaFinale = ``
    currentPexelPages.forEach(currentPexelPage => {
        currentPexelPage.photos.forEach(pexelphoto => {
            stringaFinale = stringaFinale + pexelphoto.buildPhotoCard()
        })
    })
    document.getElementById('mainRow').innerHTML = stringaFinale
}

const getPicWithQuery = function (query, myURL) {
    currentPexelPages = []
    fetch(myURL + query + `&per_page=${foto_per_pagina}`, {
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
            let nextPage = data.next_page
            let pagina = data.page
            let arrayFoto = []
            let totRes = data.total_results

            for (let index = 0; index < data.photos.length; index++) {
                let alt = data.photos[index].alt
                let altezza = data.photos[index].height
                let id = data.photos[index].id
                let fotografo = data.photos[index].photographer
                let idFotoGrafo = data.photos[index].photographer_id
                let photographer_url = data.photos[index].photographer_url
                let source = new pexelSrc(data.photos[index].src.landscape, data.photos[index].src.large, data.photos[index].src.large2x, data.photos[index].src.medium, data.photos[index].src.original, data.photos[index].src.portait, data.photos[index].src.small, data.photos[index].src.tiny)
                let pexelurl = data.photos[index].url
                let larghezza = data.photos[index].width
                let newPhoto = new pexelPhoto(alt, altezza, id, fotografo, idFotoGrafo, photographer_url, source, pexelurl, larghezza)
                arrayFoto.push(newPhoto)
            }
            let pexePageRicevuta = new pexelPage(nextPage, pagina, arrayFoto, totRes)
            currentPexelPages.push(pexePageRicevuta)
            updateScreen()
        })
        .catch((err) => {
            console.log(err)
        })

}


const pageFirstLoad = function () {
    getPicWithQuery("trending", URL)
}



////////////////////////////////////////////////////////////////////////////////////////////////////////
pageFirstLoad()

document.getElementById('ricerca').addEventListener('input', function () {
    console.log("aa")
    getPicWithQuery(document.getElementById('campoRicerca').value, URL)

})

document.getElementById('mobileSearch').addEventListener('input', function () {
    getPicWithQuery(document.getElementById('mobileCasella').value, URL)

})