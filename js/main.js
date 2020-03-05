$(document).ready(function() {

    $("#invia").click(function() {
        var messaggio = $("#msg").val();
        $("#msg").val("");
        console.log(messaggio);
        var msgInviato = $(".template .user-msg").clone();
        console.log(msgInviato);
        msgInviato.find(".msg-txt").text(messaggio);
        msgInviato.find(".txt-time").text(oraInvio());
        $(".messanger-container").append(msgInviato);
    });


    $("#invia").click(function() {
        setTimeout(function () {
            var msgInviato = $(".template .speaker-msg").clone();
            msgInviato.find(".msg-txt").text("Ok");
            msgInviato.find(".txt-time").text(oraInvio());
            $(".messanger-container").append(msgInviato);
        }, 1000);
    });


    $("#src").keyup(function(event) {
        var carattereFiltro = $(this).val().toLowerCase();
        $(".contact-menu h4").each(function() {
            if ($(this).text().toLowerCase().includes(carattereFiltro)) {
                $(this).parentsUntil(".contact-menu").show();
            } else {
                $(this).parentsUntil(".contact-menu").hide();
            }
        });
    });


    function oraInvio() {
        var date = new Date();
        var h = date.getHours();
        var m = addZero(date.getMinutes());
        var time = (h + ":" + m);
        return time;
    }

    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }



});
