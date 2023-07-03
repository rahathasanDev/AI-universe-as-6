
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

                    <div onclick ="apiDetailsDataLoad('${card.id}')" style="width: 50px;" data-bs-toggle="modal" data-bs-target="#detailsModal"><img src="https://spiffy-babka-2c6ac4.netlify.app/deatils-icon.png"</img></div>

                </div>
            </div>
        </div>
    </div>
        `
    });

    Spinner(false)
}

// spinner function

const Spinner = loading => {
    const spinnerSection = document.getElementById('spinner');
    if (loading) {
        spinnerSection.classList.add('d-none')
    }
}




// details button api load function

const apiDetailsDataLoad =(id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayApiDetailsDataLoad(data.data))

}
//  details button api data display function

const displayApiDetailsDataLoad = (modalData) => {
   
    const featuresValues = Object.values(modalData.features)
    let featuresArray = []
    for (const featuresValue of featuresValues) {
        featuresArray.push(featuresValue.feature_name)
    }
    const accuracyString = "% Accuracy";
    const { description, pricing, image_link, input_output_examples, accuracy, integrations } = modalData
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col">
        <div class="card bg-danger bg-gradient shadow h-100">
            <div class="card-body p-3 text-white">
                <h5 class="card-title">${description ? description : 'HEllo bro'}</h5>
                <div class="d-flex justify-content-around text-black gap-2 fw-semibold text-center my-5">
                    <div class="bg-light rounded p-lg-2"><span>${pricing ? pricing[0].price : 'Free of Cost'} <br> ${pricing ? pricing[0].plan : 'Basic'}</span></div>
                    <div class="bg-light rounded p-lg-2"><span>${pricing ? pricing[1].price : 'Free of Cost'} <br> ${pricing ? pricing[1].plan : 'Pro'}</span></div>
                    <div class="bg-light rounded p-lg-2"><span>${pricing ? pricing[2].price : 'Free of Cost'} <br> ${pricing ? pricing[2].plan : 'Enterprise'}</span></div>
                </div>

                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="card-title">Features</h5>
                        <ul>${featuresArray.map(list => `<li>${list}</li>`).join('')}</ul>
                    </div>
                    <div>
                        <h5 class="card-title">Integrations</h5>
                        <ul>${integrations ? integrations.map(list => `<li>${list}</li>`).join('') : 'No data Found'}</ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col">
        <div class="card text-center shadow h-100 ">
            <div><span class="badge text-bg-danger w-30 p-2 position-absolute end-0">${accuracy.score ? accuracy.score * 100 + accuracyString : ''}</span>
            <img src="${image_link[0]}" class="card-img-top" alt=""></div>
            <div class="card-body my-5">
                <h5 class="card-title">${input_output_examples ? input_output_examples[0].input : 'Can you give any example?'}</h5>
                <p class="card-text">${input_output_examples ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
            </div>
        </div>
    </div>
</div>
    `
};

const showMoreButton = document.getElementById('btn-show-more');
showMoreButton.addEventListener('click', function () {
    showAllFunction()
})

//show more button function
const showAllFunction = (dataLimit = 6) => {
    apiDataLoad(dataLimit)
    sortByDate(dataLimit)
}


// sort by date function
const sortByDate = async (dataLimit) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(url);
    const data = await res.json();
    const sortData = data.data.tools.sort(function (a, b) {
        return new Date(a.published_in) - new Date(b.published_in)
    });
    displayApiDataLoad(sortData, dataLimit)
}

