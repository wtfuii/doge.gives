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
    return amount > 0 && !isNaN(amount)
}

Meteor.methods({
    checkTitle: checkTitle,
    checkSlug: checkSlug,
    checkAddress: checkAddress,
    checkAmount: checkAmount
    }
)