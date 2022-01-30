document.addEventListener('DOMContentLoaded', () => {
    const defaultIndex = document.querySelector('[data-placement="top"]');
    if (!defaultIndex) {
        return document.body.removeAttribute('data-animate-effect');
    } else {
        new ScreenAnimateInnerHTML();
        new ScreenAnimate();
        new TextAnimation();
    }
});

const backfaceFixed = (fixed) => {
    /**
     * 表示されているスクロールバーとの差分を計測し、背面固定時はその差分body要素に余白を生成する
     */
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.paddingRight = fixed ? `${scrollbarWidth}px` : '';
    document.documentElement.style.minHeight = fixed ? `100vh` : '';

    /**
     * スクロール位置を取得する要素を出力する(`html`or`body`)
     */
    const scrollingElement = () => {
        const browser = window.navigator.userAgent.toLowerCase();
        if ('scrollingElement' in document) return document.scrollingElement;
        if (browser.indexOf('webkit') > 0) return document.body;
        return document.documentElement;
    };

    /**
     * 変数にスクロール量を格納
     */
    const scrollY = fixed ?
        scrollingElement().scrollTop :
        parseInt(document.body.style.top || '0');

    /**
     * CSSで背面を固定
     */
    const styles = {
        height: '100vh',
        left: '0',
        overflow: 'hidden',
        position: 'fixed',
        top: `${scrollY * -1}px`,
        width: '100vw',
    };

    Object.keys(styles).forEach((key) => {
        document.body.style[key] = fixed ? styles[key] : '';
    });

    /**
     * 背面固定解除時に元の位置にスクロールする
     */
    if (!fixed) window.scrollTo(0, scrollY * -1);
};

/**
 * ローディング用メイン
 */

class ScreenAnimate {
    constructor() {
        const o = {
            dataEffectSetAttribute: 'data-animate-effect',
            animateTime: 2000,
            animateMax: 5000,
            screenFirst: 'anim-MotionLayer_01',
            title: 'js-ScreenAnimate-Routine',
            wrap: 'js-ScreenAnimate-Context-Wrapper',
        };
        
        /**
         * @type {string} this.dataEffectSetAttribute 初期値はfalse
         * @type {number} this.animateTime trueになるまでの時間
         * @type {number} this.animateMax 最大秒数の設定
         * @type {string} this.screenFirst タイトルや背景の設定
         * @type {string} this.title ロゴなどのタイトル
         * @type {string} this.wrap コンテンツを囲むコンテナー
         */

        this.dataEffectSetAttribute = o.dataEffectSetAttribute;
        this.animateTime = o.animateTime;
        this.animateMax = o.animateMax;
        this.screenFirst = document.querySelector(`.${o.screenFirst}`);
        this.title = document.querySelector(`.${o.title}`);
        this.wrap = document.querySelector(`.${o.wrap}`);
        this.init();
    }

    init() {
        if (!this.dataEffectSetAttribute) return;
        this.screenAnimateSettings();
        setTimeout(() => { this.screenAnimateLoaded(); }, this.animateTime);
        setTimeout(() => { backfaceFixed(false); }, this.animateTime + 1000);
        return;
    }

    screenAnimateLoaded() {
        if (document.body.getAttribute(this.dataEffectSetAttribute) == 'false') {
            document.body.dataset.animateEffect = 'true';
        }
    }

    screenAnimateSettings() {
        fadeIn(this.title, 1000, 500, 0);
    }
}

/**
 * @constructor ローディングに必要なHTML
 */
class ScreenAnimateInnerHTML {
    constructor() {
        backfaceFixed(true);
        document.body.insertAdjacentHTML('afterbegin', this._initHTML());
    }

    _initHTML() {
        // c-ScreenAnimate_Container = アニメーションに必要なレイヤーをまとめる
        // c-ScreenAnimate_Layer = スクリーンに表示するレイヤー
        // c-ScreenAnimate_Context-Wrapper = bodyタグ直下、背景固定と不可視->可視にするレイヤー
        return document.body.outerHTML = `
        <div class="c-ScreenAnimate_Container">
            <div class="c-ScreenAnimate_Layer anim-MotionLayer_01">
                <div class="c-ScreenAnimate_Routine js-ScreenAnimate-Routine">
                    <svg xmlns="http://www.w3.org/2000/svg" width="99px" height="104.5px" viewBox="0 0 62.468 65.983">
                        <g id="sp_logo" transform="translate(0)">
                            <g id="グループ_10248" data-name="グループ 10248" transform="translate(6.276)">
                                <g id="グループ_10247" data-name="グループ 10247" transform="translate(0 0)">
                                    <g id="グループ_10245" data-name="グループ 10245" transform="translate(6.6 6.564)">
                                        <path id="パス_4088" data-name="パス 4088"
                                            d="M477.18,103.439a21.489,21.489,0,0,0-19.373-13.223,15.658,15.658,0,0,1,2.889,8.332,13.311,13.311,0,0,1,1.842.61,13.516,13.516,0,1,1-18.256,15.85,15.653,15.653,0,0,1-8.347-2.872,21.436,21.436,0,1,0,41.245-8.7Zm-33.095,5.741a13.51,13.51,0,0,1,10.782-10.816,9.891,9.891,0,0,0-4.132-7.113,21.532,21.532,0,0,0-13.781,13.813,10.085,10.085,0,0,0,1.072,1.266A9.852,9.852,0,0,0,444.085,109.181Z"
                                            transform="translate(-435.935 -90.216)" fill="#fff" >
                                    </g>
                                    <g id="グループ_10246" data-name="グループ 10246">
                                        <path id="パス_4089" data-name="パス 4089"
                                            d="M444.926,82.892a13.669,13.669,0,0,0-5.819-.183,9.868,9.868,0,0,1-10.764,10.8,13.593,13.593,0,0,0,.2,5.818q.37.018.74.017a15.647,15.647,0,0,0,15.666-15.665Q444.945,83.284,444.926,82.892ZM429.279,73.8a9.906,9.906,0,0,1,3.719.722,9.767,9.767,0,0,1,1.983,1.084,21.441,21.441,0,0,1,6.618-1.039c.147,0,.295,0,.441,0a15.674,15.674,0,1,0-21.835,21.884c0-.162-.006-.326-.006-.489a21.434,21.434,0,0,1,1.023-6.571,9.875,9.875,0,0,1,8.056-15.6Z"
                                            transform="translate(-413.606 -68.01)" fill="#fff" >
                                    </g>
                                </g>
                            </g>
                            <path id="パス_4092" data-name="パス 4092"
                                d="M-29.078-3.556h.245v-.357a2.2,2.2,0,0,0-.651-.553l-.252.364h-.532l-.651-.245v1.638A8.524,8.524,0,0,1-31.276.168l.427.336a4.9,4.9,0,0,0,.518-1.757h.6v.777c0,.308-.056.308-.6.287l.133.721c.889,0,1.12-.1,1.12-.791Zm-.651.616h-.525v-.616h.525Zm0,1.141h-.553c.014-.308.021-.476.021-.6h.532ZM-26-2.688c-.07-.084-.168-.224-.28-.392h1.288v-.315a2.267,2.267,0,0,0-.553-.511l-.28.336h-.42a4.435,4.435,0,0,0,.56-.63l-.581-.238a4.319,4.319,0,0,1-.378.658l.378.21h-.693a6.633,6.633,0,0,0,.182-.8L-27.5-4.4a5.894,5.894,0,0,1-.161.826h-.476l.42-.322a5.088,5.088,0,0,0-.581-.546l-.35.245a6.18,6.18,0,0,1,.336.623h-.4v.49h.882c-.07.154-.112.252-.189.392h-.854v.5h.518a6.473,6.473,0,0,1-.679.735l.329.42c.112-.1.133-.119.336-.294.14.217.245.4.3.5l.532-.511c-.084-.07-.273-.238-.462-.371.175-.2.287-.343.392-.483h1.281a2.746,2.746,0,0,0,.259.322,6.476,6.476,0,0,1-.553.6l.343.371-.063-.021-.224.392a8.937,8.937,0,0,1,1.232.812l.371-.679a9.205,9.205,0,0,0-1.3-.5,6.478,6.478,0,0,0,.658-.5c.133.119.231.2.476.392l.385-.63a4.262,4.262,0,0,1-.784-.553h.714v-.329a2.332,2.332,0,0,0-.63-.539l-.259.364Zm-1.309,0c.042-.084.091-.182.175-.392h.308c.077.182.133.3.182.392Zm-2.184-2.737h-1.7v.567h1.7v.364h.763v-.364h1.337v.364h.763v-.364h1.82v-.371a2.616,2.616,0,0,0-.735-.574l-.28.378h-.805v-.427h-.763v.427h-1.337v-.427h-.763Zm2.772,3.465H-27.4V-.413c0,.217,0,.3-.266.3-.063,0-.126,0-.42-.014l.133.658c1.008.007,1.232-.07,1.232-.784Zm-.938.98a11.064,11.064,0,0,1-1.3.525l.2.686a11.391,11.391,0,0,0,1.218-.784ZM-20-1.61h-.693V-3.143h1.652v-.371a2.291,2.291,0,0,0-.56-.539l-.245.343h-.476c.245-.329.357-.483.644-.938l-.763-.21c-.091.266-.217.644-.427,1.148H-21.98l.637-.3a8.634,8.634,0,0,0-.644-.847l-.448.175c.112.273.21.525.357.973H-23v.567h1.645V-1.61h-.7V-2.758h-.637V-.623h.637v-.413H-20v.308h.637v-2.03H-20Zm1.155-3.318V-.581c0,.252,0,.343-.371.343-.126,0-.525-.014-.679-.021l.168.791c1.358,0,1.631-.063,1.631-.945V-4.928h.252v-.4a2.6,2.6,0,0,0-.728-.567l-.308.378h-4.3l-.784-.28V.532h.749v-5.46Zm3.269.385A7.171,7.171,0,0,1-17.346-2.17l.364.483c.413-.343.651-.581.693-.623V.532h.77V-3.157a6.755,6.755,0,0,0,.693-1.085Zm3.521,1.428h1.3v-.406a2.458,2.458,0,0,0-.714-.567l-.294.385h-3.276v.588h2.226V-.588c0,.231,0,.343-.3.343-.2,0-.5-.007-.756-.021l.175.8c1.267-.014,1.645-.014,1.645-.91ZM-16.9-3.78a8.033,8.033,0,0,0,1.827-1.792l-.742-.336a6.424,6.424,0,0,1-1.442,1.673ZM-14.819-5.5v.588h3.843V-5.32a2.68,2.68,0,0,0-.714-.574l-.294.392ZM-3.759-.168A6.563,6.563,0,0,1-5.152-1.351a5.155,5.155,0,0,0,.777-2.695h.567v-.4a2.6,2.6,0,0,0-.686-.574l-.315.385H-5.95c.035-.126.14-.56.245-1.141l-.8-.077a10.25,10.25,0,0,1-.539,2.5,2.948,2.948,0,0,0-.441-.378l-.266.385h-.315V-4.7h1.253v-.4A2.465,2.465,0,0,0-7.5-5.663l-.294.378h-2.394V-4.7h1.428V-.91l-.483.14V-3.808H-9.9v3.22c-.112.028-.21.056-.329.084l.147.77A32.043,32.043,0,0,0-6.867-.952v-.567c-.357.126-.539.189-1.2.392V-2.758h.77c-.021.028-.112.217-.14.273l.5.266c.126-.217.189-.329.329-.6a5.4,5.4,0,0,0,.623,1.463A5.492,5.492,0,0,1-7.728.049l.308.5A6.387,6.387,0,0,0-5.586-.791,10.477,10.477,0,0,0-4.242.532ZM-5.131-4.046a5.9,5.9,0,0,1-.476,2.072,5.254,5.254,0,0,1-.651-1.659c.063-.175.112-.315.14-.413Zm7.266-.735v-.3h.238v-.28a2.724,2.724,0,0,0-.7-.483l-.266.336H.266v-.343H-.476v.343H-2.548v.427H-.476v.3H-3.192v.441H-.476v.315H-2.548V-3.6H-.476v.343H-2.793v.427H-.476v.322H-3.192v.455H1.792l-.266.315h-3.15l-.833-.273V.532h.742V.238h3.29V.532H2.31V-1.3h.238v-.28a2.464,2.464,0,0,0-.665-.469H3.192v-.308A2.551,2.551,0,0,0,2.6-2.828h.168v-.28a2.841,2.841,0,0,0-.6-.5l-.042.056V-4.34H3.192v-.315A1.892,1.892,0,0,0,2.7-5.1l-.224.322ZM1.89-3.255H.266V-3.6H1.414v.126h.651ZM1.414-4.34v.315H.266V-4.34ZM2.492-2.828l-.266.322H.266v-.322ZM.266-4.781v-.3H1.414v.3ZM1.575-1.3v.357h-3.29V-1.3Zm0,.756V-.2h-3.29v-.35ZM6.538-3.955H3.808v.6h2.73V-.434H4.046V.161H9.954V-.252A2.154,2.154,0,0,0,9.24-.819l-.308.385H7.322V-3.36h2.87v-.413a2.327,2.327,0,0,0-.714-.567l-.315.385H7.322v-1.9H6.538Zm7.77,3.276h1.3v.308h.7V-1.5h.945v-.3a2.072,2.072,0,0,0-.518-.5l-.217.336h-.21v-.364h.238v-.287a2.659,2.659,0,0,0-.518-.406h.2v-.917h.238v-.287a2.584,2.584,0,0,0-.714-.5h1.442v-.35a2.751,2.751,0,0,0-.707-.553l-.3.371H14.308v-.588h-.749v.588H10.808v.532h2.751v.378H12.39l-.728-.252v1.582h.721v-.133h1.176v.378H11.27v.448h2.289v.364H10.808V-1.5h2.751v.378H11.27v.448h2.289v.2c0,.231,0,.329-.294.329-.126,0-.217,0-.679-.014l.154.7c1.344,0,1.568-.063,1.568-.868Zm0-3.262H15.5v.371h-1.19Zm0,.784H15.5v.133h.273l-.182.245H14.308Zm0,.826h1.3v.364h-1.3Zm0,.826h1.3v.378h-1.3Zm0-3.227h1.414l-.252.378H14.308ZM13.559-3.57H12.383v-.371h1.176Zm10.717.392a6.813,6.813,0,0,1-1.337-.427,3.549,3.549,0,0,0,.693-1.057h.56v-.4a2.5,2.5,0,0,0-.672-.546l-.3.385h-1.5a5.292,5.292,0,0,0,.231-.532l-.77-.126a4.384,4.384,0,0,1-.819,1.694l.406.315c.119-.126.2-.217.378-.434a3.981,3.981,0,0,0,.714.77,4.369,4.369,0,0,1-1.4.651l.231.462a7.443,7.443,0,0,0,.784-.266,4.512,4.512,0,0,1-.021.5H20.2v.567h1.176c-.07.343-.21,1.057-1.484,1.638l.308.5a2.673,2.673,0,0,0,1.932-2.142h.917C23-.28,22.953-.175,22.491-.175c-.161,0-.315-.007-.462-.014L22.2.532c1.176,0,1.533-.091,1.582-2.149h.231v-.371a2.712,2.712,0,0,0-.714-.56L23-2.184h-.777c.021-.21.021-.336.028-.6h-.56a4.158,4.158,0,0,0,.707-.378,7.462,7.462,0,0,0,1.519.693ZM22.834-4.662a2.983,2.983,0,0,1-.511.728,3.525,3.525,0,0,1-.805-.728Zm-3.36.959.252-.238-.21-.168a8.826,8.826,0,0,0,.868-.777h.308v-.392a2.5,2.5,0,0,0-.616-.581l-.287.357H17.983v.567h1.561c-.189.294-.21.322-.378.56-.189-.133-.3-.21-.6-.4l-.343.336a9.662,9.662,0,0,1,.728.735H17.808v.574h.952a7.079,7.079,0,0,1-1.134,1.981l.364.364a6.8,6.8,0,0,0,.847-1.232v1.5c0,.231,0,.336-.273.336-.168,0-.364-.007-.525-.021l.154.735c.987,0,1.288-.049,1.288-.819V-3.129h.406a6.242,6.242,0,0,1-.357.938l.385.217a7.809,7.809,0,0,0,.623-1.113h.231v-.357a2.625,2.625,0,0,0-.6-.623l-.287.364Zm7.4,1.764v.294H27.6V-3.577h.238v-.434a2.741,2.741,0,0,0-.686-.525l-.3.364h-1l-.791-.245v1.771A6.887,6.887,0,0,1,24.633.112L25.116.5a5.48,5.48,0,0,0,.665-2.436Zm0-1.638v1.043H25.8V-3.577Zm.4,4.06a4.711,4.711,0,0,0,1.582-3.451h.77V.525h.749V-2.968h.819V-3.4a2.382,2.382,0,0,0-.665-.567l-.294.4H28.882V-4.865a13.192,13.192,0,0,0,2.2-.315l-.469-.658a7.486,7.486,0,0,1-1.883.427l-.609-.2v1.841A4.767,4.767,0,0,1,26.845.049Zm-2.45-6.006v.595h3.066v-.427a2.6,2.6,0,0,0-.6-.539l-.308.371Z"
                                transform="translate(31.276 65.43)" fill="#fff" >
                        </g>
                    </svg>
                </div>
            </div>
            <div class="c-ScreenAnimate_Layer anim-MotionLayer_02"></div>
            <div class="c-ScreenAnimate_Layer anim-MotionLayer_03"></div>
        </div>
        <div class="c-ScreenAnimate_Context-Wrapper js-ScreenAnimate-Context-Wrapper">${document.body.outerHTML}</div>
        `;
    }
}


// スクリーンアニメーション終了する時にテキストアニメーションを動作させる。
// animationendに関わる処理(ニュースティッカー)もここに格納する

class TextAnimation extends ScreenAnimate {
    constructor() {
        super();
        const o = {
            title: 'js-slide-Animate-title',
            sentence: 'js-slide-Animate-sentence',
            layer: 'anim-MotionLayer_03',
            newsTicker: "data-first-visible"
        }
        this.title = document.querySelector(`.${o.title}`);
        this.sentence = document.querySelector(`.${o.sentence}`);
        this.layer = document.querySelector(`.${o.layer}`);
        this.newsTicker = document.querySelector(`[${o.newsTicker}]`);
        this.init();
    }

    init() {
        if(!this.layer) return;
        this.slideAnimation();
    }

    slideAnimation() {
        this.layer.addEventListener('animationstart', (e) => {
            this.title.parentNode.getAttribute('aria-hidden', true) ? this.title.parentNode.setAttribute('aria-hidden', false) : false; 
            this._newsTickerStart();
        });
        return;
    }

    _newsTickerStart() {
        return this.newsTicker.dataset.firstVisible = 'false' ? 'true' : '';
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
    element.style.transition = `opacity ${transition}ms ease`;
    setTimeout(() => {
        element.style.opacity = 1;
    }, duration);
    setTimeout(() => {
        element.style.display = 'block';
    }, displayIn);
    return element, 200, 300, 100;
}

// フェードアウト用アニメーション関数
/**
 *
 * @param {object} element ターゲットのDOMを設定する
 * @param {Number} duration オブジェクトが表示されている時間(不可視になるまでの長さ)
 * @param {Number} transition opacityのtransitionをmsで設定
 * @param {Number} delay opacityの遅延時間
 * @param {Number} displayIn block > noneまでの長さ(default 100)
 * @returns
 */
function fadeOut(element, duration, transition, delay, displayend) {
    if (!element) return;
    element.style.opacity = 1;
    element.style.transition = `opacity ${transition}ms ease ${delay}ms`;
    setTimeout(() => {
        element.style.opacity = 0;
    }, duration);
    setTimeout(() => {
        element.style.display = 'none';
    }, duration + displayend);
    return element, 1000, 300, 0, 100;
}
