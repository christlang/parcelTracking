module.exports = function render(parcel) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Parcel list</title>
        <link rel="stylesheet" href="/style.css"/>
    </head>
    <body>
        <form action="/parcel/save" method="post">
            <input type="hidden" id="id" name="id" value="${parcel.id}" />
            <div>
                <label for="id">Order:</label>
                <input type="text" id="order" name="order" value="${parcel.order}" />
            </div>
            <div>
                <label for="id">destination:</label>
                <input type="text" id="destination" name="destination" value="${parcel.destination}" />
            </div>
            <div>
                <label for="id">receiver:</label>
                <input type="text" id="receiver" name="receiver" value="${parcel.receiver}" />
            </div>
            <div>
                <label for="id">order date:</label>
                <input type="date" id="orderDate" name="orderDate" value="${parcel.orderDate}" />
            </div>
            <div>
                <label for="id">item in Haiger:</label>
                <input type="checkbox" id="itemInHaiger" name="itemInHaiger" ${parcel.itemInHaiger ? "checked" : ""} />
            </div>
            <div>
                <label for="id">sent from Haiger (date):</label>
                <input type="date" id="sentFromHaigerDate" name="sentFromHaigerDate" value="${parcel.sentFromHaigerDate}" />
            </div>
            <div>
                <label for="id">sent from Haiger (with):</label>
                <input type="text" id="sentFromHaigerWith" name="sentFromHaigerWith" value="${parcel.sentFromHaigerWith}" />
            </div>
            <div>
                <label for="id">arrived at destination:</label>
                <input type="date" id="arrivedAtDestination" name="arrivedAtDestination" value="${parcel.arrivedAtDestination}" />
            </div>
            <div>
                <label for="id">comment:</label>
                <input type="text" id="comment" name="comment" value="${parcel.comment}" />
            </div>
            <div>
                <label for="id">item processed:</label>
                <input type="checkbox" id="itemProcessed" name="itemProcessed" ${parcel.itemProcessed ? "checked" : ""}/>
            </div>
            <div>
                <button type="submit">save</button>
            </div>
        </form>
    </body>
    </html>
    `;
};