const accessKey = "EZ2KLT6LBoND9CE95ypaRRMhLrwMyhCOcXgRm3V1r5U";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMorebtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    
    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        searchResult.innerHTML = "";
    }

    const results = data.results;

    results.map((result) =>{
        const image = document.createElement("img");
        image.src = result.urls.small;   /*this comes from the api webpage from google*/
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;      /*this comes from the api webpage from google*/
        imageLink.target = "_blank";     /*so dat image will open in new tab*/
        
        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })
    showMorebtn.style.display = "block";
}

searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    page = 1;
    searchImages();
})

showMorebtn.addEventListener("click", ()=>{
    page++;
    searchImages();
})

//  function voice(){
//      const recognition = new webkitSpeechRecognition();
//      recognition.lang = "en-GB";
//      recognition.onresult = function(event){
//          console.log(event);
//          document.getElementById("speechtotext").value = event.results[0][0].transcript;
//      }
//      recognition.start();
//     }