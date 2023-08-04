var card = JSON.parse(localStorage.getItem("card"))
var cartCount = document.getElementById("cant-prod-carr")
var cartContainer = document.querySelector(".cont-cart")
var total = document.getElementById("total")
cartCount.textContent = card.length


function renderCart(){
    cartContainer.innerHTML = "" //se borraron todos los productos y se borraron los eventos
    var totalCompra = 0
    card.forEach(function(producto){
      totalCompra+=producto.price * producto.quantity
        cartContainer.innerHTML +=`
        <div class="cart-item">
                  <div class="row">
                    <div class="col-md-2">
                      <img src="${producto.image}" alt="Imagen del producto" class="img-fluid">
                    </div>
                    <div class="col-md-8">
                      <h3>${producto.name}</h3>
                      <p>Precio: ${producto.price}</p>
                      <p>Cantidad:<button class="btn-quantity" id="btn-restar-quantity-${producto.id}">-</button> ${producto.quantity} <button class="btn-quantity" id="btn-sumar-quantity-${producto.id}">+</button></p>
                    </div>
                    <div class="col-md-2">
                      <button class="btn btn-danger remove-btn" id="btn-delete-${producto.id}">Eliminar</button>
                    </div>
                  </div>
                </div>
        `
    })
    localStorage.setItem("total",totalCompra)
    total.textContent = "Total: $"+totalCompra.toFixed(1)
    addbtnEvents()
}
function addbtnEvents(){
    card.forEach(function(producto){
      //borrar los prod. del carrito
        var btnDelete = document.getElementById("btn-delete-"+producto.id)
        btnDelete.addEventListener("click",function(){
            card = card.filter(function(pr){
                return pr.id !== producto.id
            })
            localStorage.setItem("card",JSON.stringify(card))
            cartCount.textContent = card.length
            renderCart() //se borran los eventos
      })
        //agregar cantidad de productos
         var restar = document.getElementById("btn-restar-quantity-"+producto.id)
         restar.addEventListener("click",function(){
          if(producto.quantity > 1){
            producto.quantity = producto.quantity - 1
            renderCart()
          }
         
      })

          var sumar = document.getElementById("btn-sumar-quantity-"+producto.id)
          sumar.addEventListener("click",function(){
          producto.quantity = producto.quantity + 1
          renderCart()
      })

        })

}
renderCart()

