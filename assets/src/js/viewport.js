!(function () {
    const viewport = document.querySelector('meta[name="viewport"]');

    function switchViewport() {
        const value =
            window.outerWidth > 400 ?
            'width=device-width,initial-scale=1' :
            'width=400';
        if (viewport.getAttribute('content') !== value) {
            viewport.setAttribute('content', value);
        }
    }
    addEventListener('resize', switchViewport, false);
    switchViewport();
})();