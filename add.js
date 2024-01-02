document.addEventListener('DOMContentLoaded', function () {

const products = document.querySelector('.random-products');
const cart = document.querySelector('.cart-list');

const myProducts = [
    {
        title:'A black cat',
        productId:'product1',
        price:'5',
        img:'/photos/black-cat.png'
    },
    {
        title:'A hairless cat',
        productId:'product2',
        price:'2000',
        img:'/photos/luxifa.png'
    }
];

localStorage.setItem('myKey',JSON.stringify(myProducts));
let myStorage = JSON.parse(localStorage.getItem('myKey'));
console.log(`my local storage content:${myStorage}`);


myStorage.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product')
    productDiv.innerHTML = `
    <h3>${product.title}</h3>
    <img src=${product.img}>
    <p>Price:${product.price + '$'}</p>
    <button class='button' 
        data-product-price="${product.price}"
        data-product-title="${product.title}"
        data-product-title="${product.img}">ADD TO CART</button>
    `;
    products.appendChild(productDiv);
});
const buttons = document.querySelectorAll('.button');
buttons.forEach(button=>
    button.addEventListener('click',function() {
        const newLi = document.createElement('li');
        newLi.innerHTML = `
        <p class="cart-element">${button.dataset.productTitle}:${button.dataset.productPrice}$</p>
        `;
        cart.appendChild(newLi);
    }))

const cartElements = document.querySelectorAll('.cart-element');
const inTotal = cartElements.reduce(element=>total+element,0);


// buttons.forEach.addEventListener('click',function(){
//     // const newLi = document.createElement('li');
//     // newLi.innerHTML = `
//     // <p>${button.price}<p>
//     // `
//     console.log('hello');


// })




});