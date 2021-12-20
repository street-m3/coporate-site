'use strict';

window.addEventListener('load', () => {
    new MicroMethod();
});

class MicroMethod {
    constructor() {
        const o = {
            scrollSlideText: "js-AutoScroll-MoveText",
            headerNavListItem: "s-header__navlist--item",
            headerNavClosest: "data-hover",
            dropdownMenu: "js-header-dropdown",
            drapdownMenuDetails: "s-header-dropdown",
            paginationNavItem: "page-numbers",
        };
        const TextAnimationObjects = {
            TextAnimateTitleMain: "js-slide-Animate-title",
            TextAnimateSentence: "js-slide-Animate-sentence",
            TextAnimateAddCls: "-visible",
            TextAnimateTime: "3300",
            TextAnimationDelay: "100",
        };
        this.scrollSlideText = document.querySelector(`.${o.scrollSlideText}`)
        this.headerNavListItem = document.querySelectorAll(`.${o.headerNavListItem}`);
        this.headerNavClosest = document.querySelector(`[${o.headerNavClosest}]`);
        this.dropdownMenu = document.querySelectorAll(`.${o.dropdownMenu}`);
        this.drapdownMenuDetails = document.querySelector(`.${o.drapdownMenuDetails}`);
        this.paginationNavItem = document.querySelectorAll(`.${o.paginationNavItem}`);
        // TextAnimation DOM
        this.TextAnimateTitleMain = document.querySelector(`.${TextAnimationObjects.TextAnimateTitleMain}`);
        this.TextAnimateSentence = document.querySelector(`.${TextAnimationObjects.TextAnimateSentence}`);
        this.TextAnimateAddCls = TextAnimationObjects.TextAnimateAddCls;
        this.TextAnimateTime = TextAnimationObjects.TextAnimateTime;
        this.TextAnimationDelay = TextAnimationObjects.TextAnimationDelay;
        // AddCustomEventListeners
        this.hoverEventStart = this.hoverEventStart();
        this.hoverEventEnd = this.hoverEventEnd();
        this.clickEventListeners = this.clickEventListeners();
        // Fucntion init
        this._CurrentPagePlacement();
        this._scrollSlideEffect();
        this._headerNavMenuHover();
        this._dropDownMenu();
        this._paginationAriaLabel();
        this._textAnimated();
    }

    _CurrentPagePlacement() {
        const page = document.querySelector('main');
        const attr = page.getAttribute('data-placement');
        console.log(attr);
        // console.log(page);
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

    _textAnimated() {
        if(!(this.TextAnimateTitleMain && this.TextAnimateSentence)) return;
        setTimeout(() => {
            this.TextAnimateTitleMain.classList.add(this.TextAnimateAddCls);
            setTimeout(() => { this.TextAnimateSentence.classList.add(this.TextAnimateAddCls); }, this.TextAnimationDelay);
        }, this.TextAnimateTime);
    }

    _contentLinkAll() {
        const anchor = document.querySelectorAll('a');
        anchor.forEach((element) => {
            if (element.hasAttribute('target') === false || element.getAttribute('target') !== '_blank') return;
            element.setAttribute('rel', 'noopener noreferrer');
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

// 別ページから遷移してきた時の処理
document.addEventListener('DOMContentLoaded', (e) => {
    new LocationController();
});
class LocationController {
    constructor() {
        this.anchors = document.querySelectorAll('header a');
        this.drawerlink = document.querySelectorAll('.s-drawer a');
        this.urlHash = location.hash;
        this.urlTarget = document.getElementById(this.urlHash.replace('#', ''));
        this.headerClientHeight = document.querySelector('.s-header__brand').clientHeight;
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