'use strict';
import { backfaceFixed } from '../utils/backfaceFixed.js';
export { ScreenAnimate, EndAnimationMethod };

class ScreenAnimate {
    constructor(options) {
        this.defaultOptions = {
            operation: 'data-animate-effect',
            wrapper: 'js-ScreenAnimate-Context-Wrapper',
            animationTime: 2000,
            animationMax: 5000,
            primary: 'anim-MotionLayer_01',
            title: 'js-ScreenAnimate-Routine',
        };
        this.options = Object.assign(this.defaultOptions, options);

        /**
         * @type {string} this.operation 初期値はfalse
         * @type {number} this.animationtime trueになるまでの時間
         * @type {number} this.animationMax 最大秒数の設定
         * @type {string} this.primary タイトルや背景の設定
         * @type {string} this.title ロゴなどのタイトル
         * @type {string} this.wrapper コンテンツを囲むコンテナー
         */
        
        this.operation = this.options.operation;
        // this.entity = document.body.getAttribute(this.entity, 'false');
        this.animationTime = this.options.animationTime;
        this.animationMax = this.options.animationMax;
        this.primary = document.querySelector(`.${this.options.primary}`);
        this.title = document.querySelector(`.${this.options.title}`);
        this.wrapper = document.querySelector(`.${this.options.wrapper}`);
        this.init();
    }

    // bodyタグにdata属性がない場合は処理を中断する。
    // data属性の更新 & アニメーション中の背景固定
    init() {
        if (!document.body.getAttribute(this.operation)) return console.warn('bodyタグに対象のdata属性が付与されていません。');
        this._screenAnimateTitleAreaFadein();
        setTimeout(() => this._screenAnimationLoaded(), this.animationTime);
        setTimeout(() => backfaceFixed(false), this.animationTime + 1000);
        return;
    }

    _screenAnimationLoaded() {
        if (document.body.getAttribute(this.operation) == 'false') {
            document.body.dataset.animateEffect = 'true';
        }
    }

    _screenAnimateTitleAreaFadein() {
        fadeIn(this.title, 1000, 500, 0);
    }
}

class EndAnimationMethod extends ScreenAnimate {
    constructor() {
        super();
        const entity = {
            title: 'js-Slide_TextAnimation-Primary',
            sentence: 'js-Slide_TextAnimation-Secondary',
            layer: 'anim-MotionLayer_02',
            newsTicker: "c-newsTicker"
        };

        this.visualtextMain = document.querySelector(`.${entity.title}`);
        this.visualtextAdds = document.querySelector(`.${entity.sentence}`);
        this.layer = document.querySelector(`.${entity.layer}`);
        this.newsTicker = document.querySelector(`.${entity.newsTicker}`);
        this.init();
    }
    
    init() {
        if (!this.layer) return;
        this._slideAnimation();
    }

    // スクリーンアニメーションが開始したタイミングで、処理を開始する。
    _slideAnimation() {
        this.layer.addEventListener('animationstart', () => {
            this._newsTickerStart();
            this.visualtextMain.parentNode.getAttribute('aria-hidden', 'true') ? this.visualtextMain.parentNode.setAttribute('aria-hidden', 'false') : false;
        });
    }
    // ニュースティッカーを動作させる
    _newsTickerStart() {
        return this.newsTicker.getAttribute('data-first-visible') == 'false' ? this.newsTicker.setAttribute('data-first-visible', 'true') : false;
    }
}


// フェードイン用アニメーション関数
/**
 *
 * @param {object} element ターゲットのDOMを設定する
 * @param {Number} duration 不可視から可視になるまでの時間 (0だとtransitionだけの速さになる)
 * @param {Number} transition opacityのtransitionをmsで設定
 * @param {Number} displayIn none > block になるまでの時間 (pointer-eventsに関係する)
 * @returns
 */
 function fadeIn(element, duration, transition, displayIn) {
    if (!element) return;
    element.style.opacity = 0;
    element.visibility = 'hidden';
    element.style.transition = `opacity ${transition}ms ease`;
    setTimeout(() => { element.style.opacity = 1; element.visibility = 'visible'; }, duration);
    setTimeout(() => { element.style.display = 'block'; }, displayIn);
    return element, 200, 300, 100;
}
