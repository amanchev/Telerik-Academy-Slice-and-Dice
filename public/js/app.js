import Navigo from 'navigo';
import * as homeController from 'homeController';
import * as articlesController from 'articlesController';
import * as productsController from 'productsController';

let router = new Navigo(null, true);

router.on({
    'home': homeController.get,
    'products': productsController.get,
    'articles': articlesController.get,
});

router.resolve();