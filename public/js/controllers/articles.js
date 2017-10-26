import * as data from 'data';
import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');

export function get() {

    Promise.all([
            loadTemplate('articles'),

        ])
        .then(([template]) => {
            $appContainer.html(template());
        })
}