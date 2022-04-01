'use strict';
function noopener() {
    const anchors = document.querySelectorAll('a');
    anchors.forEach((anchor) => {
        if (anchor.hasAttribute('target') === false || anchor.getAttribute('target') !== '_blank') return;
        anchor.setAttribute('rel', 'noopener noreferrer');
    });
}

export { noopener };