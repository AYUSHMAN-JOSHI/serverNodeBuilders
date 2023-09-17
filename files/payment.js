const form = document.getElementById('upi');

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    console.log('DONEEEE');
    const upiID = document.getElementById('upi-id').value;
    const query = await fetch('https://servernodebuilders.onrender.com/payment', {
        method: 'POST',
        body: JSON.stringify({upiID: upiID}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    console.log(query);

    if(query.status == 200){
        alert("Payment successful");
    }
})