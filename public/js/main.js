$(document).ready(function () {
    var socket = io();

    function postPersonnage(event) {
        event.preventDefault();
        event.stopPropagation();
        $.post({
            url: '/create_personnage',
            data: `{
            "pseudo": "${$("#pseudoInput").val()}",
            "name_class": "${$("#nameClasseSelect").val()}"
        }`,
            cache: false,
            processData: false,
            contentType: "application/json",
            success: (data, textStatus, jqXHR) => {
                //alert("success")
                window.location.replace("/monstres?userId=" + data._id);
            },
            error: (jqXHR, textStatus, error) => {
                console.log(jqXHR, textStatus, error);
                alert(error)
            }
        });
    }
});