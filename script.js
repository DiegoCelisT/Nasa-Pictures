function createCardElement (){

//Vamos criar os elementos de um novo card:

let card_el = document.createElement ("article")
let img_el = document.createElement ("img")
let card_body_el = document.createElement ("div")
let card_title_el = document.createElement ("h3")
let card_description_el = document.createElement ("p")

//Agora vamos a relocalizar esses elementos:

//dentro do article (card_el) têm uma imagem (img_el) e um div (card_body_el):
card_el.appendChild (img_el)
card_el.appendChild (card_body_el)

//dentro do div (card_body_el) têm um título (card_title) e um parágrafo (card_description):
card_body_el.appendChild (card_title_el)
card_body_el.appendChild (card_description_el)

//Esses items estão vazios, agora vamos preenchê-los:
img_el.src = "https://apod.nasa.gov/apod/image/0606/LagoonTrifid_mazlinmisti_f.jpg"
img_el.alt = "texto que chegará da API"

card_title_el.textContent = "Imagem Super Duper Mega Bacana"
card_description_el.textContent = "texto texto texto"

//Além disso a gente precisa adicionar aquelas clases de bootstrap que a gente colocou em cada article, div, h3 e p:
card_el.classList.add ("card", "mb-2", "mx-2") //Empreste atenção na sintaxe, separada com virgulas e usando aquele classList.add

img_el.classList.add ("card-img-top")
card_body_el.classList.add ("card-body")
card_title_el.classList.add ("card-title")
card_description_el.classList.add ("card-text")

card_el.style="width: 18rem" //PARA MODIFICAR DESDE O JS, SEM USAR CSS E QUE FIQUE COM AQUELE ESTILO, MAIS PEQUENINHO

//A gente precisa que a função retorne algo, por enquanto vai ser isso:
return card_el;

}