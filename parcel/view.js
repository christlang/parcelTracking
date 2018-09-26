module.exports = function render(parcels) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Movie list</title>
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
            <th>Sent with</th>
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
    <td>${p.itemInHaiger}</td>
    <td>${p.sentFromHaigerDate}</td>
    <td>${p.sentFromHaigerWith}</td>
    <td>${p.arrivedAtDestination}</td>
    <td>${p.comment}</td>
    <td>${p.itemProcessed}</td>
</tr>`)
        .join('')}
        </tbody>
    </table>
</body>
</html>
    `;
};