function renderBoolean(value) {
    let pic;
    if (value) {
        pic = 'yes.png';
    } else {
        pic = 'no.png';
    }

    return `<img src="${pic}" />`
}

function renderArchive(parcel) {
    const link = `<a href="parcel/archive/${parcel.id}">` +
        `${renderBoolean(parcel.itemProcessed)}</a>`;

    return link;
}

function renderParcelTable(parcels) {
    return `<table>
<thead>
<tr>
    <th>Id</th>
    <th>Order</th>
    <th>Destination</th>
    <th>Arrived in Haiger</th>
    <th>Sent from Haiger</th>
    <th>Arrived</th>
    <th>Comment</th>
    <th>Processed</th>
</tr>
</thead>
<tbody>
    ${parcels
.map(p => `
    <tr>
        <td>${p.id}</td>
        <td><ul>
            <li>What: ${p.order}</li>
            <li>Receiver: ${p.receiver}</li>
            <li>Ordered: ${p.orderDate}</li>
        </ul></td>
        <td>${p.destination}</td>
        <td>${renderBoolean(p.itemInHaiger)}</td>
        <td><ul>
            <li>With: ${p.sentFromHaigerWith}</li>
            <li>Date: ${p.sentFromHaigerDate}</li>
        </ul></td>
        <td>${renderBoolean(p.arrivedAtDestination)}</td>
        <td>${p.comment}</td>
        <td>${renderArchive(p)}</td>
    </tr>`).join('')}
</tbody>
</table>`;
}


module.exports = function render(parcels) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Parcel list</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <h1>current open orders</h1>
    ${renderParcelTable(parcels.filter(p => !p.itemProcessed))}
    <h1>archive</h1>
    ${renderParcelTable(parcels.filter(p => p.itemProcessed))}
</body>
</html>
    `;
};