$(document).ready(function() {
    var text = $('#text');
    text.html("<b>Email Recieved: </b>");

    var expand = $('#close');
    expand.hide();

    var sec1 = $('#sec1-sql');
    var sec2 = $('#sec2-sql');
    var sec3 = $('#sec3-sql');


    var close = $('#close-sql');
    close.on('click', function() {
        sec2.hide();
        sec3.removeClass("col-md-5");
        sec3.addClass("col-md-10");
        sec3.css('transition-duration','1s');
        sec3.css('transition-timing-function','linear');
        $('.main1').css('border-left', '8px solid rgb(114, 114, 114)');
        expand.show();
    });

    expand.on('click', function() {
        sec2.show();
        sec3.removeClass("col-md-10");
        sec3.addClass("col-md-5");
        sec3.css('transition-duration','0s');
        $('.main1').css('border-left', '0px solid rgb(114, 114, 114)');
        expand.hide();
    });


    var list = [];
    var i = 1;
    var j = 1;
    var k = 1;
    var s;

    $('#btn1').click(function (e) {
        if(i === 1) {
            var img_src = $('#btn1').parent().siblings()[0].id;
            list.push(img_src);
            console.log(list);
            $(this).attr('disabled', 'true');
        }
    });

    $('#btn2').click(function (e) {
        if(j === 1) {
            var img_src = $('#btn2').parent().siblings()[0].id;
            list.push(img_src);
            console.log(list);
            $(this).attr('disabled', 'true');
        }
    });

    $('#btn3').click(function (e) {
        if(k === 1) {
            var img_src = $('#btn3').parent().siblings()[0].id;
            list.push(img_src);
            console.log(list);
            $(this).attr('disabled', 'true');
        }
    });

    var sec4 = $('#sec4-sql');
    sec4.hide();

    $('#code').on('click', function () {
        $('#report').removeClass('active');
        sec1.show();
        sec2.show();
        sec3.show();
        sec4.hide();
        $('#code').addClass('active');
    });

    $('#report').on('click', function () {
        $('#code').removeClass('active');
        sec1.show();
        sec2.hide();
        sec3.hide();
        sec4.show();
        console.log(list);
        $('#report').addClass('active');
        $('#image-one').hide();
        $('#image-two').hide();
        $('#image-three').hide();
        for(var i in list) {
            if(list[i] === 'img1') {
                $('#image-one').show();
            } else if (list[i] === 'img2') {
                $('#image-two').show();
            } else if (list[i] === 'img3') {
                $('#image-three').show();
            }
        }
    })

    var h;
    $('#btn-one').on('click', function () {
        $('#image-one').hide();
        if(j === 1) {
            var img_src = $('#btn2').parent().siblings()[0].id;
            list.push(img_src);
            console.log(list);
            $(this).attr('disabled', 'true');
        }
    });

    $('#btn-two').on('click', function () {
        $('#image-one').hide();
    });

    $('#btn-three').on('click', function () {
        $('#image-one').hide();
    });

});