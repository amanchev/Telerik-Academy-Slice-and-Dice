const ItemsData = require('./items.data');
const CategoriesData = require('./categories.data');
const init = (db) => {
    return Promise.resolve({
        items: new ItemsData(db),
        categories: new CategoriesData(db),
    });
};

module.exports = { init };
