enum Events {
    "ButtonClicked" = "ButtonClicked",
    "ButtonStateChange" = "ButtonStateChange"
}

class Eventer {
    subscribe(name: Events, callback: (ev: Event) => void) {
        if (process.browser) {
            document.addEventListener(name, callback, false);
        }
    }

    fire<T>(name: Events, data: T) {
        if (process.browser) {
            const event = new CustomEvent(name, {
                bubbles: false,
                detail: data,
            });
            document.dispatchEvent(event);
        }
    }
}

export { Events };
export default new Eventer();