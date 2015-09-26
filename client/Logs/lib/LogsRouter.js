/**
 * Logs entry
 */
Router.route('/logs', {
    name: 'Logs'
});

/**
 * Add Log
 */
Router.route('/logs/add', {
    name: 'LogsAdd'
});

/**
 * Edit Log
 */
Router.route('/logs/edit/:id', {
    name: 'LogsEdit'
});

/**
 * Edit Group
 */
Router.route('/logs/delete/:id', {
    name: 'LogsDelete'
})
