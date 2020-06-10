$(document).ready(function () {
    let socket = io();
    let current_user = null;

    socket.on('go_to_main_sreen', function (data) {
        $('#create_personnage_error').hide();
        data = data.data;
        if (data.success) {
            current_user = data.personnage;
        } else {
            $('#create_personnage_error').text(data.message);
            $('#create_personnage_error').show();
        }
    });

    $('#create_personnage').on("click", function () {
        //window.location.replace("/monstres?userId=" + data._id);
        $('#create_personnage_error').hide();

        if ($("#pseudoInput").val() != "") {
            let data_personnage = {
                "pseudo": $("#pseudoInput").val(),
                "name_class": $("#nameClasseSelect").val()
            };
            socket.emit('create_personnage', data_personnage);
        } else {
            $('#create_personnage_error').show();
        }

    });
});