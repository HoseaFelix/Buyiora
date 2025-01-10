import{products} from "../data/products.js"
import { cart, removeFromcart, updateNewQuantity } from "../data/cart.js";
// import { updateCartQuantity } from "./amazon.js";
import { deliveryOptions } from "./deliveryOptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from "../utils/formatCurrency.js";
import { updateDeliveryOption } from "../data/cart.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { getDeliveryOption } from "./deliveryOptions.js";



function addDeliveryOptionEventListeners() {
    document.querySelectorAll('.js-delivery-option').forEach((options) => {
        options.addEventListener('click', (event) => {
            const deliverOptionId = options.dataset.deliveryOptionId;
            const productId = options.dataset.productId;
            

            if (!deliverOptionId || !productId) {
                console.error('Missing deliveryOptionId or productId in dataset');
            } else {
                updateDeliveryOption(deliverOptionId, productId);
                renderOrderSummary();
                renderPaymentSummary()
            }
        });
    });
}

export function renderOrderSummary(){



let checkoutHtml = ''

    let matchingItem; 

    

  
    cart.forEach((cartItem)=>{

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId)
    
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDate, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D' )
        const {productId} = cartItem
        
        products.forEach((product)=>{
            if(cartItem.productId === product.id){
                matchingItem = product
            }

        })
        

        checkoutHtml+=`
                <div class="cart-item-container js-cart-item-container-${productId}">
                <div class="delivery-date js-delivery-date">
                ${dateString}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingItem.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingItem.name}
                    </div>
                    <div class="product-price">
                    $${(matchingItem.priceCents/100).toFixed(2)}
                    </div>
                    <div class="cartItem-quantity js-product-quantity-${productId}">
                        <span class="quantity-label-${productId}">Quantity:${cartItem.Quantity}</span>
                        <input class="update-quantity-input-${productId} update-quantity-input" data-product-id="${productId}"></input>
                        <span class="update-quantity-link" data-product-id="${productId}">
                            Update
                        </span>
                        <span class="save-new-quantity" data-product-id="${productId}">Save</span>
                    
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    
                    ${deliveryOptionHtml(matchingItem, cartItem)}
                    
                </div>
                </div>
            </div>   
        `

        

    })
    function deliveryOptionHtml (matchingItem, cartItem){
        let Html = ''
        
        deliveryOptions.forEach((deliveryOption)=>{
            const today = dayjs()
            const deliverydate = today.add(deliveryOption.deliveryDate, 'days')
            const dateString = deliverydate.format(`dddd MMMM D`)
            const priceString = deliveryOption.shippingPriceCents === 0 ? 'FREE ' : formatCurrency(deliveryOption.shippingPriceCents)

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            
            Html +=`

                <div class="delivery-option js-delivery-option" data-delivery-option-id="${deliveryOption.id}" data-product-id="${matchingItem.id}">
                    <input type="radio" ${isChecked? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingItem.id}">
                    <div>
                        <div class="delivery-option-date">
                        ${dateString}
                        </div>
                        <div class="delivery-option-price">
                        ${priceString} - Shipping
                        </div>
                    </div>
                </div>
            
            `
           
            
        })
        
       
        return Html;

        
            
    }
    document.querySelector('.js-order-summary').innerHTML= checkoutHtml
    addDeliveryOptionEventListeners()

    //ANOTHER WAY OF ADDING THE EVENT LISTENER
    // document.querySelectorAll('.js-delivery-option').forEach((options)=>{
    //     options.addEventListener('click', ()=>{
    //         const deliverOptionId = options.dataset.deliveryOptionId; 
    //         const productId = options.dataset.productId;
            
            
    //         updateDeliveryOption(deliverOptionId, productId)
    //         renderOrderSummary()
            
            
    //     })
    // })

 document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click', ()=>{
        const{productId}= link.dataset;
        removeFromcart(productId);
        const container  = document.querySelector(`.js-cart-item-container-${productId}`)
        container.remove()
        updateQuantity()
        renderOrderSummary()
        renderPaymentSummary()

    })
})

function updateQuantity(){
    let totalQuantity = 0;
  
    cart.forEach((cartItem)=>{
      totalQuantity+= cartItem.Quantity;
      
    })
    document.querySelector('.js-header-middle-section').innerHTML = `Checkout (<a class="return-to-home-link"
    href="buyora.html">${totalQuantity} items</a>)`

    
  }
updateQuantity()

document.querySelectorAll('.update-quantity-link').forEach((updateLink) => {
    const { productId } = updateLink.dataset;
    updateLink.addEventListener('click', ()=>{
        
     const container =  document.querySelector(`.js-product-quantity-${productId}`)
        container.classList.add('is-editing-quantity');
    })
});
document.querySelectorAll(`.save-new-quantity`).forEach((save)=>{
    const {productId} = save.dataset;
    
    save.addEventListener('click', ()=>{
    const Quantity = document.querySelector(`.update-quantity-input-${productId}`);
    const newQuantity = Number(Quantity.value)
        updateNewQuantity(productId, newQuantity)
        
       
        const container =  document.querySelector(`.js-product-quantity-${productId}`)
        container.classList.remove('is-editing-quantity');
        updateQuantity()
        document.querySelector(`.quantity-label-${productId}`).innerHTML = `Quantity:${newQuantity}`

        renderOrderSummary()
        renderPaymentSummary()

    })
})
document.querySelectorAll('.update-quantity-input').forEach((input)=>{
    const {productId} = input.dataset;
    input.addEventListener('keyDown', (event)=>{
        if(event.key === 'enter'){
            console.log(event)
            const Quantity = document.querySelector(`.update-quantity-input-${productId}`);
            const newQuantity = Number(Quantity.value)
                updateNewQuantity(productId, newQuantity)
                
               
                const container =  document.querySelector(`.js-product-quantity-${productId}`)
                container.classList.remove('is-editing-quantity');
                updateQuantity()
                document.querySelector(`.quantity-label-${productId}`).innerHTML = `Quantity:${newQuantity}`
           
        }
    })
})
}