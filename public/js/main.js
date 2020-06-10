function postPersonnage(event) {
    event.preventDefault();
    event.stopPropagation();
    $.post({
        url: '/create_personnage',
        data: `{
            "pseudo": "benten",
            "name_class": "mage"
        }`,
        cache: false,
        processData: false,
        contentType: "application/json",
        success: (data, textStatus, jqXHR) => {
            alert("success")
        },
        error: (jqXHR, textStatus, error) => {
            console.log(jqXHR, textStatus, error);

        }
    });
}