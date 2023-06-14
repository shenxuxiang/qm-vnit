declare class IntersectionImage {
    intersection: IntersectionObserver;
    constructor();
    observerCallback: (enters: IntersectionObserverEntry[]) => void;
    observeImage: (element: Element | Element[]) => void;
    unobserveImage: (element: Element | Element[]) => void;
    destroy(): void;
}
declare const _default: IntersectionImage;
export default _default;
