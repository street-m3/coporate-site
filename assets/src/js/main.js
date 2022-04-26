'use strict';

// envオブジェクト
import { presets } from './env/env.js';

// APIモジュール
import { newsContentsMainFunctions } from './api.js';
import { Form } from './modules/form.js';
import { SitemapLoader } from './modules/sitemapLoader.js';

// テストモジュール
import { sample } from './test/test';

// サイトの共通テンプレートモジュール
import { Header } from './site/header.js';
import { Footer } from './site/footer.js';
import { DrawerComponents } from './site/drawer.js';
import { ContactBanner } from './site/contact.js';
import { Breadcrumb } from './site/breadcrumb.js';
import { TitleArea } from './site/titlearea.js';
import { Button } from './components/button.js';
import { PointerDOM } from './components/pointer.js';
import { ScreenAnimateInnerHTML } from './template/screenAnimate';

// UIモジュール
import { Drawer } from './ui/drawer.js';
import { Accordion } from './ui/accordion.js';
import { Megamenu, HoverHeader } from './ui/megamenu.js';
import { MicroModal } from './ui/modal.js';
import { MouseFollow } from './ux/pointer.js';
import { SocialMedia } from './ui/socialMedia.js';

// UXモジュール
import { IntersectionObservers } from './ux/scrollobserver.js';
import { ScrollString } from './ux/scrollstring.js';
import { SmoothScrollNavigation } from './ux/scroll-nav.js'
import { History } from './ux/history.js';
import { ScreenAnimate, EndAnimationMethod } from './ux/screenAnimate.js';

// Utiils
import { ResponsiveMovies } from './utils/responsive-movie.js';
import { DecodingSizer } from './utils/decodingSizer.js';
import { Ellipsis } from './utils/ellipsis.js';
import { noopener } from './utils/anchor.js';
import { LocationController } from './utils/location.js';

document.addEventListener('DOMContentLoaded', () => {
    new ScreenAnimateInnerHTML();
    new ScreenAnimate();
    contentAPIasyncFunction();
    new Header();
    new Footer();
    new DrawerComponents();
    new Button();
    new ContactBanner();
    new TitleArea();
    new PointerDOM();
    new SocialMedia(document.querySelector('.js-snsIcon-Component'), {
        facebook: true,
        twitter: true,
    });
    new DecodingSizer();
    new LocationController('s-Header_Brand');
    new ResponsiveMovies();
});

window.addEventListener('load', () => {
    new MouseFollow(992);
    new EndAnimationMethod();
    new Drawer(992, true);
    new Megamenu();
    new HoverHeader();
    new MicroModal('.p-topMainvisual_Title');
    DropdowninitFunctions();
    new ScrollString();
    new Accordion('p-faq-accordions', 'js-accordion-header');
    new Accordion('s-Drawer-Dropdown', 'js-Drawer-Dropdown-Header');
    new SmoothScrollNavigation();
    new History();
    noopener();
    new Form(document.querySelector('.contactform'));
});

async function BreadcrumbRenderFunction() {
    await new Promise(resolve => {
        resolve();
        new Breadcrumb();
    })
    .then(
        new SitemapLoader()
    )
}

async function contentAPIasyncFunction() {
    await new Promise((resolve) => {
        resolve();
        newsContentsMainFunctions();
    });
    setTimeout(() => {
        Ellipsis('js-trim', 25);
        new IntersectionObservers();
        BreadcrumbRenderFunction();
    }, 300);
}

// ドロップダウンメニューを条件付きで実行・遷移する
function DropdowninitFunctions() {
    const FooterDropdown = document.querySelector('.s-Footer-Dropdown_Tab');
    const matchMediaCtrl = window.matchMedia(`(max-width: 992px)`).matches;
    if (!FooterDropdown) return;
    if (matchMediaCtrl) {
        new Accordion('s-Footer-Dropdown', 'js-Footer-Dropdown-Header');
    } else {
        FooterDropdown.addEventListener('click', () => { 
            location.href = `${presets.siteUrl}service`;
        });
    }
}

console.log('Hello, world!');