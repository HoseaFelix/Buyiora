import { renderOrderSummary } from "../checkout/orderSummary.js";
import { renderPaymentSummary } from "../checkout/paymentSummary.js";

renderOrderSummary()
renderPaymentSummary()
document.querySelector('.js-place-order').addEventListener('click', ()=>{
    document.querySelector('.payment-box').classList.add('paying')
    console.log('working')
    console.log(document.querySelector('.payment-box'))
    
})
document.querySelector('.submitOrder').addEventListener('click', ()=>{
    document.querySelector('.payment-box').classList.remove('paying')
  
    
})