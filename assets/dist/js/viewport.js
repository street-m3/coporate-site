document.addEventListener('DOMContentLoaded', () => {
    switchViewport();
});

function switchViewport() {
    const viewport = document.querySelector('meta[name="viewport"]');

    const viewportResize = () => {
        const width = window.outerWidth > 400 ?
            'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' :
            'width=360';

        if (viewport.getAttribute('content') !== width) {
            viewport.setAttribute('content', width);
        }

        addEventListener('resize', switchViewport, false);
        viewportResize();
    }
}