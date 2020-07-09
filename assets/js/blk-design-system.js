var transparent = true;
var big_image;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized,
  backgroundOrange = false,
  toggle_initialized = false;

var $datepicker = $('.datepicker');
var $collapse = $('.navbar .collapse');
var $html = $('html');

(function() {
  var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function


    if ($('.tab-content .table-responsive').length != 0) {

      $('.table-responsive').each(function() {
        var ps2 = new PerfectScrollbar($(this)[0]);
      });
    }



    $html.addClass('perfect-scrollbar-on');
  } else {
    $html.addClass('perfect-scrollbar-off');
  }
})();

$(document).ready(function() {
  //  Activate the Tooltips
  $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

  // Activate Popovers and set color for popovers
  $('[data-toggle="popover"]').each(function() {
    color_class = $(this).data('color');
    $(this).popover({
      template: '<div class="popover popover-' + color_class + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    });
  });


  if ($('.square').length != 0) {

    $(document).mousemove(function(e) {
      posX = event.clientX - window.innerWidth / 2;
      posY = event.clientY - window.innerWidth / 6;

      squares1.style.transform = "perspective(500px) rotateY(" + posX * 0.15 + "deg) rotateX(" + posY * (-1.25) + "deg)";
      squares2.style.transform = "perspective(500px) rotateY(" + posX * 1.35 + "deg) rotateX(" + posY * (-0.55) + "deg)";
      squares3.style.transform = "perspective(500px) rotateY(" + posX * 1.25 + "deg) rotateX(" + posY * (-0.05) + "deg)";
      squares4.style.transform = "perspective(500px) rotateY(" + posX * 0.75 + "deg) rotateX(" + posY * (-2.55) + "deg)";
      squares5.style.transform = "perspective(500px) rotateY(" + posX * 1.05 + "deg) rotateX(" + posY * (-0.85) + "deg)";
      squares6.style.transform = "perspective(500px) rotateY(" + posX * 0.25 + "deg) rotateX(" + posY * (-0.65) + "deg)";
      squares9.style.transform = "perspective(500px) rotateY(" + posX * 0.02 + "deg) rotateX(" + posY * (-1.42) + "deg)";
      squares10.style.transform = "perspective(500px) rotateY(" + posX * 2.32 + "deg) rotateX(" + posY * (-0.02) + "deg)";

    });
  }

  // Activate the image for the navbar-collapse
  blackKit.initNavbarImage();

  $navbar = $('.navbar[color-on-scroll]');
  scroll_distance = $navbar.attr('color-on-scroll') || 500;

  // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.

  if ($('.navbar[color-on-scroll]').length != 0) {
    blackKit.checkScrollForTransparentNavbar();
    $(window).on('scroll', blackKit.checkScrollForTransparentNavbar)
  }

  $('.form-control').on("focus", function() {
    $(this).parent('.input-group').addClass("input-group-focus");
  }).on("blur", function() {
    $(this).parent(".input-group").removeClass("input-group-focus");
  });

  // Activate bootstrapSwitch
  $('.bootstrap-switch').each(function() {
    $this = $(this);
    data_on_label = $this.data('on-label') || '';
    data_off_label = $this.data('off-label') || '';

    $this.bootstrapSwitch({
      onText: data_on_label,
      offText: data_off_label
    });
  });

  // Activate Carousel
  $('.carousel').carousel({
    interval: false
  });
});

// Methods

function hideNavbarCollapse($this) {
  $this.addClass('collapsing-out');
}

function hiddenNavbarCollapse($this) {
  $this.removeClass('collapsing-out');
}


// Events

if ($collapse.length) {
  $collapse.on({
    'hide.bs.collapse': function() {
      hideNavbarCollapse($collapse);
    }
  })

  $collapse.on({
    'hidden.bs.collapse': function() {
      hiddenNavbarCollapse($collapse);
    }
  })
}


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};

$(document).on('click', '.navbar-toggler', function() {
  $toggle = $(this);

  if (blackKit.misc.navbar_menu_visible == 1) {
    $('html').removeClass('nav-open');
    blackKit.misc.navbar_menu_visible = 0;
    $('#bodyClick').remove();
    setTimeout(function() {
      $toggle.removeClass('toggled');
    }, 550);
  } else {
    setTimeout(function() {
      $toggle.addClass('toggled');
    }, 580);
    div = '<div id="bodyClick"></div>';
    $(div).appendTo('body').click(function() {
      $('html').removeClass('nav-open');
      blackKit.misc.navbar_menu_visible = 0;
      setTimeout(function() {
        $toggle.removeClass('toggled');
        $('#bodyClick').remove();
      }, 550);
    });

    $('html').addClass('nav-open');
    blackKit.misc.navbar_menu_visible = 1;
  }
});

blackKit = {
  misc: {
    navbar_menu_visible: 0
  },

  checkScrollForTransparentNavbar: debounce(function() {
    if ($(document).scrollTop() > scroll_distance) {
      if (transparent) {
        transparent = false;
        $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
      }
    } else {
      if (!transparent) {
        transparent = true;
        $('.navbar[color-on-scroll]').addClass('navbar-transparent');
      }
    }
  }, 17),

  initNavbarImage: function() {
    var $navbar = $('.navbar').find('.navbar-translate').siblings('.navbar-collapse');
    var background_image = $navbar.data('nav-image');

    if ($(window).width() < 991 || $('body').hasClass('burger-menu')) {
      if (background_image != undefined) {
        $navbar.css('background', "url('" + background_image + "')")
          .removeAttr('data-nav-image')
          .css('background-size', "cover")
          .addClass('has-image');
      }
    } else if (background_image != undefined) {
      $navbar.css('background', "")
        .attr('data-nav-image', '' + background_image + '')
        .css('background-size', "")
        .removeClass('has-image');
    }
  },

  initDatePicker: function() {
    if ($datepicker.length != 0) {
      $datepicker.datetimepicker({
        icons: {
          time: "tim-icons icon-watch-time",
          date: "tim-icons icon-calendar-60",
          up: "fa fa-chevron-up",
          down: "fa fa-chevron-down",
          previous: 'tim-icons icon-minimal-left',
          next: 'tim-icons icon-minimal-right',
          today: 'fa fa-screenshot',
          clear: 'fa fa-trash',
          close: 'fa fa-remove'
        }
      });
    }
  },

  initSliders: function() {
    // Sliders for demo purpose in refine cards section
    var slider = document.getElementById('sliderRegular');
    if ($('#sliderRegular').length != 0) {

      noUiSlider.create(slider, {
        start: 40,
        connect: [true, false],
        range: {
          min: 0,
          max: 100
        }
      });
    }

    var slider2 = document.getElementById('sliderDouble');

    if ($('#sliderDouble').length != 0) {

      noUiSlider.create(slider2, {
        start: [20, 60],
        connect: true,
        range: {
          min: 0,
          max: 100
        }
      });
    }
  }
}



// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};

//line
var ctxL = document.getElementById("chartBig").getContext('2d');
var myLineChart = new Chart(ctxL, {
type: 'line',
data: {
labels: ["SEM 1", "SEM 2", "SEM 3", "SEM 4", "SEM 5", "SEM 6", "SEM 7", "SEM 8"],
datasets: [{
label: "CLICK TO SEE PERFORMANCE",
data: [65, 59, 75, 71, 56, 55, 50, 56],
backgroundColor: [
'rgba(10, 0, 132, .2)',
],
borderColor: [
'rgba(200, 99, 132, .7)',
],
borderWidth: 2
},
{
label: "CLICK TO SEE ONLY CGPA",
data: [68, 48, 60, 59, 76, 57, 60, 47],
backgroundColor: [
'rgba(0, 137, 132, .2)',
],
borderColor: [
'rgba(0, 10, 130, .7)',
],
borderWidth: 2
}
]
},
options: {
responsive: true
}
});

