//estado de nuestra tienda
var state ={
  allProducts:[],
  productsToRender:[],//paginacion
  man:[],
  woman:[],
  child:[],
  card:[],
  index:0
 
}

if(localStorage.getItem("card")!== null){
    state.card = JSON.parse(localStorage.getItem("card"))
}

//DOM     
var contenedor = document.querySelector(".products")
var filterMayorMenor = document.getElementById("filter-mayor-menor")
var filterMenorMayor = document.getElementById("filter-menor-mayor")
var inputSearch = document.getElementById("input-search")
var btnSearch = document.getElementById ("btn-search")
var title = document.getElementById("title-page")
var filter_A_Z = document.getElementById("A-Z")
var filter_Z_A = document.getElementById("Z-A")
var categoryMan = document.getElementById("category-man")
var categoryWoman = document.getElementById("category-woman")
var categoryChild = document.getElementById("category-child")
var todo = document.getElementById("all-products")
var cartCount = document.getElementById("cant-prod-carr")

//si existen prod. en el carrito vamos a actualizar el contador de prod.
cartCount.textContent = state.card.length

fetch("https://648795c6beba62972790d44d.mockapi.io/api/products/products")
.then(function(data){
    data.json().then(function(productos){
//agregando la propiedad quantity a todos los productos 
    productos.forEach(function(producto){
      producto.quantity = 1
    })





     //categoria
state.allProducts = productos
state.man = productos.filter(function(product){
return product.category === "Hombre"
})
state.woman = productos.filter(function(product){
return product.category === "Mujer"
})
state.child = productos.filter(function(product){
  return product.category === "Niño"
})
     
//VARIABLE DEL INDICE

state.productsToRender = createPagination(state.allProducts)



//primer render
renderProducts()
renderPagination()
actualizarPagIndice()


//NUEVA FUNCION DE PAGINACION
function renderPagination(){
  var products = state.productsToRender
 //DOM DE PAGINACION
  var pagination = document.querySelector(".pagination")

  pagination.innerHTML = ""
 //PAGINACION
 pagination.innerHTML += ` <li class="page-item"><button class="page-link" id="btn-prev">Anterior</button></li>`
 for(var i=0;i<products.length;i++){
   pagination.innerHTML +=`  <li class="page-item "><a class="page-link" href="#">${i +1}</a></li>`
 }
 pagination.innerHTML +=`<li class="page-item" ><button class="page-link" id="btn-next">Siguiente</button></li>`
  //DOM DE BOTONES
 var btnNext = document.getElementById("btn-next")
 var btnPrev = document.getElementById("btn-prev")
//EVENTS
 btnNext.addEventListener("click",function(){
  nextPage(products)
 })
 btnPrev.addEventListener("click",function(){
  prevPage(products)
 })
}

//CREACION DE LA PAGINACION
function createPagination(products){
  var productsCopy = [...products]
  var allProducts = []
for(var i=0;i<productsCopy.length;i++){
    var pagina = productsCopy.splice(0,5)
    allProducts.push(pagina)
}
  return allProducts
}

//ACTUALIZACION DE PAG INDICE
function actualizarPagIndice(){
  var indices = document.querySelectorAll(".page-link")

  indices.forEach(function(li){
    if(li.textContent == state.index + 1){
      li.classList.add("active")
    }else{
      li.classList.remove("active")
    }
  })
}


//FUNCION DE PRODUCTOS
function renderProducts(){
  //limpiando el contenedor
  contenedor.innerHTML = ""
  //creando productos
  state.productsToRender[state.index].forEach(function(producto,index){
     var inCard = state.card.find(function(pr){
      return pr.id === producto.id
     })

    contenedor.innerHTML += `
    <div class="card" style="width: 18rem;" id="card-producto-${index}">
    <img src="${producto.image}" class="card-img-top" alt="product">
    <div class="card-body">
      <h5 class="card-title">${producto.name}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">$${producto.price}</h6>
      <p class="card-text">${producto.description}
    </p>
      <button class=" btn-cart ${inCard !== undefined ? "product-in-card":""}">
      ${inCard !== undefined ? "sacar del Carrito :(":"Añadir al carrito" }</button>
    </div>
  </div>
   `
   

    })

state.productsToRender[state.index].forEach(function(producto,index){
 var card = document.getElementById("card-producto-"+index)
var img = card.querySelector("img")
var button = card.querySelector("button")
//producto detalle
 img.addEventListener("click",function(){
  localStorage.setItem("selected-product",JSON.stringify(producto))
  window.location.href = "producto-detalle.html"
 })

button.addEventListener("click",function(){
  if(button.textContent === "Añadir al carrito"){
state.card.push(producto)
cartCount.textContent = state.card.length;
button.textContent = "sacar del Carrito :("
button.style.backgroundColor = "pink"

  }else{
    state.card = state.card.filter(function(pr){
      return pr.name !== producto.name
    })

cartCount.textContent = state.card.length;
button.textContent = "Añadir al carrito"
    button.style.backgroundColor = "#007bff"
  }

  localStorage.setItem("card",JSON.stringify(state.card))
})


})
}

//FUNCIONES  
 
function nextPage(products){
  if(state.index <products.length-1){
    state.index++
    actualizarPagIndice()
    renderProducts(products)
  }
}

function prevPage(products){
  if(state.index > 0){
  state.index--
  actualizarPagIndice()
  renderProducts(products)
  }
}

function filterProducts(filter){
   state.index = 0
   var sortedPag;
   var products = state.productsToRender.flat()
  switch (filter){
   case"mayor-menor":
    products.sort(function(a,b){
      return b.price - a.price
    })
   sortedPag = createPagination(products)
    break;
   case "menor-mayor":
      products.sort(function(a,b){
        return a.price - b.price
    })
    break;
   case "A-Z":
        products.sort(function(a,b){
          if(a.name > b.name){
            return 1;
          }else{
            return -1;
          }
          return 0;
         })
         
      break;
   case "Z-A":
          products.sort(function(a,b){
            if(a.name > b.name){
              return -1;
            }else{
              return 1;
            }
            return 0;
           })
        
    break;

   default:
    break;
   
}
state.productsToRender = createPagination(products)
   renderProducts()
   renderPagination()
   actualizarPagIndice()
}


//EVENTOS
btnSearch.addEventListener("click",function(evento){
  evento.preventDefault()
 var filtered = state.allProducts.filter(function(producto){
     return producto.name.includes(inputSearch.value)
})
state.index = 0
state.productsToRender= createPagination(filtered)
    renderProducts()
    renderPagination()
    actualizarPagIndice()
    title.textContent = "resultados de tu busqueda <3"
})

filterMayorMenor.addEventListener("click",function(){
  filterProducts("mayor-menor")
})

filterMenorMayor.addEventListener("click",function(){
  filterProducts("menor-mayor")
})

filter_A_Z.addEventListener("click",function(){
  filterProducts("A-Z")
})
filter_Z_A.addEventListener("click",function(){
  filterProducts("Z-A")
})

categoryMan.addEventListener("click",function(){
  state.productsToRender = createPagination(state.man)
  state.index=0
  renderProducts()
  renderPagination()
  actualizarPagIndice()
})

categoryWoman.addEventListener("click",function(){
  state.productsToRender = createPagination(state.woman)
  state.index=0
  renderProducts()
  renderPagination()
  actualizarPagIndice()
})

categoryChild.addEventListener("click",function(){
  state.productsToRender = createPagination(state.child)
  state.index=0
  renderProducts()
  renderPagination()
  actualizarPagIndice()
})

todo.addEventListener("click",function(){
  state.productsToRender = createPagination(state.allProducts)
  state.index=0
  renderProducts()
  renderPagination()
  actualizarPagIndice()
})
})
 })




