use agashenko

const paginator = (size, page) => {

    const customers = db.customers.find().limit(size).skip((page-1) * size);

    const customWithOrders = [];

    while (customers.hasNext()) {

        const { _id, name: { first, last  } } = customers.next();

        const cursor = db.orders.aggregate([
            { $match: { customerId: _id.valueOf() } },
            { $group : { _id : '$product', total_ordered: {$sum : '$count'} } }
        ]);

        const filterCustomersOrders = {
            fName: first,
            lName: last,
            orders: cursor.toArray()
        };

        customWithOrders.push(filterCustomersOrders);

    }

    return customWithOrders;
};
