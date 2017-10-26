System.config({
    transpiler: 'plugin-babel',
    map: {
        // System.js files
        'plugin-babel': 'libs/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'libs/systemjs-plugin-babel/systemjs-babel-browser.js',
        'text': 'libs/systemjs-plugin-text/text.js',

        // App files
        'app': 'js/app.js',
        //'myRouter': 'js/myRouter.js',
        'requester': 'js/requester.js',
        'data': 'js/data.js',
        'homeController': 'js/controllers/home.js',
        'articlesController': 'js/controllers/articles.js',
        'productsController': 'js/controllers/products.js',
        'templates': 'js/templates.js',

        'navigo': '/libs/navigo/lib/navigo.min.js',

    }
});

System.import('app');