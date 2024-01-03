document.addEventListener("DOMContentLoaded", function () {
  const products = document.querySelector(".random-products");
  const cart = document.querySelector(".cart-list");
  const total = document.querySelector(".in-total");

  function Product(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
  }

  const myProducts = [
    {
      title: "A black cat",
      productId: "product1",
      price: "5",
      img: "/photos/black-cat.png",
    },
    {
      title: "A hairless cat",
      productId: "product2",
      price: "2000",
      img: "/photos/luxifa.png",
    },
  ];

  const antoninka = new Product('Antoninka',500,'/photos/michalek.png');
  myProducts.push(antoninka);

  localStorage.setItem("myKey", JSON.stringify(myProducts));
  let myStorage = JSON.parse(localStorage.getItem("myKey"));
  console.log(`my local storage content:${myStorage}`);

  myStorage.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <h3>${product.title}</h3>
    <img src=${product.img}>
    <p>Price:${product.price + "$"}</p>
    <button class='button' 
        data-product-price="${product.price}"
        data-product-title="${product.title}"
        data-product-title="${product.img}">ADD TO CART</button>
    `;
    products.appendChild(productDiv);
  });
  console.log("A hairless cat".replace(/\s/g, ""));
  var inTotal = 0;
  var totalOccurences = {};
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) =>
    button.addEventListener("click", function () {
      inTotal += parseInt(button.dataset.productPrice);
      total.innerHTML = `TOTAL:${inTotal}$`;
      const productTitle = button.dataset.productTitle;
      if (totalOccurences[productTitle] === undefined) {
        totalOccurences[productTitle] = 1;
        const newLi = document.createElement("li");
        newLi.innerHTML = `
            <p class="${productTitle.replace(/\s/g, "")}" >${
          button.dataset.productTitle
        }:${button.dataset.productPrice}$</p>
            `;
        cart.appendChild(newLi);
      } else {
        console.log(`class name:${productTitle.replace(/\s/g, "")}`);
        const existingLi = document.querySelector(
          `.${productTitle.replace(/\s/g, "")}`
        );
        console.log(`existingLi:${existingLi}`);
        totalOccurences[productTitle]++;
        existingLi.innerHTML = `
            <p class="${productTitle}" >${button.dataset.productTitle}(${
          totalOccurences[productTitle]
        }):${button.dataset.productPrice * totalOccurences[productTitle]}$</p>
            `;
      }
    })
  );

  const cartElements = document.querySelectorAll(".cart-element");
});
