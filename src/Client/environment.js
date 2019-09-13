'use strict';

/**
 * @namespace HashBrown.Client
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Check that all submodules are loaded
    submoduleCheck();
    
    // Libraries
    window._ = Crisp.Elements;

    // Service shortcuts
    window.debug = HashBrown.Service.DebugService;
    window.UI = HashBrown.Service.UIService;

    // Error handling
    window.addEventListener('error', UI.errorModal);
   
    // Set context variables
    HashBrown.Context.language = localStorage.getItem('language') || 'en';
    HashBrown.Context.user = new HashBrown.Entity.Resource.User(HashBrown.Context.user);

    // Preload schemas
    let spinner = UI.spinner(null, false, '/svg/logo_pink.svg');
    UI.setSpinnerMessage(spinner, 0, 'Loading schemas...');

    await HashBrown.Service.SchemaService.getAllSchemas();

    UI.setSpinnerMessage(spinner, 0, 'Schema loaded!', true);
    UI.hideSpinner(spinner);

    // Set router check
    Crisp.Router.check = (newRoute, cancel, proceed) => {
        UI.highlight(false);

        let contentEditor = Crisp.View.get('ContentEditor');

        if(
            (!contentEditor || !contentEditor.model) ||
            (newRoute.indexOf(contentEditor.model.id) > -1) ||
            (!contentEditor.isDirty)
        ) {
            proceed();
            return;
        }

        UI.confirmModal(
            'Discard',
            'Discard unsaved changes?',
            'You have made changes to "' + (contentEditor.model.prop('title', HashBrown.Context.language) || contentEditor.model.id) + '"',
            () => {
                contentEditor.isDirty = false;
                proceed();
            },
            cancel
        );
    };
    
    // Init navigation UI
    new HashBrown.View.Navigation.NavbarMain();
    new HashBrown.View.Navigation.MainMenu();

    // Init router
    Crisp.Router.init();
    
    // Check for updates
    updateCheck();
});