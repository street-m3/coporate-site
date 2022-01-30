'use strict';
// 別ページから遷移してきた時の処理
document.addEventListener('DOMContentLoaded', () => {
    new LocationController();
});

window.addEventListener('load', () => {
    new MicroMethod();
});

class MicroMethod {
    constructor() {
        const o = {
            scroll_trigger_string: "data-scroll-trigger",
            header_hover_trigger: "s-header_navList-Item",
            header_wrapper: "data-hover",
            header_dropdown: "js-header-dropdown",
            header_dropdown_menu: "s-header-dropdown",
            pagination: "page-numbers",
            header: 's-header_Brand',
            smoothscroll_anchors: 'data-smooth-scroll',
        };
        this.scroll_trigger_string = document.querySelector(`[${o.scroll_trigger_string}]`)
        this.header_hover_trigger = document.querySelectorAll(`.${o.header_hover_trigger}`);
        this.header_wrapper = document.querySelector(`[${o.header_wrapper}]`);
        this.header_dropdown = document.querySelectorAll(`.${o.header_dropdown}`);
        this.header_dropdown_menu = document.querySelector(`.${o.header_dropdown_menu}`);
        this.pagination = document.querySelectorAll(`.${o.pagination}`);
        this.smoothscroll_anchors = document.querySelectorAll(`[${o.smoothscroll_anchors}]`);
        this.header = document.querySelector(`.${o.header}`);
        this.anchors = document.querySelectorAll('a');
        // AddCustomEventListeners
        this.hoverEventListenersStart = this.hoverEventListenersStart();
        this.hoverEventListenersEnded = this.hoverEventListenersEnded();
        this.clickEventListeners = this.clickEventListeners();
        // Fucntion init
        this._currentGetPlacement();
        this._scroll_animation_string();
        this._header_nav_hover();
        this._header_dropdown();
        this._pagination_arialabel();
        this._anchor_noopener();
        this._smoothScrollToggler();
    }

    _currentGetPlacement() {
        const page = document.querySelector('main');
        const attr = page.getAttribute('data-placement');
        console.log(attr);
    }

    /**
     * ドロップダウンメニュー
     */
    _header_dropdown() {
        this.header_dropdown.forEach(element => {
            element.addEventListener(this.hoverEventListenersStart, () => {
                this.header_dropdown_menu.setAttribute('aria-hidden', 'false');
            });
            element.addEventListener(this.hoverEventListenersEnded, () => {
                this.header_dropdown_menu.setAttribute('aria-hidden', 'true');
            });
        });

        return;
    }

    /**
     * スクロールイベント検知したらテキストをスライドさせる
     */
    _scroll_animation_string() {
        window.addEventListener('scroll', () => {
            if (!this.scroll_trigger_string) return;
            this.scroll_trigger_string.style.transform = `translateX(${window.scrollY / 7}px)`;
        });

        return;
    }

    /**
     * グローバルナビゲーションをホバーさせたらコンテナのdata属性を更新する
     */
    _header_nav_hover() {
        this.header_hover_trigger.forEach(element => {
            const hoverAnchor = element.querySelector('a');
            element.addEventListener(this.hoverEventListenersStart, () => {
                this.header_wrapper.dataset.hover = "true";
                hoverAnchor.classList.add("active");
            });
            element.addEventListener(this.hoverEventListenersEnded, () => {
                this.header_wrapper.dataset.hover = "false";
                hoverAnchor.classList.remove("active");
            });
        });

        return;
    }

    _pagination_arialabel() {
        if (!this.pagination) return;
        for (let i = 0; i < this.pagination.length; i++) {
            const paginationCounter = this.pagination[i].textContent;
            let pagination_set_string = "ページ" + paginationCounter;
            if (this.pagination[i].getAttribute('aria-current') == 'page' && paginationCounter.match(/^(\d+)$/)) {
                pagination_set_string = "現在のページは、" + paginationCounter + "ページ目です。";
            }
            this.pagination[i].setAttribute('aria-label', pagination_set_string);
        }

        return;
    }

    _anchor_noopener() {
        this.anchors.forEach((element) => {
            if (element.hasAttribute('target') === false || element.getAttribute('target') !== '_blank') return;
            element.setAttribute('rel', 'noopener noreferrer');
        });

        return;
    }

    _smoothScrollToggler() {
        this.smoothscroll_anchors.forEach(anchor => {
            if (anchor.dataset.smoothScroll == 'false') return;
            anchor.addEventListener('click', (e) => {
                targetPosition(e, this.header.clientHeight);
            });
        });

        return;
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

class LocationController {
    constructor() {
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
        return;
    }
}