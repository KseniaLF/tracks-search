// import debounce from "debounce";

const input = document.querySelector("input");
const trackList = document.querySelector(".track-list");
// 
let btnInfoBox;
let infoBox = "";
let activeBtnInfoBox;

// input.addEventListener("input", debounce(onInput, 1000));
input.addEventListener("input", onInput);

function onInput(event) {
  const searchQuery = event.target.value.trim();
  console.log(searchQuery)
  if (searchQuery !== "") {
      fetchTracks(searchQuery)
        .then((tracks) => renderUserList(tracks.results))
      // .then((tracks) => console.log(tracks.results[0]))
      .catch((error) => console.log(error));
  }
}
      
function fetchTracks(searchQuery) {
  return fetch(`https://itunes.apple.com/search?term=${searchQuery}&limit=25`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

function renderUserList(tracks) {
  // console.log(tracks)
  const markup = tracks
    .map((track) => {
      return `
      <div class="track-info">
        <ul class="track-block">
          <li class="box">
            <img src=${track.artworkUrl100} alt="img">
          </li>
          <li>${track.artistName}</li>
          <li>${track.trackName}</li>
          <li>${track.collectionName}</li>
          <li>${track.primaryGenreName}</li>
          <li><button class="btn-info-box" type="button">+</button></li>
        </ul>

        <ul class="info-box">
        </ul>
      </div>`
    })
    .join("");
  trackList.innerHTML = markup;

  onDetailInfoClick(tracks)
}

function renderDetailInfo(track, i) {
  const markup = `
  <li>
    <p>${track.artistName} - ${track.trackName}</p>
    <p>Collection: ${track.collectionName}</p>
    <p>Track Count: ${track.trackCount}</p>
    <p>Price: ${track.collectionPrice}</p>
  </li>
  
  <li>
    <p>Track duration: ${track.trackTimeMillis}</p>
    <p>Track price: ${track.trackPrice}</p>
  </li>`
  console.log(track)
  infoBox[i].innerHTML = markup;
  }

function onDetailInfoClick(tracks) {
  infoBox = document.querySelectorAll(".info-box");
  btnInfoBox = document.querySelectorAll(".btn-info-box");

  for (let i = 0; i < btnInfoBox.length; i++) {    
    btnInfoBox[i].addEventListener("click", () => {
      btnInfoBox.forEach(function (item) { 
        if (item.classList.contains("active-btn")) {
          item.classList.remove("active-btn");
          item.innerHTML = "+";
        }
      })

      btnInfoBox[i].classList.toggle("active-btn");
      
      if (btnInfoBox[i].classList.contains("active-btn")) { 
        infoBox.forEach(function (item) { 
          if (item !== "") {
            item.innerHTML = "";
          }
          })
         renderDetailInfo(tracks[i], i)
          
          btnInfoBox[i].innerHTML = "-";        
      }
      else {
        btnInfoBox[i].innerHTML = "+";
        infoBox[i].innerHTML = "";
      }  
      
    });
  }
}




            // return `<tr class="block">
                // <td><div class="box">
                // <img src=${track.artworkUrl100} alt="img">
                // </div></td>
                // <td>${track.artistName}</td>
                // <td>${track.trackName}</td>
                // <td>${track.collectionName}</td>
                // <td>${track.primaryGenreName}</td>
                
                // <td><button class="btn-info-box" type="button">+</button></td>

            //     <td class="info-box"></td>
            // </tr>
            