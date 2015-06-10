//PULLING INFORMATION FROM ETSY

var $ = require('jquery'),
	apikey = '1eo056a9yr71cmypv21lp6vf'

var etsy = {	
	trending : (key) => `https://openapi.etsy.com/v2/listings/active.js?api_key=${apikey}&callback=?&includes=Images,Shop`,
	search : (search_query, key) => `https://openapi.etsy.com/v2/listings/active.js?api_key=${apikey}&keywords=${search_query}&callback=?&includes=Images`,
	details : (item_id, key) => `https://openapi.etsy.com/v2/listings/${item_id}.js?api_key=${apikey}&callback=?&includes=Images,Shop`,
	shop : (shop_id, key) => `https://openapi.etsy.com/v2/shops/${shop_id}/listings/active.js?api_key=${apikey}&callback=?&includes=Images,Shop`
}

export var getTrending = () => {
	return $.getJSON(etsy.trending(apikey))
}

export var getSearch = (search_query) => {
	return $.getJSON(etsy.search(search_query, apikey))
}

export var getDetails = (item_id) => {
	return $.getJSON(etsy.details(item_id, apikey))
}

export var getShopItems = (shop_id) => {
	return $.getJSON(etsy.shop(shop_id, apikey))
}
//Returning promises resolving in JSON objects.