function subscribe() {
    var email = document.getElementById('subscribe-email').value;
    if (email) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/subscribe", true); // Ensure the endpoint is correct
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var response = JSON.parse(xhr.responseText);
                if (xhr.status === 200) {
                    alert(response.message);
                } else {
                    alert('Error: ' + response.message);
                }
            }
        };
        xhr.send(JSON.stringify({
            email: email,
            to: "bhumireddypujith@gmail.com"
        }));
    } else {
        alert("Please enter a valid email address.");
    }
}
