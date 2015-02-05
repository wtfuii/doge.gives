getReceivedDOGE = function(address) {
    Meteor.http.get("https://chain.so/api/v2/get_address_received/DOGE/" + address, function (error, result) {
            if (!error) {
             Session.set("receivedDOGE", result)
            }})
}

