const RSS_ELEMENT = document.querySelector(".rss__feed");
const RSS_INPUT = document.querySelector(".rss__input");

const RSS_URL = localStorage.getItem("rss_url") || "https://9to5mac.com/feed/";

getFeed(RSS_URL);

RSS_INPUT.addEventListener("input", (event) => {
    getFeed(event.target.value);
    localStorage.setItem("rss_url", event.target.value);
});

function getFeed(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "document";

    request.onload = function () {
        const data = request.responseXML;
        console.log(request.responseXML);

        if (data.querySelector("title").innerHTML === "Error") {
            return (RSS_ELEMENT.innerHTML = `<div class="rss__feed__error">An issue occured while fetching your feed. Check your console for deatils.</div>`);
        }

        const items = data.querySelectorAll("item");
        let html = ``;
        items.forEach((el) => {
            html += `
                <article class="rss__feed__card">
                  <img src="${el.querySelector("description").innerHTML.match(/img\ssrc="(.*)"/i)[1]}" alt="">
                  <h2>
                    <a class="rss__feed__card__title" href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener">
                      ${el.querySelector("title").innerHTML}
                    </a>
                  </h2>
                </article>
              `;
        });
        RSS_ELEMENT.innerHTML = html;
    };
    request.onerror = function () {
        RSS_ELEMENT.innerHTML = `<div class="rss__feed__error">An issue occured while fetching your feed. Check your console for deatils.</div>`;
    };
    request.send();
    RSS_ELEMENT.innerHTML = ``;
}
