const loadAiData = (limit) => {
    const URL = ('https://openapi.programming-hero.com/api/ai/tools')
    fetch(URL)
    .then((res) => res.json())
    .then((data) => displayAiData(data.data.tools, limit))
}

const displayAiData = (datas, limit) => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = '';

    // show more section
    const showMorebutton = document.getElementById('show-more-btn');
    if(datas.length > 6 && limit){
        datas = datas.slice(0, 6);
        showMorebutton.classList.remove('d-none');

    }
    else{
        showMorebutton.classList.add('d-none');
    }

    datas.forEach(data => {
        //console.log(data);
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('col');
        detailsDiv.innerHTML = `
        <div class="card h-100">
                <img src="${data ? data.image : 'No images'}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Features</h5>
                  <p class="card-text">1. ${data ? data.features[0] : 'No Features Found'}</p>
                  <p class="card-text">2. ${data ? data.features[1] : 'No Features Found'}</p>
                  <p class="card-text">3. ${data ? data.features[2] : 'No Features Found'}</p>
                </div>
                <div class="card-footer">
                    <h5 class="footer-title">${data ? data.name : 'No Name Found'}</h5>
                <div class="d-flex justify-content-between">
                    <div>
                        <small class="text-muted"><i class="fa-solid fa-calendar-days"></i> ${data ? data.published_in : "Date Not Found"}</small>
                    </div>
                    <div>
                        <h2 class="fs-3 text-danger"><i onclick="loadAiDetails('${data.id}')" class="fa-solid fa-circle-arrow-right" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></h2>
                    </div>
                </div>
              </div>
            </div>
        `
        detailsContainer.appendChild(detailsDiv);
    })
    // stop spinner loader
    toggleSpinner(false);
}


document.getElementById('show-more-btn').addEventListener('click', function(){
    toggleSpinner(true);
})

// spinner
const toggleSpinner = (isLoading) =>{
    const spinnerSection = document.getElementById('loading');
    if(isLoading){
        spinnerSection.classList.remove('d-none');
    }
    else{
        spinnerSection.classList.add('d-none');
    }
}

const loadAiDetails= async (id) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showAiDetails(data.data); 
}


const showAiDetails = (data) => {
    console.log(data);
    const modalContainers = document.getElementById('modal-details');
    modalContainers.innerHTML = '';
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = `
    <div class="card w-fluid bg-warning-subtle">
        <div class="card-body">
            <h5 class="card-text">${data? data.description : 'Description not found'}</h5>

            <div class="d-flex justify-content-between text-center gap-1 fw-bold">
                <div class="bg-white p-2 rounded-3">
                    <p>${data.pricing ? data.pricing[0].price : 'No price'}<br>${data.pricing ? data.pricing[0].plan : 'No plan'}</p>
                </div>
                    <div class="bg-white p-2 rounded-3">
                    <p>${data.pricing ? data.pricing[1].price : 'No price'}<br>${data.pricing ? data.pricing[1].plan : 'No plan'}</p>
                </div>
                <div class="bg-white p-2 rounded-3">
                    <p>${data.pricing ? data.pricing[2].price : 'No price'}<br>${data.pricing ? data.pricing[2].plan : 'No plan'}</p>
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <div>
                    <h5>Features</h5>
                    <ul>
                        <li>${data.features? data.features[1].feature_name : 'No Features'}</li>
                        <li>${data.features? data.features[2].feature_name : 'No Features'}</li>
                        <li>${data.features? data.features[3].feature_name : 'No Features'}</li>
                    </ul>
                </div
                <div>
                    <div>
                    <h5>integrations</h5>
                    <ul>
                        <li>${data ? data.integrations[0] : 'No integrations'}</li>
                        <li>${data ? data.integrations[1] : 'No integrations'}</li>
                        <li>${data ? data.integrations[2] : 'No integrations'}</li>
                    </ul>
                    </div>
                </div
            </div>
        </div>
    </div>
    `
    modalContainers.appendChild(modalDiv);  

    const modalImg = document.getElementById('modal-img');
    modalImg.innerHTML = '';
    const modalImgContainer = document.createElement('div');
    modalImgContainer.innerHTML = `
    <div class="card">
            <img src="${data ? data.image_link[0]: 'image not found'}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h4 class="card-text text-center">${data.input_output_examples[0]?data.input_output_examples[0].input: 'No data found'}</h4>
            <p class="text-muted text-center">${data.input_output_examples[0]?data.input_output_examples[0].output: 'No data found'}</p>
        </div>
    </div>
    `
    modalImg.appendChild(modalImgContainer);

}

document.getElementById('show-more').addEventListener('click', function(){
    loadAiData();
})
loadAiData(6);

//style="width: 18rem;

//const modalTitle = document.getElementById('modal-description');
    //modalTitle.innerText = data.description
// const features = document.getElementById('Featurs');
    // features.innerText = data.features ? data.features[1].feature_name : 'No data found';

    // const features1 = document.getElementById('Featurs1');
    // features1.innerText = data.features ? data.features[2].feature_name : 'No data found';

    // const features2 = document.getElementById('Featurs2');
    // features2.innerText = data.features ? data.features[3].feature_name : 'No data found';

    // const priceContainer = document.getElementById('price1');
    // priceContainer.innerHTML = `
    // <p>${data.pricing? data.pricing[0].price : 'No data found'}<br>${data.pricing?data.pricing[0].plan : 'No data found'}</p>
    // `
    // const priceContainer1 = document.getElementById('price2');
    // priceContainer1.innerHTML = `
    // <p>${data.pricing?data.pricing[1].price:'No data found'}<br>${data.pricing?data.pricing[1].plan:'No data found'}</p>
    // `
    // const priceContainer2 = document.getElementById('contact');
    // priceContainer2.innerHTML = `
    // <p>${data.pricing?data.pricing[2].price: 'No data found'}<br>${data.pricing?data.pricing[2].plan: 'No data found'}</p>
    // `

    // const Integration = document.getElementById('Integration');
    // Integration.innerText =data ? data.integrations[0]: 'No data found';

    // const Integration1 = document.getElementById('Integration1');
    // Integration1.innerText = data ? data.integrations[1]: 'No data found';

    // const Integration2 = document.getElementById('Integration2');
    // Integration2.innerText =data ? data.integrations[2]: 'No data found';