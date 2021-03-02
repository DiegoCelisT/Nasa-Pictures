function createCard (title, description, image_url, image_description){

//Vamos criar os elementos de um novo card:

let card_el = document.createElement ("article")
let image_el = createImage (image_url, image_description) //Modifiquei para trazer a imagem e a descrição (alt), sendo um elemento "especial" de imagem
let card_body_el = document.createElement ("div")
let card_title_el = document.createElement ("h3")
let card_description_el = document.createElement ("p")

//Agora vamos a relocalizar esses elementos:

//dentro do article (card_el) têm uma imagem (image_el) e um div (card_body_el):
card_el.appendChild (image_el)
card_el.appendChild (card_body_el)

//dentro do div (card_body_el) têm um título (card_title) e um parágrafo (card_description):
card_body_el.appendChild (card_title_el)
card_body_el.appendChild (card_description_el)


//Esses items estão vazios, agora vamos preenchê-los:
card_title_el.textContent = title
card_description_el.textContent = description
//A imagem será preenchida com uma função especial, embaixo, fora desta function

//Além disso a gente precisa adicionar aquelas clases de bootstrap que a gente colocou em cada article, div, h3 e p:
card_el.classList.add ("card", "mb-2", "mx-2") //Empreste atenção na sintaxe, separada com virgulas e usando aquele classList.add

image_el.classList.add ("card-img-top")
card_body_el.classList.add ("card-body")
card_title_el.classList.add ("card-title")
card_description_el.classList.add ("card-text")

card_el.style="width: 18rem" //PARA MODIFICAR DESDE O JS, SEM USAR CSS E QUE FIQUE COM AQUELE ESTILO, MAIS PEQUENINHO

//A gente precisa que a função retorne algo, por enquanto vai ser isso:
return card_el;

}

//função especial para a imagem:
function createImage (url, description){
    let el
    if (url && description){
        el = document.createElement ("img")
        el.src = url
        el.alt = description
    }
    else { //Aqui caso não receba nada vai botar um cuadrado cinza, de uma classe do CSS
        el = document.createElement ("div")
        el.classList.add ("image-sample")
    }
    return el
}

//Card quando não chega a requisição:
function createSampleCard (){
    return createCard ("Loading...", "Loading...") //Como não tem url nem description ela vai entrar no else da função createImage
}


//PRIMEIRA VERSÃO SEM FUNÇÕES ASSINCRONAS
// const API_URL = "https://api.nasa.gov/planetary/apod"
// const API_KEY = "123"
// const request_url = `${API_URL}?api_key=${API_KEY}&count=10`

// fetch (request_url)
// .then (function (resposta) { //esse then vai retornar só a primeira promessa
//     if (resposta.ok){
//     return resposta.json() 
//     } else {
//         throw new Error ("Ocorreu um erro na requisição")
//     }
// })
// .then (function (data) {      //com esse then agora sim vou receber meus dados
//     console.log (data)
// })
// .catch (function (erro){   //Para os erros também
//     console.log (erro)
// })


//VERSÃO COM FUNÇÕES ASSINCRONAS:

class ApiConnection {
    constructor() {
        this.API_URL = "https://api.nasa.gov/planetary/apod"
        this.API_KEY = "clg0QI1qIlCPdG2jqi1RPQ2eEhh4fl5fuqCQNxiA"
     }
    async getRandomImages(count) {
        const request_url = this.API_URL + "?api_key=" + this.API_KEY + "&count=" + count

        const resposta = await fetch(request_url)
        if (resposta.ok) {
            return await resposta.json()
        }
        throw new Error("Error fetching API, status: " + resposta.status)
    }
    async getImagesForDataRange(start_date,
        end_date) {
        let request_url = this.API_URL + "?api_key=" + this.API_KEY
        if (end_date) {
            request_url += "&start_date=" + start_date + "&end_date=" + end_date
        } else {
            request_url += "&start_date=" + start_date
        }

        const resposta = await fetch(request_url)
        if (resposta.ok) {
            return await resposta.json()
        }
        throw new Error("Error fetching API, status: " + resposta.json())
    }
}

    

//Agora o evento para mostrar resultados
document.addEventListener ("DOMContentLoaded", function startApp(){
    const search_results_el = document.getElementById ("search-results")
    const api_connection = new ApiConnection()
    
    for (let i=0; i<12; i++){ //Legal deixar isso para quando demore um poquinho em recarregar
        search_results_el.appendChild(createSampleCard ())
    }
    
        // preventDefault()
        let valor_selecionado = document.querySelector ("#random_qty");
        let valor_random = valor_selecionado.value;
        
    api_connection.getRandomImages (valor_random)
    .then(results => {
        search_results_el.innerHTML =""
        results.forEach (result => {
            search_results_el.appendChild(
            createCard(result.title,
                       truncateText(result.explanation, 300),
                       result.url,
                       result.title)
            )
        })
    })
})


//Quando se faz o SUBMBIT
function Selecionando_valor (event){
    event.preventDefault()
    const search_results_el = document.getElementById ("search-results")
    const api_connection = new ApiConnection()
        
        
        let valor_selecionado = document.querySelector ("#random_qty");
        let valor_random = valor_selecionado.value;
        
        

    api_connection.getRandomImages (valor_random)
    .then(results => {
        search_results_el.innerHTML =""
        results.forEach (result => {
            search_results_el.appendChild(
            createCard(result.title,
                       truncateText(result.explanation, 200),
                       result.url,
                       result.title)
            )
        })
    })
}




// async getImagesForDataRange(start_date,
//         end_date) {
//         let request_url = this.API_URL + "?api_key=" + this.API_KEY
//         if (end_date) {
//             request_url += "&start_date=" + start_date + "&end_date=" + end_date
//         } else {
//             request_url += "&start_date=" + start_date
//         }








//Vamos cortar a descrição para que não fique tão grande:
function truncateText (text, max){
    if (text.length <max){
        return text
    }
    return text.slice (0, max) + " (...)"
}

//Vamos dar interatividade real ao seletor de opções:

document.addEventListener("DOMContentLoaded", function startApp() {
    const search_results_el = document.getElementById("search-results")
    const search_form_el = document.getElementById ("search-form")
    const search_type_option_els = document.querySelectorAll ("[name=search-type]")
    const api_connection = new ApiConnection ()

    // displayCardPlaceholders(search_results_el, results)
        
    // Api_connection
    //     .getRandomImages(15)
    //     .then((results) => displayResultsAsCards(search_results_el, results))
    //     .catch((err) => console.error(err))

    // search_form_el.addEventListener(
    //     "submit",
    //     function submitSearchAndLoadResults(event) {
    //         event.preventDefault()

    //         const form_data = new FormData (event.target)
    //         const search_type = form_data.get("search-type")
    //         const random_count = +form_data.get("random-qty")
    //         if (search_type === "random" && random_count) {
    //             // displayCardPlaceholders(
    //             //     search_results_el,
    //             //     random_count <= 15 ? random_count : 15
    //             // )
    //             api_connection
    //             .getRandomImages(random_count)
    //             .then((results) => displayResultsAsCards(search_results_el, results))
    //             .catch ((err) => console.error(err))
    //         }
    //     }
    // )

//Para habilitar e desabilitar os inputs:

let contador=1
let tipo_de_pesquisa=""
Array.from (search_type_option_els).forEach((opt_el) => {
    opt_el.addEventListener(
        "change",
        function changeEnabledSearchType(event) {
            document.querySelectorAll("[data-search-type-fieldset]").forEach(fs => {
                fs.disabled = event.target.value !== fs.dataset.searchTypeFieldset
            })
            
            contador=contador+1 //isso para definir qual o tipo de busca que a gente vai fazer
            
            if(contador%2 == 0){
                tipo_de_pesquisa = "date-range"
                console.log(tipo_de_pesquisa);
                
            }else{
                tipo_de_pesquisa = "random"
                console.log(tipo_de_pesquisa);
                
            }
        }
        
    )
})

})