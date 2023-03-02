const loadAiData = () => {
    const URL = ('https://openapi.programming-hero.com/api/ai/tools')
    fetch(URL)
    .then((res) => res.json())
    .then((data) => displayAiData(data.data.tools))
}

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
        console.log(data);
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
                        <h6 class="fs-3 text-danger"><i class="fa-solid fa-circle-arrow-right"></i></h6>
                    </div>
                </div>
              </div>
            </div>
        `
        detailsContainer.appendChild(detailsDiv);
    })
}

document.getElementById('show-more').addEventListener('click', function(){
    ;
})

loadAiData();