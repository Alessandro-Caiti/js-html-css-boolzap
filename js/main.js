$(document).ready(function() {

    $("#msg").focus(function() {
        $("#invia").toggleClass("fa fa-microphone fas fa-paper-plane");
    }).blur(function() {
        $("#invia").toggleClass("fa fa-microphone fas fa-paper-plane");
    });

    $("#invia").click(function() {
        // var messaggio = $("#msg").val();
        // $("#msg").val("");
        // console.log(messaggio);
        // var msgInviato = $(".template .user-msg").clone();
        // console.log(msgInviato);
        // msgInviato.find(".msg-txt").text(messaggio);
        // msgInviato.find(".txt-time").text(oraInvio());
        // $(".messanger-container").append(msgInviato);
        send();
        receive();
    });

    $("#msg").keypress(function(event) {
        if (event.keyCode == 13) {
            send();
            receive();
        }
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


    function send() {
        var messaggio = $("#msg").val();
        $("#msg").val("");
        // console.log(messaggio);
        var msgInviato = $(".template .user-msg").clone();
        // console.log(msgInviato);
        msgInviato.find(".msg-txt").text(messaggio);
        msgInviato.find(".txt-time").text(oraInvio());
        $(".messanger-container").append(msgInviato);
        scroll()
    }

    function receive() {
        setTimeout(function () {
            var msgInviato = $(".template .speaker-msg").clone();
            msgInviato.find(".msg-txt").text("Ok");
            msgInviato.find(".txt-time").text(oraInvio());
            $(".messanger-container").append(msgInviato);
            scroll()
        }, 1000);
    }

    function oraInvio() {
        var date = new Date();
        var h = addZero(date.getHours());
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

    function scroll() {
        var pixelScroll = $(".messanger-container").height();
        $(".messanger-container").scrollTop(pixelScroll);
    }


});
