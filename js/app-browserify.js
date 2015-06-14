"use strict";

// es5 polyfills, powered by es5-shim
require("es5-shim")
    // es6 polyfills, powered by babel
require("babel/register")

var Promise = require('es6-promise').Promise,
    $ = require('jQuery'),
    backbone = require('backbone')

import * as templates from './templates.js'
import * as api from './etsy-api.js'

function qs(selector){
	return document.querySelector(selector)
}

//-----------------------------------------------------------------------------------------

var EtsyRouter = backbone.Router.extend({
    routes: {
    
     	'details/:id/:shop_id': 'details',
       	'search/:query': 'search',
       	// 'home/:filter' : 'home_filtering',
       	// 'search/:filter' : 'search_filtering',
        '*default': 'home'
    },

    home: function(){
        api.getTrending().then(function(trending_json){
            document.body.innerHTML = templates.home(trending_json.results)
            this.currentTrending = trending_json.results

            this.listenForFilterChanges(trending_json);
        }.bind(this))

    },
    search: (query) => {
        api.getSearch(query).then((search_json) => {
            document.body.innerHTML = templates.home(search_json.results)
        })
    },
    details: function(item_id, shop_id){
    	$.when(
    		api.getDetails(item_id),
    		api.getShopItems(shop_id)
    	).then(function(details_json, shop_json, thetrendings){
    		if (!this.currentTrending){
    			api.getTrending().then(function(trending_json){
 					this.currentTrending = trending_json.results
    				document.body.innerHTML = templates.details(details_json[0].results[0], shop_json[0].results, this.currentTrending)
    			})
    		} else {
            document.body.innerHTML = templates.details(details_json[0].results[0], shop_json[0].results, this.currentTrending)
        	}
		}.bind(this))
    },
    initialize: () => {
        backbone.history.start()
    },

    listenForFilterChanges: function(trending_listings){

    	qs('.filterMe').addEventListener('submit', function(evt){
    		evt.preventDefault()
    		console.log(trending_listings)
    		if (qs('.last_week').checked){
    			var filtered_weekly = trending_listings.results.filter((listing) => {
    				var posting_date = listing.creation_tsz
    				if(posting_date*1000+7*(24)*(60)*(60)*1000 > new Date().getTime()) return true
    			})
    			if (filtered_weekly.length === 0){
    				document.body.innerHTML = `${templates.home(filtered_weekly)} <p>NO TRENDING ITEMS IN THE LAST WEEK</p>`
    			} else {
    			document.body.innerHTML = `<p>Trending items posted since last week:</p> ${templates.home(filtered_weekly)}`
    			}
    		} 
    		
    		if(qs('.on_sale').checked){
    			var filtered_sale = trending_listings.results.filter((listing) => {
    				var description_array = listing.description.split(" ")
    				var is_there_sale = description_array.reduce((a, word) => {
    					var matches = word === 'sale' ? a.push(word) : a
    					return matches
    				}, [])
    				console.log(is_there_sale)
    				if(is_there_sale.length > 0) return true
    			})
    			if (filtered_sale.length === 0){
    				document.body.innerHTML = `${templates.home(filtered_sale)} <p>NO ITEMS ON SALE AT THE MOMENT</p>`
    			} else {
    				document.body.innerHTML = `<p>Items on sale:</p> ${templates.home(filtered_sale)}`
    			}
    		} 
    		
    		if(qs('.three_pics').checked){
    			var filtered_img = trending_listings.results.filter((listing) => {
    				if (listing.Images.length >= 3) return true
    			})
    			if (filtered_img.length === 0){
    				document.body.innerHTML = `${templates.home(filtered_img)} <p>NO LISTINGS WITH 3 IMAGES</p>`
    			} else {
    				document.body.innerHTML = `<p>Items with 3 Images at least in listing:</p> ${templates.home(filtered_img)}`
    			}
    		}
    	})
    }

})

var router = new EtsyRouter()

$('body').on('submit', 'form', (e) => {
    e.preventDefault()
    window.location.hash = `search/${document.querySelector('.search_bar').value}`
})
