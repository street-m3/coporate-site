'use strict';

export class DecodingSizer {
    constructor() {
        this.images = document.querySelectorAll('img');
        this.source = document.querySelectorAll('source');
        this._sizeSettings(this.images);
        this._sizeSettings(this.source);
    }

    /**
     * 
     * @param {string} src getAttributeで取得してきた値を設定します。
     * @returns 
     */
    _promiseLoader(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.onload = () => resolve(image);
            image.onerror = () => reject(error);
        });
    }

    /**
     * 
     * @param {object} mediaNode NodeListを設定します。
     */
    _sizeSettings(mediaNode) {
        Array.prototype.forEach.call(mediaNode, element => {
            if (element.hasAttribute('src')) {
                const IMGS = element.getAttribute('src');
                this._fileSizeRender(element, IMGS);
                if (!element.hasAttribute('alt')) {
                    element.setAttribute('alt', '');
                }
                if (!(element.hasAttribute('decoding') || element.hasAttribute('loading'))) {
                    element.setAttribute('loading', 'lazy');
                }
            }

            if (element.hasAttribute('srcset')) {
                const SOURCES = element.getAttribute('srcset');
                this._fileSizeRender(element, SOURCES);
            }
        });
    }

    /**
     * 
     * @param {object} target NodeListの各要素を設定します。
     * @param {string} url 各要素のメディアファイルのパスを取得します。
     */
    _fileSizeRender(target, url) {
        this._promiseLoader(url).then((res) => {
                target.setAttribute('width', res.width);
                target.setAttribute('height', res.height);
        }).catch((err) => {
                console.log(err);
        });
    }
}