'use strict';

window.addEventListener('load', () => {
    new MicroMethod();
});

class MicroMethod {
    constructor() {
        const o = {
            headerContainer: "data-scroll",
            pageVisual: "js-visual-offsetHeight",
            headerBreakpoint: 992,
            scrollSlideText: "js-horizontal-move-text",
            headerNavListItem: "s-header__navlist--item",
            headerNavClosest: "data-hover",
            dropdownMenu: "js-header-dropdown",
            drapdownMenuDetails: "s-header-dropdown",
        };
        this.headerContainer = document.querySelector(`[${o.headerContainer}]`);
        this.headerBreakpoint = window.matchMedia(`(min-width: ${o.headerBreakpoint}px)`).matches;
        this.scrollSlideText = document.querySelector(`.${o.scrollSlideText}`)
        this.pageVisual = document.querySelector(`.${o.pageVisual}`);
        this.headerNavListItem = document.querySelectorAll(`.${o.headerNavListItem}`);
        this.headerNavClosest = document.querySelector(`[${o.headerNavClosest}]`);
        this.dropdownMenu = document.querySelectorAll(`.${o.dropdownMenu}`);
        this.drapdownMenuDetails = document.querySelector(`.${o.drapdownMenuDetails}`);
        this.hoverEventStart = this.hoverEventStart();
        this.hoverEventEnd = this.hoverEventEnd();
        this.clickEventListeners = this.clickEventListeners();
        this._headerScrollBackground();
        this._scrollSlideEffect();
        this._headerNavMenuHover();
        this._dropDownMenu();
    }

    /**
     * 100vhスクロールさせたらheaderの背景色が変化
     */
    _headerScrollBackground() {
        const visualHeigt = this.pageVisual.clientHeight;
        window.addEventListener('scroll', () => {
            if (window.scrollY > visualHeigt && this.headerBreakpoint) {
                this.headerContainer.dataset.scroll = "true";
            } else {
                this.headerContainer.dataset.scroll = "false";
            }
        });
    }

    /**
     * ドロップダウンメニュー
     */
    _dropDownMenu() {
        this.dropdownMenu.forEach(element => {
            element.addEventListener(this.hoverEventStart, () => {
                this.drapdownMenuDetails.setAttribute('aria-hidden', 'false');
            });
            element.addEventListener(this.hoverEventEnd, () => {
                this.drapdownMenuDetails.setAttribute('aria-hidden', 'true');
            });
        });
    }

    /**
     * スクロールイベント検知したらテキストをスライドさせる
     */
    _scrollSlideEffect() {
        window.addEventListener('scroll', () => {
            if(!this.scrollSlideText) return;
            this.scrollSlideText.style.transform = `translateX(${window.scrollY / 7}px)`;
        });
    }

    /**
     * グローバルナビゲーションをホバーさせたらコンテナのdata属性を更新する
     */
    _headerNavMenuHover() {
        this.headerNavListItem.forEach(element => {
            const hoverAnchor = element.querySelector('a');
            element.addEventListener(this.hoverEventStart, () => {
                this.headerNavClosest.dataset.hover = "true";
                hoverAnchor.classList.add("active");
            });
            element.addEventListener(this.hoverEventEnd, () => {
                this.headerNavClosest.dataset.hover = "false";
                hoverAnchor.classList.remove("active");
            });
        });
    }

    hoverEventStart() {
        return window.ontouchstart ? 'touchstart' : 'mouseover';
    }

    hoverEventEnd() {
        return window.ontouchstart ? 'touchend' : 'mouseout';
    }

    clickEventListeners() {
        return window.ontouchstart ? 'touchstart' : 'click';
    }
}