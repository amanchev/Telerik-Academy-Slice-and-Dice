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

// use #! to hash
router = new Navigo(null, true);
router.on({
    // 'view' is the id of the div element inside which we render the HTML
    'home': () => {

        loadHTML('./templates/home.html', 'view');
    },
    'articles': () => { loadHTML('./templates/articles.html', 'view') },
    'post': () => { loadHTML('./templates/post.html', 'view') },
    '404': () => { loadHTML('./templates/404.html', 'view') }
});

// set the default route
router.on(() => { window.location.hash = '#/home' });

// set the 404 route
router.notFound((query) => { window.location.hash = '#/404' })


router.resolve();