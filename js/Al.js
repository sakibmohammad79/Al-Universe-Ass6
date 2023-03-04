const loadAiData = (limit) => {
    const URL = ('https://openapi.programming-hero.com/api/ai/tools')
    fetch(URL)
    .then((res) => res.json())
    .then((data) =>{
        displayAiData(data.data.tools, limit);
    })
}

const displayAiData = (datas, limit) => {
    //console.log(datas);
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
                  <p class="card-text">1. ${data.features[0] ? data.features[0] : 'No Features Found'}</p>
                  <p class="card-text">2. ${data.features[1] ? data.features[1] : 'No Features Found'}</p>
                  <p class="card-text">3. ${data.features[2] ? data.features[2] : 'No Features Found'}</p>
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
                    <p>${data.pricing ? data.pricing[0].price : 'Free of cost'}<br>${data.pricing ? data.pricing[0].plan : 'Basic'}</p>
                </div>
                    <div class="bg-white p-2 rounded-3">
                    <p>${data.pricing ? data.pricing[1].price : 'Free of cost'}<br>${data.pricing ? data.pricing[1].plan : 'Pro'}</p>
                </div>
                <div class="bg-white p-2 rounded-3">
                    <p>${data.pricing ? data.pricing[2].price : 'Free of cost'}<br>${data.pricing ? data.pricing[2].plan : 'Enterprise'}</p>
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <div>
                    <h5>Features</h5>
                    <ul>
                        <li>${data.features? data.features[1].feature_name : 'No Data Found'}</li>
                        <li>${data.features? data.features[2].feature_name : 'No Data Found'}</li>
                        <li>${data.features? data.features[3].feature_name : 'No Data Found'}</li>
                    </ul>
                </div
                <div>
                    <div>
                    <h5>integrations</h5>
                    <ul>
                        <li>${data.integrations || data.integrations === 'null' ? data.integrations[0] || 'Data not found' : 'Data not Found'}</li>
                        <li>${data.integrations || data.integrations === 'null' ? data.integrations[1] || 'Data not found' : 'Data not Found'}</li>
                        <li>${data.integrations || data.integrations === 'null' ? data.integrations[2] || 'Data not found' : 'Data not Found'}</li>
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
        <div id="cross">
            <i class="fs-1 text-danger fa-sharp fa-solid fa-circle-xmark" data-bs-dismiss="modal"></i>
        </div>
            <img src="${data.image_link ? data.image_link[0] : 'image not found'}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h4 class="card-text text-center">${data.input_output_examples ? data.input_output_examples[0].input: 'No data found'}</h4>
            <p class="text-muted text-center">${data.input_output_examples ? data.input_output_examples[0].output: 'No data found'}</p>
        </div>
    </div>
    `
    modalImg.appendChild(modalImgContainer);
    const badgeContainer =  document.getElementById('badges');
    //console.log(data.accuracy.score);
    if(data.accuracy.score !== null){
        badgeContainer.classList.remove('d-none')
    }
    else{
        badgeContainer.classList.add('d-none');
    }
    const badgeContainers =  document.getElementById('badge');
    badgeContainers.innerText = data.accuracy.score*100;

}

let sortDataload = () =>{
    const URL = ('https://openapi.programming-hero.com/api/ai/tools')
        fetch(URL)
        .then((res) => res.json())
        .then((data) =>{
            showData(data.data.tools);
            
        })

        const showData =(datas) => {
            const arrayDate = [];
            for(const data of datas){
                const myData = data.published_in;
                const sorted = Date.parse(myData);
                arrayDate.push(sorted);
            }
            const sortedDate = arrayDate.sort();
    
            document.getElementById('sort-btn').addEventListener('click', function(){
                displayAiData(sortedDate);
                console.log(sortedDate);
            })
    }
}
        
        
document.getElementById('show-more').addEventListener('click', function(){
    loadAiData();
})

loadAiData(6);

