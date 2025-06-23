const sockert = io();

sockert.on('clients-total', (total) => {
    document.getElementById('clients-total').innerText = `Total Clients: ${total}`;
    console.log(`Total Clients: ${total}`); 
})