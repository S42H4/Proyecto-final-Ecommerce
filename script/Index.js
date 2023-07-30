fetch("https://648795c6beba62972790d44d.mockapi.io/api/products/products")
.then(function(data){
    data.json().then(function(productos){
     //todo nuestro codigo aqui 

//DOM     
     var contenedor = document.querySelector(".products")
     var filterMayorMenor = document.getElementById("filter-mayor-menor")
     var filterMenorMayor = document.getElementById("filter-menor-mayor")

     var inputSearch = document.getElementById("input-search")
     var btnSearch = document.getElementById ("btn-search")
     var title = document.getElementById("title-page")
     var filter_A_Z = document.getElementById("A-Z")
     var filter_Z_A = document.getElementById("Z-A")

//copiando el producto
var productsCopy = [...productos]
var filtered = []
//VARIABLE DEL INDICE
var indice = 0
var allProducts = createPagination(productos)



//primer render
renderProducts(allProducts)
renderPagination(allProducts)
actualizarPagIndice()


//NUEVA FUNCION DE PAGINACION
function renderPagination(products){
 //DOM DE PAGINACION
  var pagination = document.querySelector(".pagination")

  pagination.innerHTML = ""
 //PAGINACION
 pagination.innerHTML += ` <li class="page-item"><button class="page-item" id="btn-prev">Anterior</button></li>`
 for(var i=0;i<products.length;i++){
   pagination.innerHTML +=`  <li class="page-item "><a class="page-item" href="#">${i +1}</a></li>`
 }
 pagination.innerHTML +=`<li class="page-item" ><button class="page-item" id="btn-next">Siguiente</button></li>`
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
    if(li.textContent == indice + 1){
      li.classList.add("active")
    }else{
      li.classList.remove("active")
    }
  })
}


//FUNCION DE PRODUCTOS
function renderProducts(products){
  //limpiando el contenedor
  contenedor.innerHTML = ""
  //creando productos
  products[indice].forEach(function(producto,index){
    contenedor.innerHTML += `
    <div class="card" style="width: 18rem;" id="card-producto-${index}">
    <img src="${producto.image}" class="card-img-top" alt="product">
    <div class="card-body">
      <h5 class="card-title">${producto.name}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">$${producto.price}</h6>
      <p class="card-text">${producto.description}
    </p>
      <button class=" btn-cart">Añadir al carrito</button>
    </div>
  </div>
    `
   
})

products[indice].forEach(function(producto,index){
 document.getElementById("card-producto-1"+index).addEventListener("click",function(){
  localStorage.setItem("selected-product",JSON.stringify(producto))
  window.location.href = "producto-detalle.html"
 })
})
}

function filterProducts(products,filter){
   indice = 0
   var sortedPag;
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
   case "A-Z":
      products.sort(function(a,b){
        products.sort(function(a,b){
          if(a.title > b.title){
            return 1;
          }else{
            return -1
          }
          return 0;
         })
      return a.price - b.price
      })
      break;
   case "Z-A":
        products.sort(function(a,b){
          products.sort(function(a,b){
            if(a.title > b.title){
              return -1;
            }else{
              return 1
            }
            return 0;
           })
        return a.price - b.price
        })
    break;

    default:
      break;
}
sortedPag = createPagination(products)
   renderProducts(sortedPag)
   renderPagination(sortedPag)
   actualizarPagIndice()
}

//FUNCIONES  
 
function nextPage(products){
  if(indice <products.length-1){
    indice++
    actualizarPagIndice()
    renderProducts(products)
  }
}

function prevPage(products){
  if(indice > 0){
  indice--
  actualizarPagIndice()
  renderProducts(products)
  }
}


//EVENTOS
btnSearch.addEventListener("click",function(evento){
  evento.preventDefault()
 filtered = productsCopy.filter(function(producto){
     return producto.title.includes(inputSearch.value)
})
indice = 0
var paginationFiltered = crearPaginacion(filtered)
    renderFilteredProducts(paginationFiltered)
    renderPagination(paginationFiltered)
    actualizarPagIndice()
    title.textContent = "resultados de tu busqueda <3"
})

filterMayorMenor.addEventListener("click",function(){
  var isSearching = title.textContent === "resultados de tu busqueda <3"
  var products = inSearching ? filtered :productsCopy
  filterProducts(products,"mayor-menor")
})

filterMenorMayor.addEventListener("click",function(){
  var isSearching = title.textContent === "resultados de tu busqueda <3"
  var products = inSearching ? filtered :productsCopy
  filterProducts(products,"menor-mayor")
})

filter_A_Z.addEventListener("click",function(){
  var isSearching = title.textContent === "resultados de tu busqueda <3"
  var products = inSearching ? filtered :productsCopy
  filterProducts(products,"A-Z")
})
filter_Z_A.addEventListener("click",function(){
  var isSearching = title.textContent === "resultados de tu busqueda <3"
  var products = inSearching ? filtered :productsCopy
  filterProducts(products,"Z-A")
})

})
 })



//<div class="dropdown">
         // <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
         //   Nombre
         // </button>
         // <ul class="dropdown-menu">
         //   <li class="dropdown-item" id="A-Z">A-Z</li>
          //  <li class="dropdown-item" id="Z-A">Z-A</li>
        //  </ul>
 //       </div>

