$(function () {
    var manager = {
        // Désactive le boutton d'ajout de PAC si les champs Inputs sont vides
        disableSubmit: function () {
            if (!$('#pseudo').val() || !$('#firstName').val() || !$('#tel').val()) {
                $('.submitButton').attr('disabled', true);
            }
        },
        // Customise la couleur des labels lors du focus
        styleForm: function () {
            $('#pseudo, #firstName, #tel').focus(function (e) {
                $(e.target).prev().css('color', 'black');
            });
        },
        // initialise le script
        loadScript: function () {
            manager.disableSubmit();
            manager.styleForm();
        }
    }
    manager.loadScript();
})