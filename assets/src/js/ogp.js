'use strict';

document.addEventListener('DOMContentLoaded', () => {
    new CommonSettings();
});

class CommonSettings {
    constructor() {
        const html = document.documentElement;
        const head = document.head;
        const title = document.title;
        const href = location.href;
        const description = null;
        const headline = document.querySelector('h2[data-headline]').innerText;
        const placement = document.querySelector('main').getAttribute('data-placement');
        this.settings = {
            url: href,
            type: placement == 'aticle' ? 'article' : 'website',
            title: headline,
            description: description,
            sitename: title,
            image: './images/ogp.jpg',
            alt: '藤岡行政書士事務所Webサイトです。',
            locale: 'ja_JP',
        };

        this.init();
    }

    init() {
        this._renderComponent();
    }

    _renderComponent() {
        this._renderProperty('url', this.settings.url);
        this._renderProperty('type', this.settings.type);
        this._renderProperty('description', this.settings.description);
        this._renderProperty('site_name', this.settings.sitename);
        this._renderProperty('image', this.settings.image);
        this._renderProperty('image:alt', this.settings.alt);
        this._renderProperty('locale', this.settings.locale);
    }

    _renderProperty(type, content) {
        const meta = document.createElement('meta');
        meta.setAttribute("property", `og:${type}`);
        meta.setAttribute("content", `${content}`);
        document.head.appendChild(meta);
    }
}

// class OGP {
//     constructor() {
//         this.html = document.documentElement;
//         this.head = document.head;
//         this.title = document.title;
//         this.location = location.href;
//         this.headline = document.querySelector('h2[data-headline]').innerText;
//         this.placement = document.querySelector('main').getAttribute('data-placement');
//         this.siteHeader = {
//             url: location.href,
//             type: this.placement == 'aticle' ? 'article' : 'website',
//             title: this.headline,

//             // locale: 'ja_JP',

//         };
//         this.init();
//     }

//     init() {
//         this.html.setAttribute('prefix', 'og:https://ogp.me/ns#');
//         this._renderComponent();
//     }

//     _renderComponent() {
//         this._renderProperty('url', this.location);
//         this._renderProperty('type', 'website');
//         this._renderProperty('title', this.headline);
//         this._renderProperty('description', null);
//         this._renderProperty('site_name', this.title);
//         this._renderProperty('image', './images/ogp.jpg');
//         this._renderProperty('image:alt', '藤岡行政書士事務所Webサイトです');
//         this._renderProperty('locale', 'ja_JP');
//     }

//     _renderProperty(type, content) {
//         const meta = document.createElement('meta');
//         meta.setAttribute("property", `og:${type}`);
//         meta.setAttribute("content", `${content}`);
//         this.head.appendChild(meta);
//     }
// }

// new OGP();