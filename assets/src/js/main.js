'use strict';

window.addEventListener('load', () => {
    new MicroMethod();
});

class MicroMethod {
    constructor() {
        const o = {
            scrollSlideText: "js-autoScroll-String",
            headerNavListItem: "s-header_navList-Item",
            headerNavClosest: "data-hover",
            dropdownMenu: "js-header-dropdown",
            drapdownMenuDetails: "s-header-dropdown",
            paginationNavItem: "page-numbers",
            newsTicker: "data-first-visible"
        };
        this.scrollSlideText = document.querySelector(`.${o.scrollSlideText}`)
        this.headerNavListItem = document.querySelectorAll(`.${o.headerNavListItem}`);
        this.headerNavClosest = document.querySelector(`[${o.headerNavClosest}]`);
        this.dropdownMenu = document.querySelectorAll(`.${o.dropdownMenu}`);
        this.drapdownMenuDetails = document.querySelector(`.${o.drapdownMenuDetails}`);
        this.paginationNavItem = document.querySelectorAll(`.${o.paginationNavItem}`);
        this.newsTicker = document.querySelector(`[${o.newsTicker}]`);
        // AddCustomEventListeners
        this.hoverEventListenersStart = this.hoverEventListenersStart();
        this.hoverEventListenersEnded = this.hoverEventListenersEnded();
        this.clickEventListeners = this.clickEventListeners();
        // Fucntion init
        this._currentGetPlacement();
        this._scrollAnimationString();
        this._headerNavMenuHover();
        this._dropDownMenu();
        this._paginationAriaLabel();
        this._anchorSetAttributes();
        this._newsTickerStart();
    }

    _currentGetPlacement() {
        const page = document.querySelector('main');
        const attr = page.getAttribute('data-placement');
        console.log(attr);
    }

    /**
     * ドロップダウンメニュー
     */
    _dropDownMenu() {
        this.dropdownMenu.forEach(element => {
            element.addEventListener(this.hoverEventListenersStart, () => {
                this.drapdownMenuDetails.setAttribute('aria-hidden', 'false');
            });
            element.addEventListener(this.hoverEventListenersEnded, () => {
                this.drapdownMenuDetails.setAttribute('aria-hidden', 'true');
            });
        });
    }

    /**
     * スクロールイベント検知したらテキストをスライドさせる
     */
    _scrollAnimationString() {
        window.addEventListener('scroll', () => {
            if (!this.scrollSlideText) return;
            this.scrollSlideText.style.transform = `translateX(${window.scrollY / 7}px)`;
        });
    }

    /**
     * グローバルナビゲーションをホバーさせたらコンテナのdata属性を更新する
     */
    _headerNavMenuHover() {
        this.headerNavListItem.forEach(element => {
            const hoverAnchor = element.querySelector('a');
            element.addEventListener(this.hoverEventListenersStart, () => {
                this.headerNavClosest.dataset.hover = "true";
                hoverAnchor.classList.add("active");
            });
            element.addEventListener(this.hoverEventListenersEnded, () => {
                this.headerNavClosest.dataset.hover = "false";
                hoverAnchor.classList.remove("active");
            });
        });
    }

    _paginationAriaLabel() {
        if (!this.paginationNavItem) return;
        for (let i = 0; i < this.paginationNavItem.length; i++) {
            const paginationCounter = this.paginationNavItem[i].textContent;
            let pagination_set_string = "ページ" + paginationCounter;
            if (this.paginationNavItem[i].getAttribute('aria-current') == 'page' && paginationCounter.match(/^(\d+)$/)) {
                pagination_set_string = "現在のページは、" + paginationCounter + "ページ目です。";
            }
            this.paginationNavItem[i].setAttribute('aria-label', pagination_set_string);
        }
    }

    _anchorSetAttributes() {
        const anchor = document.querySelectorAll('a');
        anchor.forEach((element) => {
            if (element.hasAttribute('target') === false || element.getAttribute('target') !== '_blank') return;
            element.setAttribute('rel', 'noopener noreferrer');
        });
    }

    _newsTickerStart() {
        document.querySelector('.anim-MotionLayer_03').addEventListener('animationstart', () => {
            this.newsTicker.dataset.firstVisible = 'false' ? 'true' : '';
        })
    }

    hoverEventListenersStart() {
        return window.ontouchstart ? 'touchstart' : 'mouseover';
    }

    hoverEventListenersEnded() {
        return window.ontouchstart ? 'touchend' : 'mouseout';
    }

    clickEventListeners() {
        return window.ontouchstart ? 'touchstart' : 'click';
    }
}

// 別ページから遷移してきた時の処理
window.addEventListener('load', (e) => {
    new LocationController();
});
class LocationController {
    constructor() {
        this.anchors = document.querySelectorAll('header a');
        this.drawerlink = document.querySelectorAll('.s-drawer a');
        this.urlHash = location.hash;
        this.urlTarget = document.getElementById(this.urlHash.replace('#', ''));
        this.headerClientHeight = document.querySelector('.s-header_Brand').clientHeight;
        this.init();
    }

    init() {
        if (!this.urlTarget) return;
        if (this.urlHash) {
            const targetPosition = this.urlTarget.offsetTop - this.headerClientHeight;
            _smoothScroll(targetPosition);
        }
    }
}