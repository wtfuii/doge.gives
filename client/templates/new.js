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
        try {
        Meteor.call('submitNew', bar, function(error, result) {
            if (error) {
                console.log(error)
            } else {
            Router.go('bar', {
                slug: bar.slug
        })
            }
        })
        } catch (e) {
            console.log("catched recall")
        }
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
        Meteor.call('checkSlug', input, function(error, result) {
            if (error) {
                setErrors("slug", true, error)
            }
            else {
                setErrors("slug")
            }
        })
    },
    
    'keyup #address': function(e) {
        var input = $("#address").val()
        checkAddress(input, true)
    },
    
    'change #amount, keyup #amount': function(e) {
        var input = $("#amount").val()
        try {
            checkAmount(input)
            setErrors("amount")
        }
        catch (err) {
           setErrors("amount", true, err)
        }
    }
})

setErrors = function(field, isError, error) {
    if (isError) {
        Session.set(field, {formGroup: "has-error has-feedback", formControlFeedback: "display: block;", errordescription: error.reason})
    } else {
        Session.set(field, {formGroup: "", formControlFeedback: "display: none;", errordescription: ""})
    }
}