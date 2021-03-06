Template.new.helpers({
    fieldStyling: function (field, element) {
        if (Session.get(field)) {
            return Session.get(field)[element]
        }
    },
    getcurrentSlug: function() {
        var r = Session.get('currentSlug')
        return r.length > 20 ? r.substring(0,20) + "..." : r
    }
})

Template.new.events({
    'submit form': function(e) {
        e.preventDefault();
        var bar = {
            title: $(e.target).find('[id=title]').val(),
            slug: $(e.target).find('[id=slug]').val().toLowerCase(),
            address: $(e.target).find('[id=address]').val(),
            amount: $(e.target).find('[id=amount]').val(),
            description: $(".epicarea").val()
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

    'keyup #title, submit form': function(e) {
        var input = $("#title").val()
        try {
            checkTitle(input)
            setErrors("title")
        }
        catch (err) {
           setErrors("title", true, err)
        }
    },

    'keyup #slug, submit form': function(e) {
        var input = $("#slug").val()
        Session.set('currentSlug', input)
        Meteor.call('checkSlug', input, function(error, result) {
            if (error) {
                setErrors("slug", true, error)
            }
            else {
                setErrors("slug")
            }
        })
    },
    
    'keyup #address, submit form': function(e) {
        var input = $("#address").val()
        checkAddress(input, true)
    },
    
    'change #amount, keyup #amount, submit form': function(e) {
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