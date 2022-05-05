// Ude Import export (MANDATORY)
// Onclicking store the news in local storage with key "news" so that you can access that on news.html page
import { navbar } from "../components/navbar.js";
document.querySelector("#navbar").innerHTML = navbar();

let search_Images = async (value) => {
    try {
      let res = await fetch(
        `https://masai-mock-api.herokuapp.com/news?q=${value}`
      );
      let data = await res.json();
  
      return data;
      
    } catch (error) {
      console.log(error);
    }
  };



let search = (e) => {
    let value = document.querySelector("#search_input").value;
  //   cur=value;
    console.log("yes", value);
    search_Images(value).then((data) => {
      console.log(data);
      let container = document.querySelector("#results");
      container.innerHTML = null;
      appendTobody(data.articles, container);
    });
  };
  
  document.querySelector("#search_input").addEventListener("keydown",search);



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
      div.append(img, h3,br,h4);
      h4.innerHTML = description;
      _results.append(div);
    });
  };

  export { appendTobody };