const SETTINGS = JSON.parse(localStorage.getItem("settings") || "{}");

if (SETTINGS?.title) {
    document.querySelector("title").innerHTML = SETTINGS.title;
}
if (SETTINGS?.favicon) {
    document.querySelector("link[rel='icon']").href = SETTINGS.favicon;
}
if (SETTINGS?.color) {
    document.querySelector("body").setAttribute("style", `--brand: ${SETTINGS.color}`);
}

window.addEventListener("keydown", (event) => {
    if (event.code === "Comma" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        document.querySelector(".main__dialog")?.remove();
        const DIALOG_ELE = `
        <dialog class="main__dialog">
            <h1 class="main__dialog__header">Settings.</h1>
            <form class="main__dialog__form">
                <input class="main__dialog__form__input title" value="${SETTINGS.title || ""}" type="text" name="title" placeholder="Itaque">
                <label class="main__dialog__form__label" for="title">Tab Name</label>
                <input class="main__dialog__form__input favicon" value="${SETTINGS.favicon || ""}" type="text" name="favicon" placeholder="https://example.com/favicon.png">
                <label class="main__dialog__form__label" for="favicon">Favicon URL</label>
                <input class="main__dialog__form__input color" value="${SETTINGS.color || "#4673E5"}" type="color" name="color">
                <label class="main__dialog__form__label" for="color">Accent Color</label>
            </form>
            <div class="main__dialog__buttons">
                <button class="button__filled" id="modal_update_settings">Update Settings</button>
                <button class="button__empty" id="modal_cancel">Cancel</button>
            </div>
        </dialog>
    `;
        document.body.insertAdjacentHTML("beforeend", DIALOG_ELE);
        const DIALOG_ELEMENT = document.querySelector(".main__dialog");
        const DIALOG_TITLE_INPUT = document.querySelector(".main__dialog__form__input.title");
        const DIALOG_FAVICON_INPUT = document.querySelector(".main__dialog__form__input.favicon");
        const DIALOG_COLOR_INPUT = document.querySelector(".main__dialog__form__input.color");

        const DIALOG_UPDATE_BUTTON = document.querySelector("#modal_update_settings");
        const DIALOG_CANCEL_BUTTON = document.querySelector("#modal_cancel");
        DIALOG_ELEMENT.showModal();
        DIALOG_UPDATE_BUTTON.addEventListener("click", (event) => {
            const Title = DIALOG_TITLE_INPUT.value;
            const Favicon = DIALOG_FAVICON_INPUT.value;
            const Color = DIALOG_COLOR_INPUT.value;

            let newSettings = {};

            if (Title) {
                newSettings.title = Title;
            }
            if (Favicon) {
                newSettings.favicon = Favicon;
            }
            if (Color) {
                newSettings.color = Color;
            }
            localStorage.setItem("settings", JSON.stringify(newSettings));
            DIALOG_ELEMENT.close();
            location.reload();
        });
        DIALOG_CANCEL_BUTTON.addEventListener("click", (event) => {
            DIALOG_ELEMENT.close();
        });
    }
});
