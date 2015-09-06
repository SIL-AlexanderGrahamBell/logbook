/**
 * Default Router Options
 */
Router.configure({
    layoutTemplate: 'Main',
    onAfterAction: function() {
        App.Actions.resize();
    }
});

/**
 * Enabling auth plugin
 */
Router.plugin('auth', {
    // define routes where the users don't need to be registered
    except: ['MainHome', 'MainLogin', 'MainRegister']
});
