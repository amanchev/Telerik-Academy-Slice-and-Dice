module.exports = (app, db) => {
    let ObjectId = require('mongodb').ObjectID;
    app.get('/api/products', (req, res) => {
        let type = req.query.sort;
        let page = parseInt(req.query.page) || 1;
        let count = parseInt(req.query.count) || 6;
        let query = req.query;

        delete query['sort'];
        delete query['page'];
        delete query['count'];

        let data = db.collection('products').find(query).toArray((err, result) => {
            if (err) throw err;

            let context = sort(result, type);
            context = paginate(context, page, count);
            res.send(context)
        });

    });
    app.get('/api/products/all', (req, res) => {


        let data = db.collection('products').find().toArray((err, result) => {
            if (err) throw err;


            res.send(result)
        });

    });

    app.post('/api/products', (req, res) => {
        const product = {
            text: req.body.body,
            title: req.body.title,
            category: req.body.category,
            tags: req.body.tags,
            imgURL: req.body.imgURL,
            brand: req.body.brand,
            resolution: req.body.resolution,
            inches: req.body.inches,
            price: req.body.price,
        };
        product.tags = product.tags.split(',')
        db.collection('products').insert(product, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });

    });
    app.put('/api/products', (req, res) => {

        let data = db.collection('products').findOneAndUpdate({ "_id": ObjectId(req.query.id) }, { $set: req.body })
        res.send('Modifyed')
    });
    app.delete('/api/products/all', (req, res) => {
        if (req.query.confirm === 'yes') {
            db.collection('products').remove({});
            res.send('DELETED');
        } else {
            res.send('You have to confirm DELETE action! Query: ?confirm=yes');
        }
    });
    app.delete('/api/products', (req, res) => {
        if (req.query.confirm === 'yes') {
            db.collection('products').remove({ "_id": ObjectId(req.query.id) });
            res.send('DELETED');
        } else {
            res.send('You have to confirm DELETE action! Query: ?confirm=yes');
        }
    });



    function paginate(context, page, count) {

        let pagesCount = Math.ceil(context.length / count);
        if (page > pagesCount) {
            page = 1;
        }
        let pages = [];

        for (var i = 1; i <= pagesCount; i++) {
            pages.push(i)

        }

        context = context.slice((page - 1) * count, count * page)
        let result = {
            'pages': pages,
            'products': context
        };
        return result;

    }

    function sort(result, type) {
        let context = [];
        let price = 999999999;
        let minPriceElement;
        let len = result.length;

        for (var i = 0; i < len; i += 1) {
            let removeIndex;

            for (var x = 0; x < result.length; x += 1) {
                let element = result[x];

                if (parseFloat(element.price) <= price) {
                    price = parseFloat(element.price);
                    minPriceElement = element;
                    removeIndex = x;
                }

            }

            context.push(minPriceElement);
            result.splice(removeIndex, 1);

            price = 999999999;
            minPriceElement = undefined;
            removeIndex = undefined


        }
        if (type === "descending") {
            context = context.reverse();
        }

        return context;
    }
};