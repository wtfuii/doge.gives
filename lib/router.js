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
      console.log(d)
      getReceivedDOGE(d.address)
      return d
  }
});