const loadAiData = () => {
    const URL = ('https://openapi.programming-hero.com/api/ai/tools')
    fetch(URL)
    .then((res) => res.json())
    .then((data) => displayAiData(data.data.tools))
}

const displayAiData = (datas) => {
    datas.forEach(data => {
        //console.log(data);
    })
}

loadAiData();