use agashenko

const customers = db.customers.find();

let orders = [];

while (customers.hasNext()) {
    const { _id, name: { first, last  } } = customers.next();

    const cursor = db.orders.find({ customerId: _id.valueOf() });

    let filterCustomersOrders = {
        fName: first,
        lName: last,
        orders: cursor.toArray()
    };

    orders.push(filterCustomersOrders)

}
