const loadAiData = () => {
    const URL = ('https://openapi.programming-hero.com/api/ai/tools')
    fetch(URL)
    .then((res) => res.json())
    .then((data) => displayAiData(data.data.tools))
}

document.getElementById('show-more').addEventListener('click', function(){
    loadAiData();
})

const displayAiData = (datas) => {
    const detailsContainer = document.getElementById('details-container');

    // show more section
    const showMorebutton = document.getElementById('show-more-btn');
    if(datas.length > 6){
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
    const modalTitle = document.getElementById('modal-description');
    modalTitle.innerText = data.description
    

    const features = document.getElementById('Featurs');
    features.innerText = data.features[1].feature_name;

    const features1 = document.getElementById('Featurs1');
    features1.innerText = data.features[2].feature_name;

    const features2 = document.getElementById('Featurs2');
    features2.innerText = data.features[3].feature_name;

    const priceContainer = document.getElementById('price1');
    priceContainer.innerHTML = `
    <p>${data.pricing[0].price}<br>${data.pricing[0].plan}</p>
    `
    const priceContainer1 = document.getElementById('price2');
    priceContainer1.innerHTML = `
    <p>${data.pricing[1].price}<br>${data.pricing[1].plan}</p>
    `
    const priceContainer2 = document.getElementById('contact');
    priceContainer2.innerHTML = `
    <p>${data.pricing[2].price}<br>${data.pricing[2].plan}</p>
    `

    const Integration = document.getElementById('Integration');
    Integration.innerText = data.integrations[0];

    const Integration1 = document.getElementById('Integration1');
    Integration1.innerText = data.integrations[1];

    const Integration2 = document.getElementById('Integration2');
    Integration2.innerText = data.integrations[2];

    const modalImg = document.getElementById('modal-img');
    modalImg.innerHTML = '';
    const modalImgContainer = document.createElement('div');
    modalImgContainer.innerHTML = `
    <div class="card">
            <img src="${data.image_link[0]}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h4 class="card-text text-center">${data.input_output_examples[0].input}</h4>
            <p class="text-muted text-center">${data.input_output_examples[0].output}</p>
        </div>
    </div>
    `
    modalImg.appendChild(modalImgContainer);

}
loadAiData();

//style="width: 18rem;