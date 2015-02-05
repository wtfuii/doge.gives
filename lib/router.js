Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loadingTemplate',
  trackPageView: true,
  notFoundTemplate: '404'
});

Router.route('/', {
  name: 'new',
  after: function() {
    document.title = "Doge.gives - new donation tracker"
  }
});

Router.route('/:slug', {
  name: 'bar',
  path: '/:slug',
    waitOn: function () {
    return Meteor.subscribe('bars', this.params.slug.toLowerCase() );
  },
  data: function() {
      var d = Bars.findOne({slug: this.params.slug.toLowerCase()})
      if (d) {
        getReceivedDOGE(d.address)
        d.balance = Session.get("receivedDOGE").data.data.confirmed_received_value
      }
      console.log(d)
      return d
  },
  onStop: function() {
    Session.set("receivedDOGE", undefined)
  },
  after: function() {
    document.title = "Doge.gives - donation tracker"
  }
});

Router.onBeforeAction('dataNotFound', {only: 'bar'});