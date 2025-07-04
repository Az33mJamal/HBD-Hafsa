$(window).on('load', function () {
    $('.loading').fadeOut('fast');
    $('.container').fadeIn('fast');
});

$(document).ready(function () {
    let vw = $(window).width() / 2;
    let isPaused = false;
    let balloonIntervals = [];

    $(window).resize(function () {
        vw = $(window).width() / 2;
        $('.balloons').stop(); // stop all animations
        positionBalloons();
    });

    function positionBalloons() {
        const offsets = [-350, -250, -150, -50, 50, 150, 250, 350];
        for (let i = 1; i <= 8; i++) {
            $('#b' + i + i).animate({ top: 240, left: vw + offsets[i - 1] }, 500);
        }
    }

    $('#turn_on').click(function () {
        $('.bulb').each(function () {
            $(this).addClass(`bulb-glow-${this.id.split('_')[1]}`);
        });
        $('body').addClass('peach');
        $(this).fadeOut('slow').delay(5000).promise().done(() => {
            $('#play').fadeIn('slow');
        });
    });

    $('#play').click(function () {
        $('.song')[0].play();
        $('.bulb').each(function () {
            $(this).addClass(`bulb-glow-${this.id.split('_')[1]}-after`);
        });
        $('body').css('background-color', '#FFF').addClass('peach-after');
        $(this).fadeOut('slow').delay(6000).promise().done(() => {
            $('#bannar_coming').fadeIn('slow');
        });
    });

    $('#bannar_coming').click(function () {
        $('.bannar').addClass('bannar-come');
        $(this).fadeOut('slow').delay(6000).promise().done(() => {
            $('#balloons_flying').fadeIn('slow');
        });
    });

    function startBalloonLoop(id) {
        function animateBalloon() {
            if (isPaused) return;
            const randLeft = 1000 * Math.random();
            const randTop = 500 * Math.random();
            $('#' + id).animate({ left: randLeft, bottom: randTop }, 10000, animateBalloon);
        }
        animateBalloon();
    }

    $('#balloons_flying').click(function () {
        $('.balloon-border').animate({ top: -500 }, 8000);
        $('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
        $('#b2,#b3,#b6,#b8').addClass('balloons-rotate-behaviour-two');

        for (let i = 1; i <= 8; i++) {
            startBalloonLoop(`b${i}`);
        }

        $(this).fadeOut('slow').delay(5000).promise().done(() => {
            $('#cake_fadein').fadeIn('slow');
        });
    });

    $('#cake_fadein').click(function () {
        $('.cake').fadeIn('slow');
        $(this).fadeOut('slow').delay(3000).promise().done(() => {
            $('#light_candle').fadeIn('slow');
        });
    });

    $('#light_candle').click(function () {
        $('.fuego').fadeIn('slow');
        $(this).fadeOut('slow').promise().done(() => {
            $('#wish_message').fadeIn('slow');
        });
    });

    $('#wish_message').click(function () {
        vw = $(window).width() / 2;

        for (let i = 1; i <= 8; i++) {
            $(`#b${i}`).attr('id', `b${i}${i}`);
        }

        positionBalloons();

        $('.balloons').css('opacity', '0.9');
        $('.balloons h2').fadeIn(3000);
        $(this).fadeOut('slow').delay(6000).promise().done(() => {
            $('#story').fadeIn('slow');
        });
    });

    $('#story').click(function () {
        $(this).fadeOut('slow');
        $('.cake').fadeOut('fast').promise().done(() => {
            $('.message').fadeIn('slow');
        });

        // function msgLoop(i) {
        //     if (i >= 50) {
        //         $("p:nth-child(49)").fadeOut('slow').promise().done(() => {
        //             $('.cake').fadeIn('fast');
        //         });
        //         return;
        //     }
        let msgPaused = false;

        function msgLoop(i) {
            if (i >= 50) {
                $("p:nth-child(49)").fadeOut('slow').promise().done(() => {
                    $('.cake').fadeIn('fast');
                });
                return;
            }
        
            const $current = $("p:nth-child(" + i + ")");
            const $next = $("p:nth-child(" + (i + 1) + ")");
        
            function continueLoop() {
                if (msgPaused) {
                    setTimeout(continueLoop, 200); // Poll until resumed
                    return;
                }
        
                $next.fadeIn('slow').delay(1000).promise().done(() => {
                    msgLoop(i + 1);
                });
            }
        
            $current.fadeOut('slow').delay(800).promise().done(() => {
                continueLoop();
            });
        }


            $("p:nth-child(" + i + ")").fadeOut('slow').delay(800).promise().done(() => {
                i++;
                $("p:nth-child(" + i + ")").fadeIn('slow').delay(1000).promise().done(() => {
                    msgLoop(i);
                });
            });
        }

        msgLoop(0);
    });

    // Optional Pause/Resume Buttons
    $('#pause_animations').click(function () {
        isPaused = true;
        $('.balloons').stop(true, false);
    });

    $('#resume_animations').click(function () {
        isPaused = false;
        for (let i = 1; i <= 8; i++) {
            startBalloonLoop(`b${i}${i}`);
        }
    });
});
