/**
 * Groups entry
 */
Router.route('/groups', {
    name: 'Groups'
});

/**
 * Add Group
 */
Router.route('/groups/add', {
    name: 'GroupsAdd'
});

/**
 * Add Group
 */
Router.route('/groups/join', {
    name: 'GroupsJoin'
});

/**
 * Edit Group
 */
Router.route('/groups/edit/:id', {
    name: 'GroupsEdit'
})
