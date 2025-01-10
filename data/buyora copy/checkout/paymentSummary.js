import { cart } from "../data/cart.js";
import { getProducts } from "../data/products.js";
import { getDeliveryOption } from "./deliveryOptions.js";
import { formatCurrency } from "../utils/formatCurrency.js";




export function renderPaymentSummary(){

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
    const orderTotal = totalBeforeTax + Tax


    let html = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${totalItems}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(Tax)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
        </div>
       
        <button class="place-order-button button-primary js-place-order">
            Place your order
        </button>
        
    
    `
    document.querySelector('.js-payment-summary').innerHTML = html

    return orderTotal

}


