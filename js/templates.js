var toolbar = () => `<div class="toolbar">
        <a href="#" class="logo">ETSY</a>
        <form>
            <input class="search_bar" type="search">
            <input class="submit_button" type="submit">
        </form>
    </div>`

var gridItem = (item) => `<a href = "#details/${item.listing_id}/${item.Shop.shop_id}">
    <img src = "${item.Images[0].url_570xN}">
    <div> 
        <p>${item.title}<span>$${item.price}</span></p>
    </div>
    </a>`


export var details = (details_item, shop_items) => 
`${toolbar()}
<div class="container details-screen">
    <div class="grid">
        <img src="${details_item.Images[0].url_570xN}">
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

export var home = (trending_items) => `${toolbar()}
<div class="container home-screen">
    <div class="grid grid-2-400 grid-4-800 grid-6-1024">
        ${trending_items.map((trending_item) => {
            console.log(trending_item)
            return `${gridItem(trending_item)}`
    }).join('')
} </div>
</div>`
