$(function() {
    function after_form_submitted(data) {
        if (data.result == 'success') {
            $('#success_message').show();
            $('#error_message').hide();
            // Redireciona para a página de agradecimento após o sucesso
            window.location.href = '/lp/linha-leve/thanu.html/';
        } else {
            $('#error_message').html('<ul></ul>'); // Limpa erros anteriores antes de adicionar novos

            jQuery.each(data.errors, function(key, val) {
                $('#error_message ul').append('<li>' + key + ':' + val + '</li>');
            });
            $('#success_message').hide();
            $('#error_message').show();

            // Reverte a resposta no botão
            $('button[type="button"]', $form).each(function() {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if (label) {
                    $btn.prop('type', 'submit');
                    $btn.text(label);
                    $btn.prop('orig_label', '');
                }
            });
        } // else
    }

    $('#contact_form').submit(function(e) {
        e.preventDefault();

        $form = $(this);
        // Mostra alguma resposta no botão
        $('button[type="submit"]', $form).each(function() {
            $btn = $(this);
            $btn.prop('type', 'button');
            $btn.prop('orig_label', $btn.text());
            $btn.text('Enviando...');
        });

        $.ajax({
            type: "POST",
            url: 'handler.php',
            data: $form.serialize(),
            success: after_form_submitted,
            dataType: 'json'
        });
    });
});
