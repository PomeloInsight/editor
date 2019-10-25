enum Commands {
    "Bold" = "Bold",
    "Italic" = "Italic",
    "UnderLine" = "UnderLine",
    "Strike" = "Strike"
}

enum Events {
    "ButtonClicked" = "ButtonClicked"
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


export { Commands, Events };
export default new Eventer();