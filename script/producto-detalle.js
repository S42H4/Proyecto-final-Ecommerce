//detener el producto seleccionado a travez de local storage
var producto = JSON.parse(localStorage.getItem("selected-product"))

//DOM
var img = document.getElementById("product-img")
var title = document.getElementById("title")
var price = document.getElementById("price")
var description = document.getElementById("description")

img.src = producto.image
title.textContent = producto.title
price.textContent = producto.price
description.textContent = producto.description