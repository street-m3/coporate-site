'use strict';

// series
import { series } from './series';

// unitモジュール
import { Form } from './modules/form.js';

// テストモジュール
import { sample } from './test/test';

// サイトの共通テンプレートモジュール
import { Header } from './site/header.js';
import { Footer } from './site/footer.js';
import { DrawerComponents } from './site/drawer.js';
import { ContactBanner } from './site/contact.js';
import { TitleArea } from './site/titlearea.js';
import { Button } from './components/button.js';
import { PointerDOM } from './components/pointer.js';
import { ScreenAnimateInnerHTML } from './template/screenAnimate';

// UIモジュール
import { Drawer } from './ui/drawer.js';
import { Accordion } from './ui/accordion.js';
import { ExpandableNav, HoverHeader } from './ui/expandable-nav.js';
import { MicroModal } from './ui/modal.js';
import { MouseFollow } from './ux/pointer.js';
import { SocialMedia } from './ui/socialMedia.js';

// UXモジュール
import { ScrollString } from './ux/scrollstring.js';
import { SmoothScrollNavigation } from './ux/scroll-nav.js'
import { History } from './ux/history.js';
import { ScreenAnimate, EndAnimationMethod } from './ux/screenAnimate.js';

// Utils
import { ResponsiveMovies } from './utils/responsive-movie.js';
import { DecodingSizer } from './utils/decodingSizer.js';
import { noopener } from './utils/anchor.js';
import { LocationController } from './utils/location.js';

document.addEventListener('DOMContentLoaded', () => {
    new ScreenAnimateInnerHTML();
    new ScreenAnimate();
    series();
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
    new ExpandableNav();
    new HoverHeader();
    new MicroModal('.p-topMainvisual_Title');
    new ScrollString();
    new Accordion('p-faq-accordions', 'js-accordion-header');
    new Accordion('s-Drawer-Dropdown', 'js-Drawer-Dropdown-Header');
    new SmoothScrollNavigation();
    new History();
    noopener();
    new Form(document.querySelector('.contactform'));
});