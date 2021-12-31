import axios from 'axios'
import noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza){
    axios.post('/update-cart', pizza).then(res =>{
        cartCounter.innerText = res.data.totalQty 
        new noty({
          type: 'success',
          timeout: 1000,
          text: 'Item added to cart',
          progressBar: false,
          layout: 'bottomRight'  
        }).show();
    }).catch(err =>{
        new noty({
            type: 'error',
            timeout: 1000,
            text: 'Somthing went wrong',
            progressBar: false,
            layout: 'bottomRight'  
          }).show();
    })
}

addToCart.forEach((btn) =>{
    btn.addEventListener('click', (e) =>{
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        // console.log(pizza);
    })
})