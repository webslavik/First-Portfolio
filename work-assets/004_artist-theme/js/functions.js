$(document).ready(function() {

  $("header h1").fitText(1, { minFontSize: '20px', maxFontSize: '72px' });
  $(".email").fitText(1, { minFontSize: '32px', maxFontSize: '72px' });

  workBelt();
  clientStuff();
  smoothScroll(600);
  workLoad();

});


(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );




function workBelt() {

  $('.thumb-unit').click(function() {
    $('.work-belt').css('left', '-100%');
    $('.work-container').show();
  });

  $('.work-return').click(function() {
    $('.work-belt').css('left', '0%');
    $('.work-container').hide();
  });
}


function clientStuff() {

    $('.client-unit').first().addClass('active-client');
    $('.client-logo').first().addClass('active-client');
    $('.clients-mobile-nav').children().first().addClass('active-client'); // мобильная навигация

    $('.client-logo, .clients-mobile-nav span').click(function() {
        var $this = $(this),
            $siblings = $this.parent().children();
            position = $siblings.index($this);

            $siblings.removeClass('active-client').eq(position).addClass('active-client');
            $('.client-unit').removeClass('active-client').eq(position).addClass('active-client');


    })

    $('.control-next, .control-prev').click(function() {
        var $this = $(this),
            curActiveClient = $('.clients-belt').find('.active-client');
            position = $('.clients-belt').children().index(curActiveClient);
            clientNum = $('.client-unit').length;

            if($this.hasClass('control-next')) {
                if(position < clientNum -1) {
                    $('.active-client').removeClass('active-client').next().addClass('active-client');
                } else {
                    $('.client-unit').removeClass('active-client').first().addClass('active-client');
                    $('.client-logo').removeClass('active-client').first().addClass('active-client')
                }
            } else {
                if(position === 0) {
                    $('.client-unit').removeClass('active-client').last().addClass('active-client');
                    $('.client-logo').removeClass('active-client').last().addClass('active-client')
                } else {
                    $('.active-client').removeClass('active-client').prev().addClass('active-client');
                }
            }
    })

}


function smoothScroll(duration) {
  // $('a[href^="#"]').on('click', function(e) {
  //
  //   var target = $($(this).attr('href'));
  //
  //   e.preventDefault();
  //
  //   $('html, body').animate({
  //     scrollTop: target.offset().top
  //   }, duration);
  //
  // });
}

function workLoad() {

  $('.thumb-container .thumb-unit').on('click', function() {
    var newTitle  = $(this).find('strong').text(),
        newFolder = $(this).data('folder'),
        wait = '<div class="loader">Loader...</div>',
        newHTML = 'work/' + newFolder;

    $('.project-load').html(wait).load(newHTML);
    $('.project-title').text(newTitle);

  });

}
