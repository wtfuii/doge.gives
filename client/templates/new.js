Template.new.events({
    'submit form': function(e) {
        e.preventDefault();
        var bar = {
            title: $(e.target).find('[id=projectTitle]').val(),
            slug: $(e.target).find('[id=slug]').val(),
            address: $(e.target).find('[id=donationAddress]').val(),
            amount: $(e.target).find('[id=amount]').val(),
        }
        var b = Bars.insert(bar)
        Router.go('bar', {_slug: bar.slug})
    }
})