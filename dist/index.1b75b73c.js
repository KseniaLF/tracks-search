const n=document.querySelector("input"),t=document.querySelector(".track-list");let i,e="";function c(n,t){const i=`\n  <li>\n    <p>${n.artistName} - ${n.trackName}</p>\n    <p>Collection: ${n.collectionName}</p>\n    <p>Track Count: ${n.trackCount}</p>\n    <p>Price: ${n.collectionPrice}</p>\n  </li>\n  \n  <li>\n    <p>Track duration: ${n.trackTimeMillis}</p>\n    <p>Track price: ${n.trackPrice}</p>\n  </li>`;console.log(n),e[t].innerHTML=i}n.addEventListener("input",(function(n){const o=n.target.value.trim();console.log(o),""!==o&&function(n){return fetch(`https://itunes.apple.com/search?term=${n}&limit=25`).then((n=>{if(!n.ok)throw new Error(n.status);return n.json()}))}(o).then((n=>function(n){const o=n.map((n=>`\n      <div class="track-info">\n        <ul class="track-block">\n          <li class="box">\n            <img src=${n.artworkUrl100} alt="img">\n          </li>\n          <li>${n.artistName}</li>\n          <li>${n.trackName}</li>\n          <li>${n.collectionName}</li>\n          <li>${n.primaryGenreName}</li>\n          <li><button class="btn-info-box" type="button">+</button></li>\n        </ul>\n\n        <ul class="info-box">\n        </ul>\n      </div>`)).join("");t.innerHTML=o,function(n){e=document.querySelectorAll(".info-box"),i=document.querySelectorAll(".btn-info-box");for(let t=0;t<i.length;t++)i[t].addEventListener("click",(()=>{i.forEach((function(n){n.classList.contains("active-btn")&&(n.classList.remove("active-btn"),n.innerHTML="+")})),i[t].classList.toggle("active-btn"),i[t].classList.contains("active-btn")?(e.forEach((function(n){""!==n&&(n.innerHTML="")})),c(n[t],t),i[t].innerHTML="-"):(i[t].innerHTML="+",e[t].innerHTML="")}))}(n)}(n.results))).catch((n=>console.log(n)))}));
//# sourceMappingURL=index.1b75b73c.js.map