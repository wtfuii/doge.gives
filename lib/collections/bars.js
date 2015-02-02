Bars = new Mongo.Collection('bars')

checkTitle = function(title) {
    if (title == "") {
        throw new Meteor.Error('empty', "Think of a title for your donationbar.")
    }
    else {
        return true
    }
}

checkSlug = function(slug) {
    var pattern = /^[a-zA-Z0-9_-]*$/
    if (slug === "") {
        throw new Meteor.Error('emptyslug', "Please enter a URL for your bar.")
    }
    else if (!pattern.test(slug)) {
        throw new Meteor.Error('nourl', "Not possible in URL.")
    }
    else if (Bars.findOne({
            slug: slug.toLowerCase()
        })) {
        throw new Meteor.Error('existurl', "A bar with this URL already exists.")
    }
    else {
        return true
    }
}

checkAddress = function(address, clientonly) {
    if (Meteor.isClient) {
        var callback = function(error, result) {
            console.log("SoChain API called.")
        }
    }
    if (Meteor.isClient && clientonly) {
        var callback = function(error, result) {
            error ? setErrors("address", true, {
                reason: error.response.data.data.address
            }) : setErrors("address")
        }
    }
    try {
        Meteor.http.get("https://chain.so/api/v2/get_address_received/DOGE/" + address, callback)
        return Meteor.isServer ? true : false
        return false
    }
    catch (e) {
        return false
    }
}

checkAmount = function(amount) {
    amount = parseFloat(amount)
    if (isNaN(amount)) {
        throw new Meteor.Error('nonumber', "Only digits allowed.")
    }
    else if (amount <= 0) {
        throw new Meteor.Error('negative', "Only positive numbers allowed.")
    }
    return true
}

Meteor.methods({
    checkTitle: checkTitle,
    checkSlug: checkSlug,
    checkAddress: checkAddress,
    checkAmount: checkAmount,
    submitNew: function(item) {
        if (Meteor.isServer) {
            try {
                if (checkTitle(item.title) && checkSlug(item.slug) && checkAddress(item.address) && checkAmount(item.amount)) {
                    Bars.insert(item)
                }
                else {
                    throw new Meteor.Error("validfail", "Server validation failed")
                }
            }
            catch (e) {
                throw e
            }
        }
    }

}
)