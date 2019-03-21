use agashenko

const customers = db.customers.find();

let orders = [];

while (customers.hasNext()) {
    const { _id, name: { first, last  } } = customers.next();

    const cursor = db.orders.aggregate([
        { $match: { customerId: _id.valueOf() } },
        { $group : { _id : '$product', total_ordered: {$sum : '$count'} } }
    ]);

    let filterCustomersOrders = {
        fName: first,
        lName: last,
        orders: cursor.toArray()
    };

    orders.push(filterCustomersOrders)

}
