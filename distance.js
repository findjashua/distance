var casper = require('casper').create({
    //verbose: true,
    //logLevel: 'debug'
}),
    maps_api_url = 'http://maps.googleapis.com/maps/api/distancematrix/json',
    origins = 'San Francisco,California,USA',
    destinations_arr = ['Alameda,California,USA', 'Berkeley,California,USA']
    destinations = destinations_arr.join('|')
    url = maps_api_url + '?origins=' + origins + '&destinations=' + destinations

casper.start(url, function() {
    var elements = JSON.parse(this.fetchText('pre')).rows[0].elements,
        results = []
    for (var i=0; i<elements.length; i++) {
        results.push({
            city: destinations_arr[i],
            distance: elements[i].distance.value/1600
        })
    }
    for (var i=0; i<results.length; i++) {
        console.log(results[i].city, ' --> ', results[i].distance)
    }
})

casper.run()
