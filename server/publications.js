Meteor.publish('bars', function(slug) {
    return Bars.find({slug: slug});
});
