// all Cards api load function :

const apiDataLoad = loadData => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    fetch(url)
    .then(res => res.json())
    .then(data => displayApiDataLoad(data.data.tools, loadData))

}
