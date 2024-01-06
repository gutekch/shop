document.addEventListener("DOMContentLoaded", function () {
  const products = document.querySelector(".random-products");
  const cart = document.querySelector(".cart-list");
  const total = document.querySelector(".in-total");
  const pages = document.querySelectorAll(".page");

  const navButtons = document.querySelectorAll(".navbar button");

  function showPage(page) {
    document
      .querySelectorAll(".page")
      .forEach((page) => (page.style.display = "none"));
    document.getElementById(`${page}`).style.display = "block";
  }

  navButtons.forEach((button) => {
    button.onclick = function () {
      showPage(this.dataset.page);
    };
  });

  function Product(title, price, img, productId) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.productId = productId;
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

  const antoninka = new Product(
    "Antoninka",
    500,
    "/photos/michalek.png",
    "product3"
  );
  myProducts.push(antoninka);

  localStorage.setItem("myKey", JSON.stringify(myProducts));
  let myStorage = JSON.parse(localStorage.getItem("myKey"));

  myStorage.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.id = product.productId;
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

  // alternative shopping cart?
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) =>
    button.addEventListener("click", function () {
      let currentItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const productTitle = this.dataset.productTitle;
      const productPrice = this.dataset.productPrice;
      const newItem = { title: productTitle, price: productPrice };
      currentItems.push(newItem);
      localStorage.setItem("cartItems", JSON.stringify(currentItems));
      updateCartDisplay();
      updateDetailedCart();
    })
  );

  // shopping cart window on the main page:
  // reminder: const cart = document.querySelector(".cart-list");
  // reminder: const total = document.querySelector(".in-total");
  function updateCartDisplay() {
    const gettingItems = JSON.parse(localStorage.getItem("cartItems"));
    if (gettingItems !== null) {
      const cartItemsDisplay = gettingItems.reduce((accumulator, item) => {
        const existingItem = accumulator.find(
          (obj) => obj.title === item.title
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          accumulator.push({
            title: item.title,
            price: item.price,
            quantity: 1,
          });
        }
        return accumulator;
      }, []);
      cart.innerHTML = "";
      cartItemsDisplay.forEach((item) => {
        const newLi = document.createElement("li");
        newLi.innerHTML = `${item.title}: ${item.price}$ Quantity:${item.quantity}`;
        cart.appendChild(newLi);
      });

      const totalToPay = cartItemsDisplay.reduce(
        (total, item) => (total += item.price * item.quantity),
        0
      );
      total.innerHTML = `TOTAL:${totalToPay}$`;
    } else {
      cart.innerHTML = "";
    }
  }
  updateCartDisplay();

  // var inTotal = 0;
  // var totalOccurences = {};
  // const buttons = document.querySelectorAll(".button");
  // buttons.forEach((button) =>
  //   button.addEventListener("click", function () {
  //     inTotal += parseInt(button.dataset.productPrice);
  //     total.innerHTML = `TOTAL:${inTotal}$`;
  //     const productTitle = button.dataset.productTitle;
  //     if (totalOccurences[productTitle] === undefined) {
  //       totalOccurences[productTitle] = 1;
  //       const newLi = document.createElement("li");
  //       newLi.innerHTML = `
  //           <p class="${productTitle.replace(/\s/g, "")}" >${
  //         button.dataset.productTitle
  //       }:${button.dataset.productPrice}$</p>
  //           `;
  //       cart.appendChild(newLi);
  //     } else {
  //       const existingLi = document.querySelector(
  //         `.${productTitle.replace(/\s/g, "")}`
  //       );
  //       totalOccurences[productTitle]++;
  //       existingLi.innerHTML = `
  //           <p class="${productTitle}" >${button.dataset.productTitle}(${
  //         totalOccurences[productTitle]
  //       }):${button.dataset.productPrice * totalOccurences[productTitle]}$</p>
  //           `;
  //     }
  //   })
  // );

  // Clearing the shopping cart:
  const clearButton = document.querySelector(".clearcart");
  clearButton.addEventListener("click", function () {
    localStorage.removeItem("cartItems");
    updateCartDisplay();
    updateDetailedCart();
  });

  // Page 3 - displaying detailed cart
  function updateDetailedCart() {
    const total = document.querySelector(".total-detailed");
    const detailedCartList = document.querySelector(".shoppingitems");
    let currentItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const websiteProducts = JSON.parse(localStorage.getItem("myKey"));
    console.log(websiteProducts)
    const segregatedItems = currentItems.reduce((accumulator, item) => {
      const existingItem = accumulator.find((obj) => obj.title === item.title);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        accumulator.push({ title: item.title, price: item.price, quantity: 1 });
      }
      return accumulator;
    }, []);
    detailedCartList.innerHTML = "";
    total.innerHTML = "";
    segregatedItems.forEach((item) => {
      // appending the image from website Products to the detailedCartList ----- ALE JESTEM DUMNY Z TEGO KURWA
      const product = websiteProducts.find(product=>product.title === `${item.title}`);
      // creating list elements for the current detailed shopping cart
      const listedItem = document.createElement("li");
      listedItem.classList = "listed-item";
      listedItem.innerHTML = `<img class="item-image" src=${product.img}><div class="item-title">${
        item.title
      }</div> <div class="item-price>Price: ${
        item.price
      }</div> <div class="item-quantity">Quantity: ${
        item.quantity
      }</div> <div class="item-total">Total/item : $${
        parseInt(item.price) * parseInt(item.quantity)
      }</div>`;
      detailedCartList.appendChild(listedItem);


    });
    const priceTotal = currentItems.reduce((total, item) => {
      const singleTotal = parseInt(item.price);
      total += singleTotal;
      return total;
    }, 0);
    const totalContainer = document.createElement("p");
    totalContainer.className = "total-detailed";
    totalContainer.innerHTML = `TOTAL:${priceTotal}`;
    total.appendChild(totalContainer);
  }
  updateDetailedCart();
});
