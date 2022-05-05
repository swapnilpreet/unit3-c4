// Ude Import export (MANDATORY)
// Onclicking store the news in local storage with key "news" so that you can access that on news.html page

import { navbar } from "../components/navbar.js";
document.querySelector("#navbar").innerHTML = navbar();
 
let search_Images = async (value) => {
  try {
    let res = await fetch(
      `https://masai-mock-api.herokuapp.com/news/top-headlines?country=${value}`
    );
    let data = await res.json();

    return data;
    
  } catch (error) {
    console.log(error);
  }
};
let cur;
let search = (e) => {
  let value = document.querySelector("#sidebar").value;
  cur=value;
  console.log("yes", value);
  search_Images(value).then((data) => {
    console.log(data);
    let container = document.querySelector("#results");
    container.innerHTML = null;
    appendTobody(data.articles, container);
  });
};
 
document.querySelector("#sidebar").addEventListener("keydown", search);


let category1 = document.querySelector("#sidebar").children;

function category_search() {
  console.log(this.id);
  search_Images(this.id).then((data) => {
    console.log(data);
    let container = document.querySelector("#results");
    container.innerHTML = null;
    appendTobody(data.articles, container);
  });
}

for (let el of category1) {
  el.addEventListener("click", category_search);
}
 

let appendTobody = (data, _results) => {
    data.map(({ title,description, urlToImage }) => {
      let div = document.createElement("div");
      let img = document.createElement("img");
      img.src = urlToImage;
      let h3 = document.createElement("h3");
      if(title==null) {
        h3.innerHTML =description
      }else{
        h3.innerHTML = title;
      }
      let br = document.createElement("br")
       let h4 = document.createElement("h4");
      h4.innerHTML = description;
      div.append(img, h3,br,h4);
      _results.append(div);
    });
  };
  

// export { appendTobody };
// content
// description: "Tesla delivered 310,048 vehicles over the first three months of 2022, the automaker announced\r\n on Saturday. “This was an exceptionally difficult quarter due to supply chain interruptions and China Zero-Covid policy,” Musk said\r\n on Twitter shortly after Tesl…"
 
// urlToImage: "