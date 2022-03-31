'use strict';

window.addEventListener('load', () => {
    const form = document.querySelector('.contact-FlexInline-Valid-Form');
    new Form(form);
});

class Form {
    constructor(root) {
        this.root = root;
        if (!this.root) return;

        this.inputs = this.root.querySelectorAll('input, select, textarea ');
        this.submit = this.root.querySelector('[type="submit"]');
        this.init();
    }

    init() {
        console.log('create contactform.js app.');
        this._inputValid();
    }

    _inputValid() {
        this.inputs.forEach(element => { 
            element.addEventListener('change', (e) => {
                const target = e.currentTarget;
                const errorMessage = e.currentTarget.nextElementSibling;
                if (target.checkValidity()) {
                    target.dataset.validateTarget = 'true';
                    errorMessage.setAttribute('aria-hidden', 'true');
                } else {
                    target.dataset.validateTarget = 'false';
                    errorMessage.setAttribute('aria-hidden', 'false');
                    if (target.validity.valueMissing) {
                        console.warn('値の入力は必須です。');
                    } else if (target.validity.tooShort) {
                        console.warn(target.minLength + '文字以上で入力してください。現在の文字数は' + target.value.length + '文字です。');
                    } else if (target.validity.tooLong) {
                        console.warn(target.maxLength + '文字以下で入力してください。現在の文字数は' + target.value.length + '文字です。');
                    } else {
                        console.warn('不正な入力です。');
                    }
                }
            });
        });
        this._activeSubmitBtn();
    }

    _activeSubmitBtn() {
        const isValid = this.root.checkValidity();
        if (isValid) {
            this.submit.removeAttribute('aria-disabled');
        } else {
            this.submit.setAttribute('aria-disabled', 'true');
            this._submitValidate(this.submit);
        }
    }

    _submitValidate(submit) {
        submit.addEventListener('click', (e) => {
            const isValid = this.root.checkValidity();
            if (!isValid) {
                alert('必須項目をご入力ください。');
                e.preventDefault();
            } else {
                alert('送信完了しました！');
            }
        });
    }
}
// Formのバリデーション処理を行う

// Validation処理1
// - 1. HTMLの初期値は、入力が始まった段階でdata属性を追加する。
// -    1.1 その理由は、何も入力もしていないのにバリデーションが働いてしまうのを防ぐため。
// - 2. Validation不正な入力が行われた場合は、data-属性をfalseにしてborder-colorを赤にする
// - 3. Validation値が正しく入力されている場合は、data-属性をtrueにしてborder-colorを緑にする。

// Validation処理2
// 概要: disabledにさせるのは良いが、input処理の最中に関数を呼び出すと、初期段階ではdisabledさせていないので、送信できてしまう。そうならないように初期段階でもdisabledさせて、checkValidity関数を呼び出してtrueが帰ってきた段階でsubmitさせるようにしたい。
// 尚、カーソル関連のエラー(フリーズする)が発生するので、クリックイベント発生したタイミングでcheckValidityさせる方が良さそう。
// 以下は、まだ実装方針が決まっていないので、メモ程度。
// - 1. [type="submit"]ボタンをdisabledさせる
// - 2. disabledの処理は、最終的にクリックイベントが発生した時にバリデーションチェックを行い問題なければ[disabled]をremoveAttributeさせる。
// -    2.1 上記以外の場合は、inputイベントを検知して、checkValidity関数の返り値がtrueになってから自動的に[disabled]をremoveAttributeさせる。
// - 3. disabled属性は、マウスストーカーにも影響するため、[aria-disabled="true"]にしておく。
// - 4. [aria-disabled]を設定するHTMLのスタイルは、必ず非活性とわかるようにしたいので、opacityかメーセージを表示する

// Validation処理3
// 不正な入力を検知した場合のメッセージを表示する。

// Validation処理 - Other -
// - 1. HTMLのバリデーション必須項目のリストアップ
// -    1.1 autofocus tabindexの値の取り扱いなど
// - 2. CSS側のバリデーション用の擬似要素の取り扱いについても確認する
// -    2.1 disabled valid cursor: not-allowed
// - 3. 姓名、電話番号、クレジットカード、郵便番号から住所候補出力、input[radio]の取り扱い、カレンダー、セレクト要素のデザイン変更
// - 4. pattern属性にかける正規表現の取り扱いについて、基礎的な勉強をしておくべき。

// class Form {
//     constructor(root) {
//         this.form = root;
//         if (!this.form) return;

//         this.inputs = this.form.querySelectorAll('input, select, textarea');
//         this.submit = this.form.querySelector('[type="submit"]');
//         this.isFormValid = this.form.checkValidity();
//         this.init();
//     }

//     init() {
//         this.submitValidate(this.submit);
//     }

//     // init() {
//     //     this.inputs.forEach(input => {
//     //         input.addEventListener('input', (e) => {
//     //             const currentTarget = e.currentTarget;
//     //             if (currentTarget.checkValidity()) {
//     //                 target.dataset.validateTarget = 'true'; //入力が正しい場合は、border-colorが緑になる
//     //             } else {
//     //                 target.dataset.validateTarget = 'false'; //入力が不正な場合は、border-colorが赤になる
//     //             }
//     //         });
//     //     });
//     // }

    
    
//     /**
//      * 入力内容に不足がある場合、アラートを出現させる処理。
//      * @param {object} submit [type="submit"]ボタンを設定する。
//      */
//     submitValidate(submit) {
//         submit.addEventListener('click', (e) => {
//             if (!this.isFormValid) {
//                 alert('必須項目をご入力ください。');
//                 e.preventDefault();
//             } else {
//                 submit.removeAttribute('aria-disabled');
//                 submit.removeAttribute('disabled');
//                 submit.nextElementSibling.style.display = 'none';
//                 e.preventDefault();
//             }
//         });
//     }
// }

// init();
// function init() {
//     const form = document.querySelector('.contact-FlexInline-Valid-Form');
//     const formInputs = form.querySelectorAll('input, select, textarea');

//     formInputs.forEach(input => {
//         input.addEventListener('input', (e) => {
//             const target = e.currentTarget;
//             if (target.checkValidity()) {
//                 // target.classList.add('is-valid');
//                 // console.log('is-validがついているため、入力は正しいです。');
//                 target.dataset.validateTarget = 'true';
//             } else {
//                 // target.classList.remove('is-valid');
//                 // console.log('is-validがついていないため、入力は無効です。');
//                 target.dataset.validateTarget = 'false';
//                 if (target.validity.valueMissing) { //値の入力が必須のため入力を促す
//                     console.log('値の入力は必須です。');
//                 } else if (target.validity.tooShort) {
//                     console.log(target.minLength + '文字以上で入力してください。現在の文字数は' + target.value.length + '文字です。')
//                 } else if (target.validity.tooLong) {
//                     console.log(target.maxLength + '文字以下で入力してください。現在の文字数は' + target.value.length + '文字です。')
//                 } else if (target.validity.patternMismatch) {
//                     console.log('空白のみは入力できません。');
//                 }
//             }
//             activateSubmitBtn(form);
//         });
//     });
// }

// function activateSubmitBtn(form) {
//     const submitBtn = form.querySelector('[type="submit"]');
//     if (form.checkValidity()) {
//         submitBtn.removeAttribute('aria-disabled');
//     } else {
//         submitBtn.setAttribute('aria-disabled', 'true');
//     }
// }