use agashenko

print('Количество документов в коллекции orders - ', db.orders.stats().count)
print('Объем занимаемых данных в коллекции customers - ', db.customers.dataSize(), 'bytes')
print('Объем занимаемых данных в коллекции orders - ', db.orders.dataSize(), 'bytes')
print('Общий объём занимаемых данных двумя коллекциями - ', db.customers.dataSize() + db.orders.dataSize(), 'bytes')
