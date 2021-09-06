var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
var agent = navigator.userAgent.toLowerCase();
var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);

var _w;
var _breakpoint = 720;
var _breakpointDesktop = 1099;
var _wrap;
var _navHei;
var _wid;

var _gnb;
var _menu;
var _menuIcon;
var _dim;


var _header;


$(function(){
    init();
});

function init(){
    create();
    addEvent();
}

function create(){
    _w = $(window);
    _wrap = $('#wrap');
    _wid = _w.width();
    
    _gnb = $("#gnb");
    _menu = $(".menu");
    _menuIcon = $(".menu-icon");
    _dim = $( ".dim" );

    _header = $("header");
    _navHei = _header.height();


}

function addEvent(){
    _w.on("resize", resizeEvent);
    resizeEvent();

    _w.on("scroll", scrollEvent);
    scrollEvent();

    _menuIcon.on("click", menuEvent);

    menuSlideEvent(".main-mobile-menu");
    menuSlideEvent(".sub-menu");
    tabEvent('.section-tab');

    if(_wid > _breakpoint){
      pageMove('.page-move');
    }else{
      pageMove('.page-move', -(_navHei/2));
    }

    $("#popupList .popup-list li").on("click",function(){
        $("#popupList .popup-list li").removeClass("active");
        $(this).addClass("active");
    });

    slickSlide();
    fileEvent();
    faqClickEvent();

	likeEvent();
}

function likeEvent(){
	$(".btn-like").on("click", function(){
		$(this).toggleClass("active");

		if($(this).hasClass("active")){
			$(".icon-link").children("img").attr('src', $(".icon-link").children("img").attr('src').replace('_off','_on'));
		}else{
			$(".icon-link").children("img").attr('src', $(".icon-link").children("img").attr('src').replace('_on','_off'));
		}

		

	});
}

function slickSlide(){
    if( $('#slickSlider').length > 0 ){
        $('#slickSlider').slick({
            autoplay: false,
            autoplaySpeed: 2000,
            speed: 800,
            infinite: true,
            arrows: true,
            dots: false,
            cssEase: 'linear',
            pauseOnHover: false,
            pauseOnFocus: false,
        });
    }
}



function faqClickEvent(){
    $('.fag-toggle').on('click', function(){
        var $this = $(this);

        $this.parents('dl').toggleClass('unfold').siblings().removeClass('unfold');
    });
}

function menuSlideEvent($selector){
    $($selector).find("dl").children("dt").on("click",
        function(){
            if(!$(this).parent("dl").hasClass("active")){
                $($selector).find("dl").removeClass("active");
                $($selector).find("dl").find("dd").slideUp();
            }
        
            $(this).parent("dl").toggleClass("active");
            $(this).next("dd").slideToggle();
        }
    );
}

function tabEvent($selector){
    $($selector).find('.tab-list').children('li').on('click', function(){
        var idx = $(this).index(),
            tabList = $($selector).find('.tab-list').children('li');

        tabList.removeClass("active");
        $(this).addClass("active");

        $($selector).find('.tab-view').hide();
        $($selector).find('.tab-view').eq(idx).show();
    });
}

function scrollEvent(){
    var st = $(window).scrollTop();
    var sh = $(window).height() / 1.2;
    var section = $('.section');

    section.each(function(i){
        if( st > section.eq(i).offset().top - sh){
            $(this).addClass('active');
        }
        //  else {
        //     $(this).removeClass('active');
        // }
    });

    // if(st > _navHei){
    //     _header.addClass("fixed");
    // }else{
    //     _header.removeClass("fixed");
    // }

    
}


function resizeEvent(){
    _wid = _w.width();
    _navHei = _header.height();

    $('.responsive').each(function() {
        var $src = $(this).attr("src");
        var val = (_wid > _breakpointDesktop) ? $src.replace('mobile', 'pc') : $src.replace('pc', 'mobile');

        $(this).attr("src", val);
    });

    if(_wid > _breakpointDesktop){
        _gnb.show();
        _menu.hide();
        _menuIcon.removeClass("active");
        _dim.hide();    
    }else{        
        _gnb.hide();
        _menu.show();        
    }
}


function menuEvent(){
    $(this).toggleClass("active");

    if(_menuIcon.hasClass("active")){
        _dim.show();
        _gnb.slideDown();
        _header.addClass("change");

        $(".main-mobile-menu").find("dl").removeClass("active");
        $(".main-mobile-menu").find("dd").hide();

    }else{
        _dim.hide();
        _gnb.slideUp();
        _header.removeClass("change");
    }
}


function pageMove($selector, $position){
	if($position == undefined) $position = 0;

	var selector = $selector;
	$(selector).on('click', function (e) {
		e.preventDefault();

		var _top = $($(this).attr('href'));
		var $target = _top.offset().top;

        // 모바일에서 gnb 클릭시 gnb 닫기 
        if(_wid < _breakpoint){
        _menuIcon.removeClass("active");
        _dim.hide();
        _gnb.slideUp();
        _header.removeClass("change");
        }

		$('html,body').animate({
			scrollTop: $target+$position
		}, 500);


	});
}


function popupClose($dimName, $idName){
    var dimName = $dimName;
    var $popupLayer = $("#"+$idName);
    $(dimName).hide();
    $popupLayer.hide();
}

function popupOpen($dimName, $idName){
    var dimName = $dimName;
    var $popupLayer = $("#"+$idName);
    $(dimName).show();
    $popupLayer.show();
    popupPosition($popupLayer);
}


function popupPosition($popupLayer) {
    var st = $(window).scrollTop();
    var winHeight = $(window).height();
    var popupHeight = $popupLayer.outerHeight();

    var topValue = (st + ( winHeight / 2 - popupHeight / 2 ));
    if($(window).height() < popupHeight){
        topValue = st;
    }

    $popupLayer.css({top:topValue});
}

 // 210827 추가
function fileEvent(){
    var fileTarget = $('.form-cont #fileUpload');
    fileTarget.on('change', function(){
        if(window.FileReader){
            var filename = $(this)[0].files[0].name;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }
        $(this).parent().siblings('.fake-file-name').val(filename);
    });
}