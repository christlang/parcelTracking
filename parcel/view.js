function renderBoolean(value) {
    let pic;
    if (value) {
        pic = 'yes.png';
    } else {
        pic = 'no.png';
    }

    return `<img src="${pic}" />`
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
    <table>
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
    <td>${renderBoolean(p.itemProcessed)}</td>
</tr>`)
        .join('')}
        </tbody>
    </table>
</body>
</html>
    `;
};