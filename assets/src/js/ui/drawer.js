'use strict';
import { requestAnimationTargetTop } from '../utils/smoothAnimate.js'
export class Drawer {

    /**
     * @constructor ドロワーメニュー
     * @param {Number} breakpoints PCヘッダーメニューをaria-hiddenさせる下限値を設定します。
     * @param {Boolean} closed ドロワーメニューのリンクをクリックした時にメニューを閉じるかを設定します。初期値はfalse
     */
    constructor(breakpoints, closed) {
        const o = {
            focusvisible: "data-focus-visible", //body && Overlay
            triggerbutton: "js-Drawer-Button",
            overlay: "js-Drawer-Overlay",
            drawerList: "s-Drawer_Content",
            headerList: "s-Header_navList",
            headerTitle: "s-Header_Brand"
        };

        /**
         * * @type {object} focusvisible ドロワー開閉を識別するdata属性
         * * @type {object} triggerbutton ドロワーナビゲーションボタン
         * * @type {object} overlay メニュー表示時の背景を設定
         * * @type {object} drawerList ドロワーナビメニューリスト
         * * @type {object} drawerListItem ドロワーナビメニューリンク
         * * @type {object} headerList ヘッダーナビメニューリスト
         * * @type {object} headerTitle ヘッダーの高さを取得
         * * @type {boolean} closed ドロワーナビメニューをクリックしたら自動的にドロワーを閉じるかを真偽値を設定
         * * @type {number} breakpoints ブレークポイントの値をインスタンスに設定 [ドロワーの非表示領域]
         * * @type {boolean} devicesize タッチデバイスが有効な場合、PCのメニューを読み上げない
         */

        this.focusvisible = document.querySelectorAll(`[${o.focusvisible}]`);
        this.triggerbutton = document.querySelector(`.${o.triggerbutton}`);
        this.overlay = document.querySelector(`.${o.overlay}`);
        this.drawerList = document.querySelector(`.${o.drawerList}`);
        this.drawerListItem = this.drawerList.querySelectorAll('a[href*="#"]');
        this.headerList = document.querySelector(`.${o.headerList}`);
        this.headerTitle = document.querySelector(`.${o.headerTitle}`);
        this.closed = closed;
        this.breakpoints = breakpoints;
        this.devicesize = window.matchMedia(`(min-width:${this.breakpoints}px)`).matches;
        this.touchEventListener = this.touchEventListener();
        this.init();
    }

    init() {
        this._clickEventListeners(this.triggerbutton, this.touchEventListener);
        this._clickEventListeners(this.overlay, this.touchEventListener);
        this._devicesizeSetAttribute();
        this._autoClosedMenu();
    }

    // ボタンとオーバーレイがクリックされたらscriptを走らせる
    _clickEventListeners(multipleSelect, handler) {
        multipleSelect.addEventListener(handler, (e) => {
            e.preventDefault();
            this._defaultSetAttributes();
            this._focusvisibleToggler();
        });
    }

    // ボタンがtrueならメニューはaria-hiddenをfalseにする
    _defaultSetAttributes() {
        const isOpend = 'true';
        const isExpanded = this.triggerbutton.getAttribute('aria-expanded') === isOpend;
        this.triggerbutton.setAttribute('aria-expanded', !isExpanded);
        this.drawerList.setAttribute('aria-hidden', isExpanded);
    }

    // trueでオーバーレイを表示、ウインドウの固定
    _focusvisibleToggler() {
        this.focusvisible.forEach((element) => {
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
    _devicesizeSetAttribute() {
        const ishidden = 'true';
        return this.devicesize ? this.headerList.setAttribute('aria-hidden', !ishidden) : this.headerList.setAttribute('aria-hidden', ishidden);
    }

    _autoClosedMenu() {
        if (!this.drawerListItem) return;
        if (this.closed) {
            this.drawerListItem.forEach(element => {
                element.addEventListener(this.touchEventListener, (e) => {
                    requestAnimationTargetTop(e, this.headerTitle.clientHeight)
                    this.triggerbutton.click();
                });
            });
        }
        return false;
    }

    // PC: click, Tab&SP: touchstartを適用
    touchEventListener() {
        return window.ontouchstart ? 'touchstart' : 'click';
    }
}