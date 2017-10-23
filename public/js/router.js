// getElementById wrapper

function $id(id) {
    return document.getElementById(id);
}

// asyncrhonously fetch the html template partial from the file directory,
// then set its contents to the html of the parent element
function loadHTML(url, id) {
    req = new XMLHttpRequest();
    req.open('GET', url);
    req.send();
    req.onload = () => {
        $id(id).innerHTML = req.responseText;
        init();
    }
}

function loadHTMLWithTemplate(url, id, params) {
    req = new XMLHttpRequest();
    req.open('GET', url);
    req.send();
    req.onload = () => {
        loadTemplate(id, params);
    }



}

function loadTemplate(id, params) {
    let template = Handlebars.compile(req.responseText);

    let url2 = '/api/' + params.params;
    req2 = new XMLHttpRequest();
    req2.open('GET', url2)
    req2.send();
    req2.onload = () => {
        let context = JSON.parse(req2.response);

        let html = template(context);
        $id(id).innerHTML = html;
        init();

    }
}

//window.onhashchange(() => loadTemplate())

// use #! to hash
router = new Navigo(null, true);
router.on('post/:params', (params, query) => {
    loadHTMLWithTemplate('./templates/post.html', 'view', params);
}, );
router.on({
    // 'view' is the id of the div element inside which we render the HTML
    'home': () => {

        loadHTML('./templates/home.html', 'view');
    },
    'articles': () => { loadHTML('./templates/articles.html', 'view') },
    '404': () => { loadHTML('./templates/404.html', 'view') }
});


// set the default route
router.on(() => { window.location.hash = '#/home' });

// set the 404 route
//router.notFound((query) => { window.location.hash = '#/404' })


router.resolve();