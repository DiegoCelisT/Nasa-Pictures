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
    return createCard ("Carregando...", "...") //Como não tem url nem description ela vai entrar no else da função createImage
}