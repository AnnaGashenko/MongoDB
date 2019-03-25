use agashenko
/**
 1. Поиск пользователя по email
 2. Поиск пользователя по имени и фамилии (направление ASC)
 3. Поиск пользователя по email и дате регистрации (email — ASC, created — DESC)
 */
db.customers.createIndex({ email: 1 });
db.customers.createIndex({ 'name.first' : 1, 'name.last' : 1 });
db.customers.createIndex({ email : 1, created : -1 });

/**
 Реализовать уникальность комбинации полей nickname + email
 */

db.customers.createIndex({ nickname: 1, email: 1 }, { unique: true });

/**
 Реализовать возможность полнотекстового поиска по first, last, nickname и email
 */

db.customers.createIndex({ 'name.first': 'text', 'name.last': 'text', nickname: 'text', email: 'text' });
