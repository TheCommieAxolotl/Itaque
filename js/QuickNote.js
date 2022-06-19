const NOTE_ELE = document.querySelector(".main__article__note__textarea");

NOTE_ELE.value = localStorage.getItem("note") || "";

NOTE_ELE.addEventListener("input", (event) => {
    localStorage.setItem("note", event.target.value);
});
