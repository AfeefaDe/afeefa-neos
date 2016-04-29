function publish(id) {
    $.ajax({
        url: '/api/publish/' + id,
        method: 'PUT'
    });
}

function lock(id) {
    $.ajax({
        url: '/api/lock/' + id,
        method: 'PUT'
    });
}