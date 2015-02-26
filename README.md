# doge.gives
This repo contains the source code of http://doge.gives . Doge.gives is based on the JavaScript Framework [Meteor].

Doge.gives provides an easy way to create a donation bar for dogecoin fundraising campaigns. It only takes one minute to create a page that keeps track of your donation progress. The donationbar calculates the progress by counting all Dogecoins ever received by your fundraising address. Because of this, you are able to transfer coins away from that address to another address (cold storage?) without changing the progress of your fundraising campaign.

## Depending APIs
doge.gives relies on the following API services:
- http://chain.so - Fetching information about dogecoin addresses.
- http://goqr.me/ - Creating QR-codes for dogecion addresses.

## ToDos
- displaying fancy celebration animations once the fundraising target is reached.
- adding a rich text field for a campaign description
- adding an upload feature for a project logo
- adding live update of donation bar on new transactions
- accepting Bitcoin and other altcoins via ShapeShift.io
- create bars for other crypto currencies
- embeddable code for 3rd party websites
- other themes
- changing .png for direct linking

[Meteor]:https://www.meteor.com/
