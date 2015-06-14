var toolbar = () => `<div class="toolbar">
        <a href="#" class="logo">ETSY</a>
        <form class="searchMe">
            <input class="search_bar" type="search">
            <input class="submit_button" type="submit">
        </form>`

var gridItem = (item) => `<a href = "#details/${item.listing_id}/${item.Shop.shop_id}">
    <img src = "${item.Images[0].url_570xN}">
    <div> 
        <p>${item.title}<span>$${item.price}</span></p>
    </div>
    </a>`


var getPreviousHref = (det_item, tren_items) => {

    var getIndexFromData = (tren_items) => {
        var theIndex
        tren_items.forEach((item, index) => {
            if (item.listing_id === det_item.listing_id) {
                theIndex = index
            }
        })
        return theIndex
    }

    if (getIndexFromData(tren_items) > 0){
        var listingID = tren_items[getIndexFromData(tren_items)-1].listing_id,
            shopID = tren_items[getIndexFromData(tren_items)-1].Shop.shop_id

        return `#details/${listingID}/${shopID}`
    } else{
        return `javascript:void(0)`
    }
}

var getNextHref = (det_item, tren_items) => {

    var getIndexFromData = (tren_items) => {
        var theIndex

        tren_items.forEach((item, index) => {
            if (item.listing_id === det_item.listing_id) {
                theIndex = index
            }
        })
        return theIndex
    }

    if (getIndexFromData(tren_items) < tren_items.length){
        var listingID = tren_items[getIndexFromData(tren_items)+1].listing_id,
            shopID = tren_items[getIndexFromData(tren_items)+1].Shop.shop_id

        return `#details/${listingID}/${shopID}`
    } else{
        return `javascript:void(0)`
    }
}


export var details = (details_item, shop_items, trending_items) =>
`${toolbar()}</div>
<div class="container details-screen">
    <div class="grid">
        <div class="image-container">
            <a href = '${getPreviousHref(details_item, trending_items)}' class="previous_listing"><div id="left-arrow"> > </div></a>
            <a href = '${getNextHref(details_item, trending_items)}' class="next_listing"><div id="left-arrow"> < </div></a>
            <img src="${details_item.Images[0].url_570xN}">
        </div>
        <div>
            <p>${details_item.title}<span>${details_item.price}</span></p>
            <p>${details_item.description}
        </div>
    </div>
    <hr>
    <div class="shop_listings">
    <h6>Other items from <span>${details_item.Shop.shop_name}</span></h6>
        ${shop_items.map((shop_item) => {
            return `${gridItem(shop_item)}`
        }).slice(0,5).join('')
}    </div>
</div>`


export var home = (trending_items) => 
`${toolbar()}<form class='filterMe'>
            In the last week: <input class='last_week' type='checkbox'>
            Items on sale: <input class='on_sale' type='checkbox'>
            Include 3 pics: <input class='three_pics' type='checkbox'>
            Filter: <input class="submit_filter" type="submit">
        </form> </div>
<div class="container home-screen">
    <div class="grid grid-2-400 grid-4-800">
        ${trending_items.map((trending_item) => {
            return `${gridItem(trending_item)}`
    }).join('')
} </div>
</div>`






