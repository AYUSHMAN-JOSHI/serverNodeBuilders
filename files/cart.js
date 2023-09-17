var product_total_amt = document.getElementById('product_total_amt');
var shipping_charge = document.getElementById('shipping_charge');
var total_cart_amt = document.getElementById('total_cart_amt');
var discountCode = document.getElementById('discount_code1');

var order = [
    {
        qty: 0,
        price: 0
    },
    {
        qty: 0,
        price: 0
    },
    {
        qty: 0,
        price: 0
    },
    {
        qty: 0,
        price: 0
    }
]

var items = {
    'textbox1': 0,
    'textbox2': 1,
    'textbox3': 2,
    'textbox4': 3
}


const decreaseNumber = (incdec, itemprice, pc) => {
    var itemval = document.getElementById(incdec);
    var itemprice = document.getElementById(itemprice);
    console.log(pc);
    console.log(itemprice.innerHTML);
    console.log(itemval.value);
    if (itemval.value <= 0) {
        itemval.value = 0;
        alert('Negative quantity not allowed');
    } else {
        itemval.value = parseInt(itemval.value) - 1;
        itemval.style.background = '#fff';
        itemval.style.color = '#000';
        itemprice.innerHTML = parseInt(itemprice.innerHTML) - parseInt(pc);
        product_total_amt.innerHTML = parseInt(product_total_amt.innerHTML) - parseInt(pc);
        total_cart_amt.innerHTML = parseInt(product_total_amt.innerHTML) + parseInt(shipping_charge.innerHTML);

        var index = items[incdec];
        order[index].qty = itemval.value;
        order[index].price = parseInt(itemprice.innerHTML);

        console.log(order);
    }
}
const increaseNumber = (incdec, itemprice, pc) => {
    var itemval = document.getElementById(incdec);
    var itemprice = document.getElementById(itemprice);
    console.log(pc);
    console.log(itemprice);
    console.log(itemval.value);
    console.log(incdec);
    if (itemval.value >= 5) {
        itemval.value = 5;
        alert('max 5 allowed');
        itemval.style.background = 'red';
        itemval.style.color = '#fff';
    } else {
        console.log(product_total_amt.innerHTML);
        itemval.value = parseInt(itemval.value) + 1;
        itemprice.innerHTML = parseInt(itemprice.innerHTML) + parseInt(pc);
        product_total_amt.innerHTML = parseInt(product_total_amt.innerHTML) + parseInt(pc);
        total_cart_amt.innerHTML = parseInt(product_total_amt.innerHTML) + parseInt(shipping_charge.innerHTML);

        var index = items[incdec];
        order[index].qty = itemval.value;
        order[index].price = parseInt(itemprice.innerHTML);
        console.log(order);
    }
}

const discount_code = () => {
    let totalAmtCurr = parseInt(total_cart_amt.innerHTML);
    let error_trw = document.getElementById('error_trw');
    if (discountCode.value === 'node_builders') {
        let newTotalAmt = totalAmtCurr - 15;
        total_cart_amt.innerHTML = newTotalAmt;
        error_trw.innerHTML = "Hurray! code is valid";
    } else {
        error_trw.innerHTML = "Try Again! Valid code is node_builders";
    }
}

const placeOrder = async () => {
    console.log('DONE');
    console.log(total_cart_amt.innerHTML);
    const query = await fetch('https://servernodebuilders.onrender.com/order', {
        method: 'POST',
        body: JSON.stringify({
            order: order,
            total: parseInt(total_cart_amt.innerHTML)
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
}