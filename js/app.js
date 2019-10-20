let APIKEY = "K1zSMs601iaFRjhHesBfF9OytULNlmqv";
document.addEventListener("DOMContentLoaded", init);
function init() {
  document.getElementById("btnSearch").addEventListener("click", ev => {
    ev.preventDefault(); //to stop the page reload
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=""`;
    let str = document.getElementById("search").value.trim();
    url = url.concat(str);
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(content => {
        console.log(content.data);
        console.log("META", content.meta);

        let out = document.querySelector(".out");
        out.innerHTML = "";
        
        function data(content, i) {
          let fig = document.createElement("figure");
          let img = document.createElement("img");
          let fc = document.createElement("figcaption");
          img.src = content.data[i].images.downsized.url;
          img.alt = content.data[i].title;
          fc.textContent = content.data[i].title;
          fig.appendChild(img);
          fig.appendChild(fc);
          out.appendChild(fig);
          out.insertAdjacentElement("afterbegin", fig);
          document.querySelectorAll("#search").value = "";
        }

        for (var i = 0; i < content.data.length; i++) {
          data(content, i);
          console.log(content.data.length);
        };
        console.log(content.data.length);
      })
      .catch(err => {
        console.error(err);
      });
  });
}   
