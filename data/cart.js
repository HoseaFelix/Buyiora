export let cart;

loadFromStorage()

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId){
    const quantitySelector= document.querySelector(`.js-quantity-selector-${productId}`).value

    
    let matchingItem;

        cart.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                matchingItem = cartItem
            }
        })
        if(matchingItem){
            matchingItem.quantity += Number(quantitySelector)
        }else {

            cart.push({
                productId: productId,
                quantity: Number(quantitySelector),
                deliveryOptionId: '1'
            });
        }
      
        saveToStorage()
}
export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart')) ||
    [];
   
}
export function calculateCartQuantity(){
    let cartQuantity = 0;
        cart.forEach((cartItem)=>{
         cartQuantity+= cartItem.quantity

        })
        return cartQuantity
}

export function removeFromCart(productId){
    const newCart = []
    cart.forEach((cartItem) =>{
        if(cartItem.productId != productId){
            newCart.push(cartItem)
        }
    })

    cart = newCart
    saveToStorage()
}
export function updateQuantity(productId, newQuantity){
    let matchingItem;
    

    cart.forEach((cartItem)=>{
        if(productId=== cartItem.productId){
            matchingItem = cartItem
        }
    })
    matchingItem.quantity = newQuantity;

    saveToStorage();
}
export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingItem = cartItem
        }
    })

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}


export function loadCarts (fun){
    const xhr =  new XMLHttpRequest()
    xhr.addEventListener('load', ()=>{
     console.log(xhr.response)
    fun()
  
    console.log('load products')
    
    })
    xhr.open('GET', 'https://supersimplebackend.dev/cart')
    xhr.send()
  }