$(document).ready(function() {

    // crea automaticamente schede contatto

    var contactsDirectory = {
        c1: {
            src: "img/avatar_random/avatar1.png",
            name: "Stefano",
            msg: "Ciao sono Stefano",
            data: 1
        },
        c2: {
            src: "img/avatar_random/avatar2.png",
            name: "Mario",
            msg: "Ciao sono Mario",
            data: 2
        },
        c3: {
            src: "img/avatar_random/avatar3.png",
            name: "Giovanni",
            msg: "Ciao sono Giovanni",
            data: 3
        },
        c4: {
            src: "img/avatar_random/avatar4.png",
            name: "Andrea",
            msg: "Ciao sono Andrea",
            data: 4
        },
        c5: {
            src: "img/avatar_random/avatar5.png",
            name: "Carlo",
            msg: "Ciao sono Carlo",
            data: 5
        },
        c6: {
            src: "img/avatar_random/avatar6.png",
            name: "Gianni",
            msg: "Ciao sono Gianni",
            data: 6
        },
        c7: {
            src: "img/avatar_random/avatar7.png",
            name: "Clara",
            msg: "Ciao sono Clara",
            data: 7
        },
    }
    console.log(contactsDirectory);
    var contactSource = $('#contact-template').html();
    var contacTemplate = Handlebars.compile(contactSource);

    for (var key in contactsDirectory) {
        var contactData = key[1];
        var contactCard = contactsDirectory[key];
        console.log(contactData);
        console.log(contactCard);
        newContact();
        // for (var i in contactCard) {
        //     var contactName = contactCard.name;
        //     var contactSrc = contactCard.src;
        //     var contactMsg = contactCard.msg
        //     console.log(contactName);
        //     console.log(contactSrc);
        //     console.log(contactMsg);
        // }
    }

    function newContact() {
        var newContact = contacTemplate(contactCard);
        $('.contact-menu').append(newContact);
    }

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


    // selezione dell'utente e della relativa chat
    $("aside .contact-card").click(function() {
        var user = $(this).data("contact");
        $("aside .contact-card").removeClass("active");
        $(this).addClass("active");
        $(".messanger-container").each(function() {
            if (user == $(this).data("contact")) {
                $(".messanger-container").removeClass("active");
                $(this).addClass("active");
            }
        });
    });

    // cambio utente sopra la chat
    $("aside .contact-card").click(function() {
        var userAvatar = $(this).find("img").attr("src");
        var userName = $(this).find("h4").text();
        $("main .contact-card.active").find("img").attr("src", userAvatar);
        $("main .contact-card.active").find("h4").text(userName);

    });

    // menu messaggi
        $('.messanger-container').on('click', '.msg-options', function() {
            $('.msg-options').not(this).parents('.new-msg').find('.msg-menu').removeClass('active');
            $(this).parents('.new-msg').find('.msg-menu').toggleClass('active');
            console.log(this);
        });
        //  cancella messaggi
        $(document).on('click', '.remove-msg', function() {
                    $(this).parents('.new-msg').remove();
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

    var source = $('#msg-template').html();
    var template = Handlebars.compile(source);

    function newMsg(msgTxt, userSpeaker) {
        var msgData = {
            msgText: msgTxt,
            sentReceived: userSpeaker
        };

        var msgTemplate = template(msgData);
        $('.messanger-container.active').append(msgTemplate);
    }

    // funzione di creazione messaggio pre handlebars
    // function newMsg(msgTxt, userSpeaker) {
    //     var templateMsg = $(".template .new-msg").clone();
    //     templateMsg.find(".msg-txt").text(msgTxt);
    //     templateMsg.addClass(userSpeaker);
    //     $(".messanger-container.active").append(templateMsg)
    // }

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
