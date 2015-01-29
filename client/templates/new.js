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
        Router.go('bar', {
            slug: bar.slug
        })
    },

    'keyup #projectTitle': function(e) {
        var input = $("#projectTitle").val()
        try {
            checkTitle(input)
            $("#projectTitle").closest($(".form-group")).removeClass("has-error has-feedback")
            //$("#projectTitle").closest($(".form-group")).find($(".form-control-feedback")).css("display", "none")
        }
        catch (err) {
           $("#projectTitle").closest($(".form-group")).addClass("has-error has-feedback")
           $("#projectTitle").closest($(".form-group")).find($(".errordescription")).text(err.reason)
           //$("#projectTitle").closest($(".form-group")).find($(".form-control-feedback")).css("display", "")
        }
    },

    'keypress #slug': function(e) {
        var input = $("#slug").val()
        Meteor.call('checkSlug', input, function(error, result) {
            if (error) {
                Session.set("checkSlug", false)
            }
            else {
                Session.set("checkSlug", true)
            }
            console.log(Session.get("checkSlug"))
        })
    }

})