import axios from 'axios'
import moment from 'moment';
import noty from 'noty'
import { initAdmin } from './admin'


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

const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(() =>{
        alertMsg.remove()
    },2000)
}



//change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput') 
let order = hiddenInput ? hiddenInput.value: null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order){
    statuses.forEach((status) =>{
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepComplete = true 
    statuses.forEach((status) =>{
        let dataProp = status.dataset.status
        if(stepComplete){
            status.classList.add('step-completed')
        }

        if(dataProp === order.status){
            stepComplete = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if(status.nextElementSibling){
                status.nextElementSibling.classList.add('current')
            } 
        }
    })
}

updateStatus(order);

//socket
let socket = io()
initAdmin(socket)
//Join
if(order){
    socket.emit('join', `order_${order._id}`)
}
let adminAreaPath = window.location.pathname
console.log(adminAreaPath)
if(adminAreaPath.includes('admin')){
    socket.emit('join','adminRoom')
}

//order_order._id 
socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    new noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar: false,
        layout: 'bottomRight'  
      }).show();
})
 