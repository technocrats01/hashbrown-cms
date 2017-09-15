'use strict';

const RequestHelper = require('Client/Helpers/RequestHelper');

// Root
Crisp.Router.route('/', function() {
    Crisp.View.get('NavbarMain').showTab('/');
    Crisp.View.get('NavbarMain').highlightItem('/', 'null');

    let carouselItems = [
        [
            _.div(
                _.img({src: '/img/welcome/intro-content.jpg'})
            ),
            _.div(
                _.h2('Content'),
                _.p('In the content section you will find all of your authored work. The content is a hierarchical tree of nodes that can contain text and media, in simple or complex structures.')
            )
        ],
        [
            _.div(
                _.img({src: '/img/welcome/intro-media.jpg'})
            ),
            _.div(
                _.h2('Media'),
                _.p('An asset library for your hosted files, such as images, videos, PDFs and whatnot.')
            )
        ],
        [
            _.div(
                _.img({src: '/img/welcome/intro-forms.jpg'})
            ),
            _.div(
                _.h2('Forms'),
                _.p('If you need an input form on your website, you can create the model for it here and see a list of the user submitted input.')
            )
        ]
    ];

    if(currentUserHasScope('connections')) {
        carouselItems.push([
            _.div(
                _.img({src: '/img/welcome/intro-connections.jpg'})
            ),
            _.div(
                _.h2('Connections'),
                _.p('A list of endpoints and resources for your content. Connections can be set up to publish your content to remote servers, provide statically hosted media and serve rendering templates.')
            )
        ]);
    }
    
    if(currentUserHasScope('schemas')) {
        carouselItems.push([
            _.div(
                _.img({src: '/img/welcome/intro-schemas.jpg'})
            ),
            _.div(
                _.h2('Schemas'),
                _.p('A library of content structures. Here you define how your editable content looks and behaves. You can define schemas for both content nodes and property fields.')
            )
        ]);
    }

    if(currentUserHasScope('users')) {
        carouselItems.push([
            _.div(
                _.img({src: '/img/welcome/intro-users.jpg'})
            ),
            _.div(
                _.h2('Users'),
                _.p('All of the users connected to this project. Here you can edit permissions and personal information and remove/add new users.')
            )
        ]);
    }
    
    if(currentUserHasScope('settings')) {
        carouselItems.push([
            _.div(
                _.img({src: '/img/welcome/intro-settings.jpg'})
            ),
            _.div(
                _.h2('Settings'),
                _.p('Here you can set up synchronisation with other HashBrown instances.')
            )
        ]);
    }

    populateWorkspace(
        _.div({class: 'dashboard-container welcome'},
            _.h1('Welcome to HashBrown'),
            _.h2('Example content'),
            _.p('Press the button below to get some example content to work with.'),
            _.button({class: 'btn btn-default'}, 'example')
                .click(() => {
                    RequestHelper.request('post', 'content/example')
                    .then(() => {
                        location.reload();
                    })
                    .catch(UI.errorModal);
                }),
            _.h2('Introduction'), 
            UI.carousel(carouselItems, true, true, '400px'),
            _.h2('Contextual help'),
            _.p('You can always click the <span class="fa fa-question-circle"></span> icon in the upper right to get information about the screen you\'re currently on.'),
            _.h2('Guides'),
            _.p('If you\'d like a more in-depth walkthrough of the features, please check out the guides.'),
            _.a({class: 'btn btn-default', href: 'http://hashbrown.rocks/guides', target: '_blank'}, 'Guides')
        ),
        'presentation'
    );
});

// Readme
Crisp.Router.route('/readme/', function() {
    Crisp.View.get('NavbarMain').highlightItem('/', 'readme');

    RequestHelper.customRequest('GET', '/text/readme')
    .then((html) => {
        populateWorkspace(
            _.div({class: 'dashboard-container readme'},
                html
            ),
            'presentation'
        );
    });
});

// License
Crisp.Router.route('/license/', function() {
    Crisp.View.get('NavbarMain').highlightItem('/', 'license');

    RequestHelper.customRequest('GET', '/text/license')
    .then((html) => {
        populateWorkspace(
            _.div({class: 'dashboard-container license'},
                html
            ),
            'presentation presentation-center'
        );
    });
});
