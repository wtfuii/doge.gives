Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'new'
});

Router.route('/:slug', {
  name: 'bar',
  path: '/:slug',
    waitOn: function () {
    return Meteor.subscribe('bars', this.params.slug );
  },
  data: function() {
      var d = Bars.findOne({slug: this.params.slug})
      if (d) {
        getReceivedDOGE(d.address)
        d.balance = Session.get("receivedDOGE").data.data.confirmed_received_value
      }
      console.log(d)
      return d
  },
  onStop: function() {
    Session.set("receivedDOGE", undefined)
  }
});