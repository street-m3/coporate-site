'use strict';
import { globalvariables } from "../env/env";

const xmlAsynchronousLorder = async () => {
    const XMLresource = `../sitemap.xml`;
    const response = await fetch(XMLresource, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
        })
        .then(
            console.log('参照できました。')
        ).catch(error => {
            console.log(error);
        })
    return response.text();
}

export class SitemapLoader {
    constructor(options) {
        this.options = options;
        this.defaultOptions = {
            ignore: ["403"],
            bloginfo: `${globalvariables.siteUrl}blog`,
        };
        Object.assign(this.defaultOptions, options);
        this.rootNav = document.querySelector('.c-Breadcrumb_navList');
        this.val = [];
        this.init();
    }

    init() {
        this._xmlsitemapCreateElement();
    }

    _xmlsitemapCreateElement() {
        xmlAsynchronousLorder().then(xml => {
            let parser = new DOMParser();
            const dom = parser.parseFromString(xml, "application/xml");
            const url = dom.querySelectorAll('url');
            url.forEach(el => {
                const name = el.querySelector('name');
                const locs = el.querySelector('loc');
                const link = name.textContent; //リンク名を取得する
                const adrs = locs.textContent; //リンクURL
                const anch = document.createElement('a');
                anch.setAttribute('href', adrs);
                anch.setAttribute('class', 's-Breadcrumb_Link');
                anch.setAttribute('itemprop', 'item');
                anch.innerText = link;
                this.val.push(anch);
            });
            this._urlMatchAnchor();
        })
    }

    _urlMatchAnchor() {
        const urlPathName = location.pathname;
        const urlFullPath = location.href.split(/#/)[0];
        const urlShortPath = urlFullPath.substring(0, urlFullPath.lastIndexOf("/"));
        for (let i = 0; i < this.val.length; i++) {
            const element = this.val[i];
            if (element.href.includes(urlShortPath)) {
                this._createListItem(element);
            }
        }
        if (urlShortPath == this.defaultOptions.bloginfo) {
            const bloginfoHeadline = document.querySelector('.c-headline-lv1');
            const mainHeadline = bloginfoHeadline.textContent;
            this._createListItem(mainHeadline);
        }
    }

    _createListItem(element) {
        if (!this.rootNav) return console.warn('対象のDOMが見つかりません。');
        const item = document.createElement('li');
        item.setAttribute('itemprop', 'itemListElement');
        item.setAttribute('itemtype', 'http://schema.org/ListItem');
        item.setAttribute('itemscope', '');
        item.setAttribute('class', 'c-Breadcrumb_navList-Item u-uppercase');
        typeof element == 'string' ? item.innerText = element : item.appendChild(element);
        this.rootNav.appendChild(item);
    }
}