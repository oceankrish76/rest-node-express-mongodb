function deleteme(item) {
    fetch("/" + item.innerText, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "delete"
        }).then(res => res.json())
        .then(res2 => {
            console.log(res2)
            location.reload()
        });
}