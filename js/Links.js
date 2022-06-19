let ADD_ELE = document.querySelector(".main__article__link_grid__item.plus");
let LINK_ELE = document.querySelector(".main__article__link_grid");

function escapeClass(c) {
    return c.replace(/[^a-zA-Z0-9]/g, "_");
}

const toRun = () => {
    document.querySelector(".main__dialog")?.remove();

    const DIALOG_ELE = `
        <dialog class="main__dialog">
            <h1 class="main__dialog__header">Add a link.</h1>
            <form class="main__dialog__form">

                <input class="main__dialog__form__input name" type="text" name="name" placeholder="Example">
                <label class="main__dialog__form__label" for="name">Name <span class="required">*</span></label>
                <input class="main__dialog__form__input link" type="text" name="link" placeholder="https://example.com">
                <label class="main__dialog__form__label" for="link">Link <span class="required">*</span></label>
                <input class="main__dialog__form__input svg" name="svg" placeholder = "M60.1045 4.897...">
                <label class="main__dialog__form__label" for="svg">SVG d Path <span class="required">*</span></label>
                <input class="main__dialog__form__input viewBox" name="viewBox" placeholder = "0 0 24 24">
                <label class="main__dialog__form__label" for="viewBox">SVG viewBox</label>
                <input class="main__dialog__form__input color" type="color" name="color">
                <label class="main__dialog__form__label" for="color">Color</label>
            </form>
            <div class="main__dialog__buttons">
                <button class="button__filled" id="modal_add_link">Add</button>
                <button class="button__empty" id="modal_cancel">Cancel</button>
            </div>
        </dialog>
    `;
    document.body.insertAdjacentHTML("beforeend", DIALOG_ELE);
    const DIALOG_ELEMENT = document.querySelector(".main__dialog");
    const DIALOG_FORM = document.querySelector(".main__dialog__form");
    const DIALOG_BUTTON = document.querySelector(".main__dialog__buttons #modal_add_link");
    const DIALOG_CANCEL = document.querySelector(".main__dialog__buttons #modal_cancel");
    const DIALOG_COLOR = document.querySelector(".main__dialog__form__input.color");
    const DIALOG_NAME = document.querySelector(".main__dialog__form__input.name");
    const DIALOG_LINK = document.querySelector(".main__dialog__form__input.link");
    const DIALOG_SVG = document.querySelector(".main__dialog__form__input.svg");
    const DIALOG_VIEWBOX = document.querySelector(".main__dialog__form__input.viewBox");

    DIALOG_ELEMENT.showModal();
    DIALOG_BUTTON.addEventListener("click", (event) => {
        let DIALOG_LINK_OBJ = {
            link: DIALOG_LINK.value,
            color: DIALOG_COLOR.value,
            svg: DIALOG_SVG.value,
            viewBox: DIALOG_VIEWBOX.value,
            name: escapeClass(DIALOG_NAME.value),
        };

        if (JSON.parse(localStorage.getItem("links") || "[]").find((l) => l.name === DIALOG_LINK_OBJ.name)) {
            let REQ_ELE = document.createElement("div");
            REQ_ELE.classList.add("required");
            REQ_ELE.innerHTML = "Name already taken, please choose another.";
            DIALOG_FORM.appendChild(REQ_ELE);
        } else {
            DIALOG_FORM.querySelector(".required:not(.main__dialog__form__label *)")?.remove();
            if (DIALOG_LINK_OBJ.link && DIALOG_LINK_OBJ.svg && DIALOG_LINK_OBJ.name) {
                localStorage.setItem("links", JSON.stringify([...JSON.parse(localStorage.getItem("links") || "[]"), DIALOG_LINK_OBJ]));

                DIALOG_ELEMENT.close();
                setLinks();
            } else {
                let REQ_ELE = document.createElement("div");
                REQ_ELE.classList.add("required");
                REQ_ELE.innerHTML = "Please fill in all required fields.";
                DIALOG_FORM.appendChild(REQ_ELE);
            }
        }
    });
    DIALOG_CANCEL.addEventListener("click", (event) => {
        DIALOG_ELEMENT.close();
    });
};

function handleActions(e) {
    e.preventDefault();
    const link = e.target.closest(".main__article__link_grid__item");
    const links = JSON.parse(localStorage.getItem("links") || "[]");
    const newLinks = links.filter((l) => l.name !== link.classList[1]);

    localStorage.setItem("links", JSON.stringify(newLinks));
    setLinks();
}

function setLinks() {
    let html = ``;
    const LINKS = localStorage.getItem("links") || "[]";
    const LINKS_OBJ = JSON.parse(LINKS);
    LINKS_OBJ.forEach((link) => {
        html += `
            <a class="main__article__link_grid__item ${link.name}" href="${link.link}">
                <div class="main__article__link_grid__item__actions">
                    <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z" fill="currentColor"/>
                    </svg>
                </div>
                <svg fill="none" viewBox="${link.viewBox || "0 0 24 24"}" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="${link.svg.startsWith("M") ? link.svg : `M${link.svg}`}"
                        fill="${link.color == "#000000" ? "currentColor" : link.color || "currentColor"}"
                    />
                </svg>
            </a>
        `;
    });
    html += `<button class="main__article__link_grid__item plus"><svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z" fill="currentColor" /></svg></button>`;
    LINK_ELE.innerHTML = html;
    ADD_ELE = document.querySelector(".main__article__link_grid__item.plus");
    document.querySelectorAll(".main__article__link_grid__item__actions").forEach((link) => {
        link.removeEventListener("click", handleActions);
        link.addEventListener("click", handleActions);
    });

    ADD_ELE.removeEventListener("click", toRun);
    ADD_ELE.addEventListener("click", toRun);
}

setLinks();
