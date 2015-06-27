/**
 * Default Router Options
 */
Router.configure({
    layoutTemplate: 'Main'
});

/**
 * Enabling auth plugin
 */
Router.plugin('auth', {
    // define routes where the users don't need to be registered
    except: ['MainHome', 'MainLogin', 'MainRegister']
});
