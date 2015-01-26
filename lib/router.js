Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'new'
});

Router.route('/:_slug', {
  name: 'bar',
  data: function() {
      var d = Bars.findOne({slug: this.params._slug})
      console.log(console.log(d))
      console.log(Bars.findOne({slug: this.params._slug}))
      Session.set("bar", d)
      Session.set("receivedDOGE", undefined)
      getReceivedDOGE(d.address)
      return d
  },
   waitOn: function () {
    return Meteor.subscribe('bars');
  },
});