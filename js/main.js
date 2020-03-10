$(document).ready(function() {

    $("#msg").focus(function() {
        $("#invia").toggleClass("fa fa-microphone fas fa-paper-plane");
    }).blur(function() {
        $("#invia").toggleClass("fa fa-microphone fas fa-paper-plane");
    });

    $("#invia").click(function() {
        sendMsg();
    });

    $("#msg").keydown(function(event) {
        if (event.keyCode == 13) {
            sendMsg();
        }
    });

    // ffiltro ricerca contatti
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


    // al Click o alla pressione del teasto enter
    // INVIO MESSAGGIO (funzione)
          // Prendere il valore di input
          // Puliamo il contenuto del input
          // Clone di template --> new.msg
          // sostituire il testo del messaggio a .msg-txt
          // aggiungo classe user o speaker
          // append del messaggio in coda al div .messanger-container
    function sendMsg() {
        var msg = $("#msg").val();
        if (msg.trim().length > 0) {
            $("#msg").val("");
            newMsg(msg, "user");
            scroll();
            setTimeout(function() {
                newMsg("ok", "speaker")
                scroll();
            }, 1000);
        }
    }

    function newMsg(msgTxt, userSpeaker) {
        var templateMsg = $(".template .new-msg").clone();
        templateMsg.find(".msg-txt").text(msgTxt);
        templateMsg.addClass(userSpeaker);
        $(".messanger-container").append(templateMsg)
    }

// veccho metoto con funzioni divise invia e ricevi, sopra unificato con addClass

    // function send() {
    //     var messaggio = $("#msg").val();
    //     if (messaggio.trim().length > 0) {
    //         $("#msg").val("");
    //         // console.log(messaggio);
    //         var msgInviato = $(".template .user-msg").clone();
    //         // console.log(msgInviato);
    //         msgInviato.find(".msg-txt").text(messaggio);
    //         msgInviato.find(".txt-time").text(oraInvio());
    //         $(".messanger-container").append(msgInviato);
    //         scroll()
    //     }
    // }
    //
    // function receive() {
    //     setTimeout(function () {
    //         var msgInviato = $(".template .speaker-msg").clone();
    //         msgInviato.find(".msg-txt").text("Ok");
    //         msgInviato.find(".txt-time").text(oraInvio());
    //         $(".messanger-container").append(msgInviato);
    //         scroll()
    //     }, 1000);
    // }

    function oraInvio() {
        var date = new Date();
        var h = addZero(date.getHours());
        var m = addZero(date.getMinutes());
        var time = (h + ":" + m);
        return time;
    }

    function addZero(i) { //per aggiungere lo 0 a ore e minuti a cifra singola
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
