import Vue from 'vue';
import MyModel from './MyModel.vue';
import MyField from './MyField.vue';
import MyNodeStatus from './MyNodeStatus.vue';

// assign custom field
window.$fiels.MyField = MyField;

// declare your own Model
Vue.model('MyModel', MyModel);

// declare your own section component, requires also customizer declaration
Vue.component('yooessentials-sources', SourcesSection);

// set node status
Vue.events.on('statusNode', ({result = []}, node) => {

    result.push({component: MyNodeStatus, node});

    // pre 2.3.26
    // result.push({title: Vue.i18n.t('Restricted Access'), classNames: 'yo-builder-icon-yooessentials-access', error: false});
});

// hook into tabs with `elementsModalTabs`, `layoutsModalTabs` and `iconsModalTabs` events
Vue.events.on('iconsModalTabs', ({result = []}) => {

    result.push({
        name: 'MyTab',
        component: {} // Vue component
    });

    return result;

});