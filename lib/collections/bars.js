Bars = new Mongo.Collection('bars')

checkTitle = function (title) {
        if (title == "") {
            throw new Meteor.Error('empty', "Think of a title for your donationbar.")
        } else {
            return true
        }
}

checkSlug = function (slug) {
    var pattern = /^[a-zA-Z0-9_-]*$/
    if (! pattern.test(slug)) {
        throw new Meteor.Error('nourl', "Not possible in URL.")
    } else if (Bars.findOne({slug: slug})) {
        throw new Meteor.Error('existurl', "A bar with this URL already exists.")
    } else {
        return true
    }
}

checkAddress = function (address, clientonly) {
    if (Meteor.isClient && clientonly) {
        var callback = function(error, result) {
            !error ? Session.set("validaddress", true) : Session.set("validaddress", false)
        }
    } else if (Meteor.isClient) {
        var callback = function(error, result) {
            console.log("SoChain API called.")
    }
    }
    return Meteor.http.get("https://chain.so/api/v2/get_address_received/DOGE/" + address, callback)
}

checkAmount = function (amount) {
    if (!isNaN(amount)) {
        throw new Meteor.Error('nonumber', "Only digits allowed.")
    } else if (amount > 0) {
        throw new Meteor.Error('negative', "Only positive numbers allowed.")
    }
    return true
}

Meteor.methods({
    checkTitle: checkTitle,
    checkSlug: checkSlug,
    checkAddress: checkAddress,
    checkAmount: checkAmount
    }
)