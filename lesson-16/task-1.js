use agashenko

// Cleanup previous changes
db.customers.drop(); // drops the collection customers
db.orders.drop(); // drops the collection customers

// Create collection customers
db.createCollection('customers');
db.createCollection('orders');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

for(let i = 0; i < 3000; i++) {
    const { insertedId } =  db.customers.insertOne({
        name: {
            first: 'Anna',
            last: 'Gashenko'
        },
        balance: 15000,
        created: new Date()
    });

    let orderCount = getRndInteger(1, 10);

    for(let order=0; order < orderCount; order++) {
        db.orders.insertOne({
            customerId: insertedId,
            count: 2,
            price: getRndInteger(20, 100),
            discount: getRndInteger(5, 30),
            title: 'some title',
            product: 'some product'
        });
    }

}
