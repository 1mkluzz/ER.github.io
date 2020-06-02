$(function() {

  $('[data-skin]').on('click', function(e) {
    e.preventDefault();
    var skin = $(this).data('skin');
    $('#style-skin').attr('href', 'assets/css/skin-'+ skin +'.css');
  });

  $('#sb-left-side').on('click', function() {
    $('.sidebar-boxed').removeClass('sidebar-right');
  });

  $('#sb-right-side').on('click', function() {
    $('.sidebar-boxed').addClass('sidebar-right');
  });

  $('#sb-skin-light').on('click', function() {
    $('.sidebar-boxed').removeClass('sidebar-dark');
  });

  $('#sb-skin-dark').on('click', function() {
    $('.sidebar-boxed').addClass('sidebar-dark');
  });

  $("ul li a[href^='#'], .myLogo a[href^='#']").on('click', function(e) {

        e.preventDefault();

        var target = this.hash,
        $target = $(target);

        // animate
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top-20
        }, 500, 'swing', function () {
            window.location.hash = target;
        });

  });


  // Add a class in the #device section
  $('.myLogo a, ul li a').click(function() {
      $('ul li.active').removeClass('active');
      $(this).closest('li').addClass('active');
  });

});



     SyntaxHighlighter.all()
