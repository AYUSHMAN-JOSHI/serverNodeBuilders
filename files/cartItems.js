const imgSrc= "./brinjal.jpg";

const mongodbData = fetch('https://servernodebuilders.onrender.com/items', {
    method: 'GET',
    body: null,
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
  // Assuming data is an array of product objects fetched from MongoDB
  const mongodbData = data;

  // Call a function to create and append cards using mongodbData
  mongodbData.forEach((data, index) => {
    createCard(data, index);
  });
})
.catch(error => console.error('Error fetching data:', error));

// Function to create and append a card element
function createCard(data, index) {
    const container = document.getElementById("itemList");

    const card = document.createElement("div");
    card.className = "card p-4";

    const row = document.createElement("div");
    row.className = "row";

    // Create and append the image div
    const imgDiv = document.createElement("div");
    imgDiv.className = "col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img";
    const img = document.createElement("img");
    img.src = './img/' + data.vegetable + '.jpg';
    img.className = "img-fluid";
    img.alt = "cart img";
    imgDiv.appendChild(img);

    // Create and append the product details div
    const detailsDiv = document.createElement("div");
    detailsDiv.className = "col-md-7 col-11 mx-auto px-4 mt-2";

    // Create and append product name
    const productNameDiv = document.createElement("div");
    productNameDiv.className = "col-6 card-title";
    const productNameHeading = document.createElement("h1");
    productNameHeading.className = "mb-4 product_name";
    productNameHeading.textContent = data.vegetable;
    productNameDiv.appendChild(productNameHeading);

    // Create and append quantity controls
    const quantityDiv = document.createElement("div");
    quantityDiv.className = "col-6";
    quantityDiv.innerHTML = `
        <ul class="pagination justify-content-end set_quantity">
            <li class="page-item">
                <button class="page-link" onclick="decreaseNumber('textbox${index + 1}','itemval${index + 1}', ${data.rate})">
                    <i class="fas fa-minus"></i>
                </button>
            </li>
            <li class="page-item" class="some${index + 1}">
                <input type="text" name="" class="page-link" value="0" id="textbox${index + 1}">
            </li>
            <li class="page-item">
                <button class="page-link" onclick="increaseNumber('textbox${index + 1}','itemval${index + 1}', ${data.rate})">
                    <i class="fas fa-plus"></i>
                </button>
            </li>
        </ul>
    `;

    // Create and append price and total
    const priceDiv = document.createElement("div");
    priceDiv.className = "col-8 d-flex justify-content-between remove_wish";
    priceDiv.innerHTML = `
        <p><i class="fas fa-indian-rupee-sign"></i> ${data.rate}/kg</p>
    `;

    const totalDiv = document.createElement("div");
    totalDiv.className = "col-4 d-flex justify-content-end price_money";
    totalDiv.innerHTML = `
        <h3>₹<span id="itemval${index + 1}">0.00</span></h3>
    `;

    console.log(totalDiv.innerHTML);

    // Append all elements to the card
    detailsDiv.appendChild(productNameDiv);
    detailsDiv.appendChild(quantityDiv);
    detailsDiv.appendChild(priceDiv);
    detailsDiv.appendChild(totalDiv);

    row.appendChild(imgDiv);
    row.appendChild(detailsDiv);
    card.appendChild(row);

    // Append the card to the container
    container.appendChild(card);
}

// // Loop through the MongoDB data and create cards for each item
// mongodbData.forEach((data, index + 1) => {
//     createCard(data, index + 1);
// });