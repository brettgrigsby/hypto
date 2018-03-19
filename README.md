# Hypto

Hypto is an expressJs service that deploys cryptoGnomes to poll the Bittrex, Poloniex, and Bitfinex APIs to constantly update their orderBook values and make calculations for volume. When requests are made for data, usually for multiple exchanges, our friend combotron swoops in to combine the data that the different cryptoGnomes have been polling to return it in a useful format.

### Was that a good idea?

Initially I thought that grabbing the entire order book for each exchange on a regular basis would be the best way to stay in sync with 'the truth', which is in fact an advantage. What I did not anticipate is the Bittrex API only allows me to get 500 bids and 500 asks (no limit or pagination???). Given more time, I would take a different approach to either the Bittrex api alone, or the idea of constantly polling the order books in general. It was cool to make the gnomes though.

## Endpoints

Hypto has only 2 endpoints

Combined Order Books:  

`/orderBooks?market=<market>&exchanges=<exchanges>`

and

Combined Volume:  

`/volume?market=<market>&exchanges=<exchanges>`

for both endpoints, `market` and `exchanges` are required url params.

`market` will always be 1 value that is a string (ie 'BTC-LTC')

`exchanges` can be multiple strings, comma delineated (ie 'bittrex,poloniex')

## License

Copyright © Nothing To See Here LLC
