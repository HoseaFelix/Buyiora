import { renderOrderSummary } from "../checkout/orderSummary.js";
import { renderPayementSummary } from "../checkout/paymentSummary.js"
import { loadProducts, loadProductsFetch} from "../data/products.js";
//import '../data/cart-class.js'
// import  '../data/backend-practice.js'
import { loadCarts } from "../data/cart.js";

async function loadPage(){

    await loadProductsFetch()
    await new Promise((resolve)=>[
        loadCarts(()=>{
            resolve()
        })
    ])

    renderOrderSummary()
    renderPayementSummary();
}
loadPage()

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve)=>[
        loadCarts(()=>{
            resolve()
        })
    ])
]).then(()=>{
    renderOrderSummary()
    renderPayementSummary();
})
*/

//21:12


// new Promise((resolve)=>{
//     loadProducts(()=>{
//         resolve()
//     })
// }).then(()=>{
//     return new Promise((resolve)=>[
//         loadCarts(()=>{
//             resolve()
//         })
//     ])
// }).then(()=>{
//     renderOrderSummary()
//     renderPayementSummary();
// })

// loadProducts(()=>{
//     loadCarts(()=>{
//         renderOrderSummary()
//         renderPayementSummary();
//     })
    
// })

//refer 20:24 for backend tests