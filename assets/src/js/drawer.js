window.addEventListener('load', () => {
    new Drawer(992, true);
});

class Drawer {

    /**
     * @constructor ドロワーメニュー
     * @param {Number} breakpoints PCヘッダーメニューをaria-hiddenさせる下限値を設定します。
     * @param {Boolean} closed ドロワーメニューのリンクをクリックした時にメニューを閉じるかを設定します。初期値はfalse
     */
    constructor(breakpoints, closed) {
        const o = {
            openVisibleSet: "data-focus-visible", //body && Overlay
            triggerButton: "s-drawer__button",
            toggleOverlay: "s-drawer__overlay",
            openMenuNavlist: "s-drawer-navMenu",
            headerNavlist: "s-header__navlist",
            drawerNavlinks: "s-drawer a",
            headerNavBrand: "s-header__brand"
        };

        /**
         * * @type {Object} ドロワー開閉を識別するdata属性
         * * @type {Object} ドロワーナビゲーションボタン
         * * @type {Object} メニューが開かれている時の背景を設定
         * * @type {Object} ドロワーメニューリスト
         * * @type {Object} ヘッダーメニューリスト
         * * @type {Number} ブレークポイントの値をインスタンスに設定 [ドロワーの非表示領域]
         */

        this.openVisibleSet = document.querySelectorAll(`[${o.openVisibleSet}]`);
        this.triggerButton = document.querySelector(`.${o.triggerButton}`);
        this.toggleOverlay = document.querySelector(`.${o.toggleOverlay}`);
        this.openMenuNavlist = document.querySelector(`.${o.openMenuNavlist}`);
        this.headerNavlist = document.querySelector(`.${o.headerNavlist}`);
        this.headerNavBrand = document.querySelector(`.${o.headerNavBrand}`);
        this.openMenuNavlistItem = this.openMenuNavlist.querySelectorAll('a[href^="#"]');
        this.closed = closed;
        this.breakpoints = breakpoints;
        this.deviceConfig = window.matchMedia(`(min-width:${this.breakpoints}px)`).matches;
        this.touchEventListener = this.touchEventDetection(); //タッチイベントの分岐
        this.drawerNavlinks = document.querySelectorAll(`.${o.drawerNavlinks}`);
        this.init();
    }

    init() {
        this._clickEventListeners(this.triggerButton, this.touchEventListener);
        this._clickEventListeners(this.toggleOverlay, this.touchEventListener);
        this._deviceConfigSetAttribute();
        this._autoClosedMenu();
    }

    // ボタンとオーバーレイがクリックされたらscriptを走らせる
    _clickEventListeners(multipleSelect, handler) {
        multipleSelect.addEventListener(handler, (e) => {
            e.preventDefault();
            this._defaultSetAttributes();
            this._openMenuFocusVisibleToggle();
        });
    }

    // ボタンがtrueならメニューはaria-hiddenをfalseにする
    _defaultSetAttributes() {
        const isOpend = 'true';
        const isExpanded = this.triggerButton.getAttribute('aria-expanded') === isOpend;
        this.triggerButton.setAttribute('aria-expanded', !isExpanded);
        this.openMenuNavlist.setAttribute('aria-hidden', isExpanded);
    }

    // trueでオーバーレイを表示、ウインドウの固定
    _openMenuFocusVisibleToggle() {
        this.openVisibleSet.forEach((element) => {
            if (element.getAttribute('data-focus-visible') === 'true') {
                element.dataset.focusVisible = 'false';
                document.body.style.overflow = '';
            } else {
                element.dataset.focusVisible = 'true';
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // PC表示の時はドロワーメニューを読み上げない
    _deviceConfigSetAttribute() {
        const ishidden = 'true';
        this.deviceConfig ? this.headerNavlist.setAttribute('aria-hidden', !ishidden) : this.headerNavlist.setAttribute('aria-hidden', ishidden);
    }

    _autoClosedMenu() {
        if (this.closed) {
            this.openMenuNavlistItem.forEach(element => {
                element.addEventListener(this.touchEventListener, () => {
                    this.triggerButton.click();
                });
            });
        }
        return false;
    }

    // PC: click, Tab&SP: touchstartを適用
    touchEventDetection() {
        return window.ontouchstart ? 'touchstart' : 'click';
    }
}