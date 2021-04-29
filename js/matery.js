$(function () {
    /**
     * 添加文章卡片hover效果.
     */
    let articleCardHover = function () {
        let animateClass = 'animated pulse';
        $('article .article').hover(function () {
            $(this).addClass(animateClass);
        }, function () {
            $(this).removeClass(animateClass);
        });
    };
    articleCardHover();

    /*菜单切换*/
    $('.sidenav').sidenav();

    /* 修复文章卡片 div 的宽度. */
    let fixPostCardWidth = function (srcId, targetId) {
        let srcDiv = $('#' + srcId);
        if (srcDiv.length === 0) {
            return;
        }

        let w = srcDiv.width();
        if (w >= 450) {
            w = w + 21;
        } else if (w >= 350 && w < 450) {
            w = w + 18;
        } else if (w >= 300 && w < 350) {
            w = w + 16;
        } else {
            w = w + 14;
        }
        $('#' + targetId).width(w);
    };

    /**
     * 修复footer部分的位置，使得在内容比较少时，footer也会在底部.
     */
    let fixFooterPosition = function () {
        $('.content').css('min-height', window.innerHeight - 165);
    };

    /**
     * 修复样式.
     */
    let fixStyles = function () {
        fixPostCardWidth('navContainer');
        fixPostCardWidth('artDetail', 'prenext-posts');
        fixFooterPosition();
    };
    fixStyles();

    /*调整屏幕宽度时重新设置文章列的宽度，修复小间距问题*/
    $(window).resize(function () {
        fixStyles();
    });

    /*初始化瀑布流布局*/
    $('#articles').masonry({
        itemSelector: '.article'
    });

    AOS.init({
        easing: 'ease-in-out-sine',
        duration: 700,
        delay: 100
    });

    /*文章内容详情的一些初始化特性*/
    let articleInit = function () {
        $('#articleContent a').attr('target', '_blank');

        $('#articleContent img').each(function () {
            let imgPath = $(this).attr('src');
            $(this).wrap('<div class="img-item" data-src="' + imgPath + '" data-sub-html=".caption"></div>');
            // 图片添加阴影
            $(this).addClass("img-shadow img-margin");
            // 图片添加字幕
            let alt = $(this).attr('alt');
            let title = $(this).attr('title');
            let captionText = "";
            // 如果alt为空，title来替
            if (alt === undefined || alt === "") {
                if (title !== undefined && title !== "") {
                    captionText = title;
                }
            } else {
                captionText = alt;
            }
            // 字幕不空，添加之
            if (captionText !== "") {
                let captionDiv = document.createElement('div');
                captionDiv.className = 'caption';
                let captionEle = document.createElement('b');
                captionEle.className = 'center-caption';
                captionEle.innerText = captionText;
                captionDiv.appendChild(captionEle);
                this.insertAdjacentElement('afterend', captionDiv)
            }
        });
        $('#articleContent, #myGallery').lightGallery({
            selector: '.img-item',
            // 启用字幕
            subHtmlSelectorRelative: true
        });

        // progress bar init
        const progressElement = window.document.querySelector('.progress-bar');
        if (progressElement) {
            new ScrollProgress((x, y) => {
                progressElement.style.width = y * 100 + '%';
            });
        }
    };
    articleInit();

    $('.modal').modal();

    /*回到顶部*/
    $('#backTop').click(function () {
        $('body,html').animate({scrollTop: 0}, 400);
        return false;
    });

    /*监听滚动条位置*/
    let $nav = $('#headNav');
    let $backTop = $('.top-scroll');
    // 当页面处于文章中部的时候刷新页面，因为此时无滚动，所以需要判断位置,给导航加上绿色。
    showOrHideNavBg($(window).scrollTop());
    $(window).scroll(function () {
        /* 回到顶部按钮根据滚动条的位置的显示和隐藏.*/
        let scroll = $(window).scrollTop();
        showOrHideNavBg(scroll);
    });

    function showOrHideNavBg(position) {
        let showPosition = 100;
        if (position < showPosition) {
            $nav.addClass('nav-transparent');
            $backTop.slideUp(300);
        } else {
            $nav.removeClass('nav-transparent');
            $backTop.slideDown(300);
        }
    }

    	
	$(".nav-menu>li").hover(function(){
		$(this).children('ul').stop(true,true).show();
		 $(this).addClass('nav-show').siblings('li').removeClass('nav-show');
		
	},function(){
		$(this).children('ul').stop(true,true).hide();
		$('.nav-item.nav-show').removeClass('nav-show');
	})
	
    $('.m-nav-item>a').on('click',function(){
            if ($(this).next('ul').css('display') == "none") {
                $('.m-nav-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(100);
                $(this).parent('li').addClass('m-nav-show').siblings('li').removeClass('m-nav-show');
            }else{
                $(this).next('ul').slideUp(100);
                $('.m-nav-item.m-nav-show').removeClass('m-nav-show');
            }
    });

    // 初始化加载 tooltipped.
    $('.tooltipped').tooltip();
});







//控制全屏
function enterfullscreen() { //进入全屏
    
    var docElm = document.documentElement;
    //W3C
    if(docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
    //FireFox
    else if(docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
    //Chrome等
    else if(docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
    //IE11
    else if(elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    $("#fullscreen").removeClass("fa-expand-arrows-alt").addClass("fa-desktop");
}

function exitfullscreen() { //退出全屏
   // $("#fullscreen").html("切换全屏");
    
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if(document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    $("#fullscreen").removeClass("fa-desktop").addClass("fa-expand-arrows-alt");
}

let b = false;
$('#fullscreen_li ').on('click', function() {
    b = !b;
    b ? enterfullscreen() : exitfullscreen();
})

//动态背景
 	var canvas=document.getElementById("canvas");
		canvas.onclick=function (){
			window.location="home.html";
		}
		var can=canvas.getContext("2d");
		var s=window.screen;//获取屏幕
		var w=canvas.width=s.width;//获取屏幕宽度
		var h=canvas.height=s.height;//获取屏幕高度

		can.fillStyle=color2();

		var words = Array(256).join("1").split("");
		//设置一个包含256个空元素的数组，join("1")用来把数组里的元素拼接成字符串，split("")过滤掉数组里的空元素

		setInterval(draw,50);
		


		// can.font="30px 微软雅黑"; //只设置一个不生效，一定要两个属性都设
		// //绘制实心的文本：绘制的文本，文本的坐标x，文本的坐标y
		// can.fillText("黑客帝国",100,100);
		// // setInterval(draw,50);



		function draw(){
			//can.fillRect()画一个实心矩形:坐标x，坐标y，矩形宽，举行高
			can.fillStyle='rgba(0,0,0,0.05)';
			can.fillRect(0,0,w,h);
			can.fillStyle=color2();
			words.map(function(y,n){
				text=String.fromCharCode(Math.ceil(65+Math.random()*57)); //转换为键盘上值
				x = n*10;
				can.fillText(text,x,y)
				words[n]=( y > 758 + Math.random()*484 ? 0:y+10 );
			});//数组元素的一个映射
		}

		//获取随机颜色，三种方法
		function color1(){
			var colors=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
			var color="";
			for( var i=0; i<6; i++){
				//Math.random()产生一个0-1之间的小数
				var n=Math.ceil(Math.random()*15);
				color += "" + colors[n];
				// console.log(color);
			}
			return '#'+color;
		}

		function color2(){
			var color = Math.ceil(Math.random()*16777215).toString(16); 
			// for( var i=color.length; i<6; i++ ){
			// 	color = '0'+color;
			// }
			while(color.length<6){
				color = '0'+color;
			}
			return '#'+color;
		}

		function color3(){
			return "#" + (function(color){
				return new Array(7-color.length).join("0")+color;
				//神奇的方法，总共字符串有6位，如果只产生了3位，则前面应该补三个0，在长度为7-3=4的空数组中利用join插入0，则为['',0,'',0,'',0,''],刚好三个0补在前面
			})((Math.random()*0x1000000 << 0).toString(16))
			// << 0 也是一种取整的方法
		}