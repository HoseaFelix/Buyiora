import { products, getProducts } from "./products.js";
import { cart } from "./cart.js";
import { getDeliveryOption } from "../checkout/deliveryOptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { calculateCartQuantity } from "./cart.js";
// import { renderPaymentSummary } from "../checkout/paymentSummary.js";
import { formatCurrency } from "../utils/formatCurrency.js";


function renderPaidOrderSummary(){


let cartQuantity = calculateCartQuantity()
let orderSummary = ''

cart.forEach((cartItem)=>{
    const productId = cartItem.productId
    const product = getProducts(productId)

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId)
    
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDate, 'days');
    const dateString = deliveryDate.format(' MMMM D' )
    const dateString2 = deliveryDate.format('dddd, MMMM D' )
    const todayString = today.format('MMMM, D')
    let productPriceCents = 0
    let shippingPriceCents = 0
    let totalItems = 0


    cart.forEach((cartItem)=>{
        const product = getProducts(cartItem.productId)
        productPriceCents += product.priceCents * cartItem.Quantity;
        totalItems += cartItem.Quantity

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
        shippingPriceCents += deliveryOption.shippingPriceCents;

    })

    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const Tax = totalBeforeTax * 0.1
    const orderTotal = formatCurrency(totalBeforeTax + Tax)


    document.querySelector('.js-order-date').innerHTML = `${todayString}`

    orderSummary += `
    
        
            <div class="product-image-container">
            <img src="${product.image}">
        </div>

        <div class="product-details">
            <div class="product-name">
            ${product.name}
            </div>
            <div class="product-delivery-date">
            Arriving on: ${dateString}
            </div>
            <div class="product-quantity">
            Quantity: ${cartItem.Quantity}
            </div>
            <a href="buyora.html">
            <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
            </button>
            </a>
        </div>

        <div class="product-actions">
            <a href="tracking.html?orderId=${productId}&deliveryDate=${dateString2}">
            <button class="track-package-button button-secondary">
                Track package
            </button>
            </a>
        </div>

       
    
    `

    document.querySelector('.js-order-total-price').innerHTML =`$${orderTotal}` 
})
document.querySelector('.js-order-details').innerHTML = orderSummary
document.querySelector('.js-cart-quantity').innerHTML = cartQuantity


}
renderPaidOrderSummary()