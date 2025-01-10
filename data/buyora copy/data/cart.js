export let cart = JSON.parse(localStorage.getItem('cartt')) ||
[
];


function saveToStorage(){
    localStorage.setItem('cartt', JSON.stringify(cart))
}
export function addToCart(productId){
    const itemQuantity= document.querySelector(`.js-quantity-selector-${productId}`).value
    

    let matchingItem

    cart.forEach((cartItem)=>{
        if(cartItem.productId === productId){
            matchingItem = cartItem;

        }

    })
    

    if(matchingItem){
        matchingItem.Quantity+=1

    }else{
        cart.push({
            productId: productId,
            Quantity: Number(itemQuantity),
            deliveryOptionId: '1'
        })}

        saveToStorage();

        

}
export function calculateCartQuantity(){
    let totalQuantity = 0;

    cart.forEach((cartItem)=>{
      totalQuantity+= cartItem.Quantity;
      
    })

    return totalQuantity
    }

    export function removeFromcart(productId){
        const newCart = []
        cart.forEach((cartItem)=>{
            if(cartItem.productId !=productId){
                newCart.push(cartItem)

            }
            cart = newCart
            saveToStorage()
        })
    }
    export function updateQuantity(){
        let totalQuantity = 0;
      
        cart.forEach((cartItem)=>{
          totalQuantity+= cartItem.Quantity;
          
        })
        return totalQuantity;
        
      }

      export function updateNewQuantity(productId, newQuantity){
        let matchingItem;
        cart.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                matchingItem = cartItem
            }
        })
        
        matchingItem.Quantity =newQuantity

        
        saveToStorage()
        
      }
      export function updateDeliveryOption(deliveryOptionId, productId){
       
        let matchingProduct ;
        cart.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                matchingProduct = cartItem
            }

            
        })
        matchingProduct.deliveryOptionId = deliveryOptionId;
        
        saveToStorage();

      }

     