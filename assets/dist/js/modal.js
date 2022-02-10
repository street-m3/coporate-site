window.addEventListener('load', () => {
    new MicroModal('.p-topMainvisual_Title');
});

// classを生成する
class MicroModal {
    /**
     * 
     * @param {String} eventTarget (NodeList) トリガーとなるDOMのクラス名を文字列で設定します。
     */
    constructor(eventTarget) {
        /**
         * this.modals モーダルオブジェクトを取得します。複数ある場合にも対応できるようにNodeListで取得。
         * this.modalEventTarget イベントが発火するDOM要素を取得します。
         * this.modalcloseTarget モーダルウィンドウを非表示にする要素を取得します。
         * this.touchEventListener タッチイデバイスを検知する
         */
        // 各要素がaria-hidden="true"ならaria-hidden="false"にする条件分岐をreturnする
        this.modals = document.querySelectorAll('.js-modal');
        this.modalEventTarget = document.querySelectorAll(eventTarget);
        this.modalcloseTarget = document.querySelectorAll('[data-modal-close]');
        this.touchEventListener = this._touchEventListener();
        this.init();
    }

    // 処理をまとめて実行するinit関数
    init() {
        if (!this.modals) return;
        this._modalopenEvent();
        this._modalcloseEvent();
    }

    // モーダルを表示させるメソッド
    _modalopenEvent() {
        this.modalEventTarget.forEach(element => {
            element.addEventListener(this.touchEventListener, (e) => {
                const modalTargetId = e.currentTarget.getAttribute('data-modal-target');
                this._modalsetAttribute(modalTargetId);
            });
        });
    }

    // モーダルを非表示させるメソッド (data-modal-close)
    _modalcloseEvent() {
        this.modalcloseTarget.forEach(element => {
            element.addEventListener(this.touchEventListener, (e) => {
                if (e.currentTarget === e.target) {
                    const modalContaier = e.currentTarget.closest('.js-modal').id;
                    this._modalsetAttribute(modalContaier);
                }
            });
        });
    }

    _modalsetAttribute(modal) {
        const currentEventModal = document.getElementById(modal);
        if (currentEventModal.getAttribute('aria-hidden') == 'true') {
            currentEventModal.setAttribute('aria-hidden', 'false');
            currentEventModal.classList.add('is-open');
            backfaceFixed(true);
        } else {
            currentEventModal.setAttribute('aria-hidden', 'true');
            currentEventModal.classList.remove('is-open');
            backfaceFixed(false);
        }

        return currentEventModal;
    }

    _touchEventListener() {
        return window.ontouchstart ? "touchstart" : "click";
    }
}