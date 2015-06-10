var toolbar = () => `<div class="toolbar">
        <a href="#" class="logo">ETSY</a>
        <form>
            <input class="search_bar" type="search">
            <input class="submit_button" type="submit">
        </form>
    </div>`

export var details = (details_item) => `<div class="container details-screen">
    ${toolbar()}
    <div class="grid">
        <img src="${details_item.Images[0].url_570xN}">
        <div>
            <p>${details_item.title}<span>${details_item.price}</span></p>
            <p>${details_item.description}
        </div>
    </div>
</div>`

export var home = (trending_items) => `<div class="container home-screen">
    ${toolbar()}
    <div class="grid grid-2-400 grid-4-800 grid-6-1024">
        ${trending_items.map((trending_item) => {
            return `<a href = "#details/${trending_item.listing_id}">
    <img src = "${trending_item.Images[0].url_570xN}">
    <div> 
        <p>${trending_item.title}<span>$${trending_item.price}</span></p>
    </div>
    </a>`
    }).join('')
} </div>
</div>`
