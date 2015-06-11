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

var EtsyRouter = backbone.Router.extend({
    routes: {
    
      'details/:id/:shop_id': 'details',
        'search/:query': 'search',
        '*default': 'home'
    },

    home: function(){
        api.getTrending().then(function(trending_json){
            document.body.innerHTML = templates.home(trending_json.results)
            this.currentTrending = trending_json.results
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
    }
})

var router = new EtsyRouter()

$('body').on('submit', 'form', (e) => {
    e.preventDefault()
    window.location.hash = `search/${document.querySelector('.search_bar').value}`
})
