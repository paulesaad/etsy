//PULLING INFORMATION FROM ETSY

var $ = require('jquery'),
	apikey = '1eo056a9yr71cmypv21lp6vf',
	trending = (key) => `https://openapi.etsy.com/v2/listings/active.js?api_key=${apikey}&callback=?&includes=Images`,
	search = (search_query, key) => `https://openapi.etsy.com/v2/listings/active.js?api_key=${apikey}&keywords=${search_query}&callback=?&includes=Images`,
	details = (item_id, key) => `https://openapi.etsy.com/v2/listings/${item_id}.js?api_key=${apikey}&callback=?&includes=Images,Shop`

export var getTrending = () => {
	return $.getJSON(trending(apikey))
}

export var getDetails = (item_id) => {
	return $.getJSON(details(item_id, apikey))
}

export var getSearch = (search_query) => {
	return $.getJSON(search(search_query, apikey))
}

//Returning promises resolving in JSON objects.