export class ScrollObserver {
    constructor(elements, callback, options) {
        this.elements = document.querySelectorAll(elements);

        const defaultOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0,
            once: true
        }
        this.callback = callback;
        this.options = Object.assign(defaultOptions, options);
        this.once = this.options.once;
        this.init();
    }

    init() {
        const observer = (entries, targetObserve) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    //true 画面内に入った時
                    this.callback(entry.target, true);
                    if (this.once) {
                        targetObserve.unobserve(entry.target);//監視を止める
                    }                    
                } else { //画面から出た時
                    this.callback(entry.target, false);
                }
            });
        }

        this.intersect = new IntersectionObserver(observer.bind(this), this.options);
        this.elements.forEach(element => this.intersect.observe(element));
    }

    destroy() {
        this.intersect.disconnect();
    }
}