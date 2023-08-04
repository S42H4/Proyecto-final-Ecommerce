var totalCompra = Number(localStorage.getItem("total")) 
var numTarjeta = document.getElementById("card-number")
var btnPagar = document.getElementById("btn-pagar")
var errorNumTarjeta = document.getElementById("eror-num-tarjeta")


var total = document.getElementById("total")
total.textContent+= totalCompra.toFixed(1)

btnPagar.addEventListener("click",function(event){
 event.preventDefault()
 var value = numTarjeta.value
 var anyError = false
  for(var i =0;i< value.length;i++){
    var caracter = Number(value[i]) +""

    if(caracter === "NaN"){
        anyError = true
     errorNumTarjeta.style.display = "block"
    }
  }

 if(anyError === false){
  window.location.href = "./fin-de-pago.html"
}

})

numTarjeta.addEventListener("focus",function(){
    errorNumTarjeta.style.display = "none"
})