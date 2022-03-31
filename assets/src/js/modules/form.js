'use strict';

export class Form {
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