Template.new.helpers({
    fieldStyling: function (field, element) {
        if (Session.get(field)) {
            return Session.get(field)[element]
        }
    }
})

Template.new.events({
    'submit form': function(e) {
        e.preventDefault();
        var bar = {
            title: $(e.target).find('[id=title]').val(),
            slug: $(e.target).find('[id=slug]').val(),
            address: $(e.target).find('[id=address]').val(),
            amount: $(e.target).find('[id=amount]').val(),
        }
        var b = Bars.insert(bar)
        Router.go('bar', {
            slug: bar.slug
        })
    },

    'keyup #title': function(e) {
        var input = $("#title").val()
        try {
            checkTitle(input)
            setErrors("title")
        }
        catch (err) {
           setErrors("title", true, err)
        }
    },

    'keyup #slug': function(e) {
        var input = $("#slug").val()
        Meteor.call('checkSlug', input, function(err, result) {
            if (error) {
                Session.set("slug", false)
            }
            else {
                Session.set("checkSlug", true)
            }
            console.log(Session.get("checkSlug"))
        })
    }

})

setErrors = function(field, isError, error) {
    if (isError) {
        Session.set(field, {formGroup: "has-error has-feedback", formControlFeedback: "display: block;", errordescription: error.reason})
    } else {
        Session.set("title", {formGroup: "", formControlFeedback: "display: none;", errordescription: ""})
    }
}