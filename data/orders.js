import { cart, loadCarts } from "./cart.js"
import { getProduct, products, loadProductsFetch } from "./products.js"
import { getDeliveryOption } from "./deliveryOptions.js"
import { calculateCartQuantity } from "./cart.js"
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


export const orders = JSON.parse(localStorage.getItem('orders')) || []
export function addOrder(order){
    orders.unshift(order)
    saveToStorage()
    console.log(orders)
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders))
}

console.log(products)

let orderSummary = ''

cart.forEach((cartItem)=>{
        const productId = cartItem.productId;
        let matchingProduct = getProduct(productId)
        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId)
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDate, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D' )
        const todayString = today.format('dddd, D')
    console.log(productId)
    console.log(matchingProduct)

    
    
    

        orderSummary += `
            
            <div class="product-image-container">
            <img src="">
            </div>

            <div class="product-details">
                <div class="product-name">
                Black and Gray Athletic Cotton Socks - 6 Pairs
                </div>
                <div class="product-delivery-date">
                Arriving on: August 15
                </div>
                <div class="product-quantity">
                Quantity: 1
                </div>
                <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html">
                <button class="track-package-button button-secondary">
                    Track package
                </button>
                </a>
            </div>

            
        `
})

// document.querySelector('.js-order-details-grid').innerHTML = orderSummary

