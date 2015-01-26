Meteor.publish('bars', function() {
    return Bars.find();
});
