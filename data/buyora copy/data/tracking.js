import { products,getProducts } from "./products.js"
import { cart } from "./cart.js"



const url = new URL(window.location.href)
const productId = url.searchParams.get('orderId')
const deliveryDate = url.searchParams.get('deliveryDate')
console.log(productId)
console.log(deliveryDate)

let matchingProduct = getProducts(productId)
console.log(matchingProduct)

let product;
cart.forEach((cartItem)=>{
    if(productId=== cartItem.productId){
        product = cartItem
    }
})

let trackItem = `
    
        <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
        </a>

        <div class="delivery-date"> Arriving on
        ${deliveryDate}
        </div>

        <div class="product-info js-product-info">
        ${matchingProduct.name}
        </div>

        <div class="product-info js-quantity">
        Quantity: ${product.Quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
        <div class="progress-label">
        Preparing
        </div>
        <div class="progress-label current-status">
        Shipped
        </div>
        <div class="progress-label">
        Delivered
        </div>
        </div>

        <div class="progress-bar-container">
        <div class="progress-bar"></div>
        </div>

`

document.querySelector('.js-order-tracking').innerHTML = trackItem