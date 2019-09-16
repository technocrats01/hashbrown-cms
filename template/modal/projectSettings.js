'use strict';

module.exports = (_, model) => 
 
_.div({class: 'modal'},
    _.div({class: 'modal__dialog'},
        _.div({class: 'modal__header'},
            _.h4({class: 'modal__title'}, `Info for ${model.settings.info.name}`),
            _.button({class: 'modal__close fa fa-close', onclick: _.onClickClose})
        ),
        _.div({class: 'modal__body'},
            _.div({class: 'widget-group'},
                _.label({class: 'widget widget--label small'}, 'Name'),
                _.input({class: 'widget widget--input text', type: 'text', value: model.settings.info.name, onChange: _.onChangeName})
            ),
            _.div({class: 'widget-group'},
                _.label({class: 'widget widget--label small'}, 'Languages'),
                _.dropdown({
                    value: model.settings.languages,
                    useTypeAhead: true,
                    useMultiple: true,
                    options: HashBrown.Service.LanguageService.getLanguageOptions(model.id),
                    onChange: _.onChangeLanguages
                })
            ),
            _.div({class: 'widget widget--separator'}, 'Sync'),
            _.div({class: 'widget-group'},
                _.label({class: 'widget widget--label small'}, 'Enabled'),
                _.input({
                    type: 'checkbox',
                    name: 'enabled',
                    value: model.settings.sync.enabled === true,
                    onChange: _.onToggleSync
                })
            ),
            _.div({class: 'widget-group'},
                _.label({class: 'widget widget--label small'}, 'API URL'),
                _.input({
                    name: 'url',
                    type: 'text',
                    value: model.settings.sync.url || '',
                    placeholder: 'e.g. "https://myserver.com/api/"',
                    onChange: _.onChangeSyncUrl
                })
            ),
            _.div({class: 'widget-group'},
                _.label({class: 'widget widget--label small'}, 'Project id'),
                _.input({
                    name: 'name',
                    value: model.settings.sync.project || '',
                    onChange: _.onChangeSyncProject
                })
            ),
            _.div({class: 'widget-group modal--project-settings__sync-token__input'},
                _.label({class: 'widget widget--label small'}, 'Token'),
                _.input({
                    value: model.settings.sync.token,
                    name: 'token',
                    placeholder: 'API token',
                    onChange: _.onChangeSyncToken
                }),
                _.button({class: 'widget widget--button small fa fa-refresh', onclick: _.onClickGetSyncToken})
            ),
            _.div({class: 'widget-group modal--project-settings__sync-token__login', style: 'display: none'},
                _.input({class: 'widget widget--input text', name: 'username', type: 'text', placeholder: 'Username'}),
                _.input({class: 'widget widget--input text', name: 'password', type: 'password', placeholder: 'Password'}),
                _.button({class: 'widget widget--button small fa fa-check', onclick: _.onClickRemoteLogin}), 
            )
        ),
        _.div({class: 'modal__footer'},
            _.button({class: 'widget widget--button', onclick: _.onClickSave}, 'Save')
        )
    )
)
