Template.bar.helpers({
    balance: function() { return Session.get("receivedDOGE") },
    percent: function(balance, target) { 
        d = Math.round( 100 / target * balance )
        if (d > 100) {
            return 100
        }
        return d
    }
})