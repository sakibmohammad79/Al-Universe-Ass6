const loadAiData = () => {
    const URL = ('https://openapi.programming-hero.com/api/ai/tools')
    fetch(URL)
    .then((res) => res.json())
    .then((data) => displayAiData(data.data.tools))
}

const displayAiData = (datas) => {
    const detailsContainer = document.getElementById('details-container');
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
                  <small class="text-muted">Last updated 3 mins ago</small>
                </div>
              </div>
        `
        detailsContainer.appendChild(detailsDiv);
    })
}

loadAiData();