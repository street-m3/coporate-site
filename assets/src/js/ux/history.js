'use strict';

export class History {
    constructor() {
        this.previous = document.querySelector('.c-Pagination_nav-Link.-Prev');
        this.nexted = document.querySelector('.c-Pagination_nav-Link.-Next');
        this.touchEventListener = this.touchEventListener();
        this.init();
    }

    init() {
        if (!(this.previous && this.nexted)) return;
        this.previous.addEventListener(this.touchEventListener, (e) => {
            history.back();
        });
        this.nexted.addEventListener(this.touchEventListener, (e) => {
            history.forward();
        });
    }

    touchEventListener() {
        return window.ontouchstart ? 'touchstart' : 'click';
    }
}

// $(document).ready(function(){
// 	(function(){
// 	    var ans; //1つ前のページが同一ドメインかどうか
// 	    var bs  = false; //unloadイベントが発生したかどうか
// 	    var ref = document.referrer;
// 	    $(window).bind("unload beforeunload",function(){
// 	        bs = true;
// 	    });
// 	    re = new RegExp(location.hostname,"i");
// 	    if(ref.match(re)){
// 	        ans = true;
// 	    }else{
// 	        ans = false;
// 	    }
// 	    $('.historyback').bind("click",function(){
//                 var that = this;
// 	        if(ans){
// 	            history.back();
// 	            setTimeout(function(){
// 	                if(!bs){
// 	                    location.href = $(that).attr("href");
// 	                }
// 	            },100);
// 	        }else{
//                     location.href = $(this).attr("href");
//                 }
// 	        return false;
// 	    });
// 	})();
// });


// function try_back(errback) {
//     var bs = false;
//     Event.observe(window, "unload", function () {
//         bs = true
//     });
//     Event.observe(window, "beforeunload", function () {
//         bs = true
//     });
//     history.back();
//     switch (typeof errback) {
//         case "function":
//             setTimeout(function () {
//                 if (!bs) errback()
//             }, 100);
//             break;
//         case "string":
//             setTimeout(function () {
//                 if (!bs) location.href = errback
//             }, 100);
//             break;
//     }
//     return bs;
// }
// // 使い方
// // 戻るに失敗したときの処理
// try_back(function () {
//     window.status = "戻る失敗"
// });
// // もしくは戻るに失敗したときにジャンプするURL
// try_back("http://example.com");