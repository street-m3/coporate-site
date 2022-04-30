import { Accordion } from './../ui/accordion';
// ドロップダウンメニューを条件付きで実行・遷移する
function responsiveFooterBranch() {
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

export { responsiveFooterBranch };

