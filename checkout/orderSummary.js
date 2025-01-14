import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from "../data/cart.js";
import { products,getProduct } from "../data/products.js";
import { formatCurrency } from "../scripts/utils/money.js";
// import { updateCartQuantity } from "./amazon.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../data/deliveryOptions.js'
import { renderPayementSummary } from "./paymentSummary.js";



export function renderOrderSummary(){
    console.log(products)
    let cartSummaryHTML=''  

    cart.forEach((cartItem)=>{
        const productId = cartItem.productId;

        const matchingProduct= getProduct(productId)

        
            const deliveryOptionId = cartItem.deliveryOptionId;

            const deliveryOption = getDeliveryOption(deliveryOptionId)
 
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDate, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D' )

        
            cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="
                ${matchingProduct.image}">
    
                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    
                    <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = "${matchingProduct.id}">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                    <input class="quantity-input" data-product-id="${matchingProduct.id}"></input>
                    <span class="save-quantity-link" data-product-id = "${matchingProduct.id}">Save<span>
                    
                    
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                    ${deliveryOptionHTML(matchingProduct, cartItem)}
            
                
                </div>
            </div>
            </div>
                
    `

        

    })



    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    // console.log(cartSummaryHTML)

    document.querySelectorAll('.js-delete-link').forEach((link)=>{
        link.addEventListener('click', ()=>{
        const productId = link.dataset.productId
        removeFromCart(productId)
        renderPayementSummary()
        renderOrderSummary()
        updateCartQuantity()
        })
    })

    document.querySelectorAll('.js-update-quantity-link').forEach((update)=>{
        update.addEventListener('click', ()=>{
            const productId = update.dataset.productId;
            // console.log(productId)
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity')
        })
        
    })
    
    document.querySelectorAll('.save-quantity-link').forEach((save)=>{
        save.addEventListener('click', ()=>{
            const productId = save.dataset.productId

            const input = document.querySelector('.quantity-input')

            let inputValue = Number(input.value)

            updateQuantity(productId, inputValue)
            updateCartQuantity()
            renderPayementSummary()
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.remove('is-editing-quantity')
            // console.log(inputValue)

            document.querySelector('.quantity-label').innerHTML = inputValue

        })
    })


    function updateCartQuantity(){
        let cartQuantity = 0
                cart.forEach((cartItem)=>{
                    cartQuantity+= cartItem.quantity
                })

        

        document.querySelector('.checkout-header-middle-section').innerHTML = `Checkout (<a class="return-to-home-link"
        href="amazon.html">${cartQuantity} Items</a>)`

    }
    updateCartQuantity()

    

    function deliveryOptionHTML (matchingProduct, cartItem){
        let HTML = ''
        deliveryOptions.forEach((deliveryOption)=>{
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDate, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D' )
            const priceString = deliveryOption.priceCents === 0
            ? 'FREE'
            : `${formatCurrency(deliveryOption.priceCents)}`

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId; 

        HTML += `

            <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked ? 'checked': ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>
        `

        })
        return HTML
    }

    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click',()=>{
            const {productId, deliveryOptionId}= element.dataset
            updateDeliveryOption(productId, deliveryOptionId)
            renderOrderSummary()
            renderPayementSummary()
        })
    })


}

//
