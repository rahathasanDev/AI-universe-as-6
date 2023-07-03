
// all Cards api load function :

const apiDataLoad = loadData => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    fetch(url)
    .then(res => res.json())
    .then(data => displayApiDataLoad(data.data.tools, loadData))

}

// all cards  data display function from API :


const displayApiDataLoad = (data,loadData) => {
    Spinner(true)

    const showMoreSection = document.getElementById('show-more')
    if (loadData !== 6 && data.length > 6) {
        data = data.slice(0, 6)
        showMoreSection.classList.remove('d-none')
    }
    else {
        showMoreSection.classList.add('d-none')
    }

    const cardsSection = document.getElementById('cards-container')
    cardsSection.innerHTML = '';
    data.forEach(card => {

        cardsSection.innerHTML += `
        <div class="col">
        <div class="card h-100 p-2 shadow">
            <img src="${card.image}" class="card-img-top img-fluid h-100" alt="">
            <div class="card-body">

                <h5 class="card-title">Features</h5>
                <ol class="list-group p-3">${card.features.map(feature => `<li>${feature}</li>`).join('')}</ol>

                <hr>

                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title">${card.name}</h5>
                        <div class="d-flex gap-2 align-items-center">
                            <img src="Vector.png"</img>
                            <p class="card-text">${card.published_in}</p>
                        </div>
                    </div>

                    <div onclick ="apiDetailsDataLoad('${card.id}')" style="width: 50px;" data-bs-toggle="modal" data-bs-target="#detailsModal"><img src="deatils-icon.png"</img></div>

                </div>
            </div>
        </div>
    </div>
        `
    });

    Spinner(false)
}








