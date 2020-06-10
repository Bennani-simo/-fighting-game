let current_user = null;

$(document).ready(function () {
    let socket = io();

    socket.on('go_to_main_sreen', function (data) {
        $('#create_personnage_error').hide();
        if (data) {
            if (data.success) {
                current_user = data.personnage;
                $('#mainApp').html(data.next_screen);
            } else {
                $('#create_personnage_error').text(data.message);
                $('#create_personnage_error').show();
            }
        }
        $('#create_personnage_error').text("Une erreur inconnu s'est produite");
        $('#create_personnage_error').show();

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


    $(document).on('click', 'body .attaque_monstre', function () {
        let monstre_name = $(this).data('monstre');
        let pseudo = $(this).data('perso');
        socket.emit('attaque_monstre', { 'monstre': monstre_name, 'pseudo': pseudo });


    });
});