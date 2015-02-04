Template.bar.helpers({
    percent: function() { 
        d = ( 100 / Template.currentData().amount * Template.currentData().balance ).toFixed(2)
        if (d > 100) {
            return 100
        }
        return d
    },
    complete: function (percent) {
        return percent == 100 ? true : false
    }
})

Template.bar.rendered = function() {
    this.$('#qRButton').popover()
}