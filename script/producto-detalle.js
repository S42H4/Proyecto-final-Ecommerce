//detener el producto seleccionado a travez de local storage
var producto = JSON.parse(localStorage.getItem("selected-product"))

//DOM
var img = document.getElementById("product-img")
var title = document.getElementById("title")
var price = document.getElementById("price")
var description = document.getElementById("description")
var comentarioInput = document.getElementById("comment")
var btnReseña = document.getElementById("btn-reseña")
var rating = document.getElementById("rating")
var reviewsContainer = document.getElementById("reviews-container")

var selectedStar=0
//mostrar en pagina
img.src = producto.image
title.textContent = producto.title
price.textContent = producto.price
description.textContent = producto.description

rating.addEventListener("change",function(event){
 selectedStar = event.target.selectedIndex
})


btnReseña.addEventListener("click",function(event){
    event.preventDefault()
 reviewsContainer.innerHTML += `
 <div class="user-review">
 <p class="review-comment">
${comentarioInput.value}
 </p>
 <div class="review-rating">
 ${addStars()}
 </div>
 <p class="review-date">Fecha de la reseña: 01/06/2023</p>
 <p class="review-user">Usuario: Juan Pérez</p>
</div>
 `
})

function addStars(){
    var str = ""
    for(var i=0;i<=selectedStar;i++){
       str+='<span class="star">&#9733;</span>'
    }
    return str
}