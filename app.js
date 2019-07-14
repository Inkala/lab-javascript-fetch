'use strict';

function main() {
  // Iteration 1

  // var main = document.querySelector('main');
  // fetch('https://dog.ceo/api/breeds/image/random')
  //   .then(function(res) {
  //     return res.json();
  //   })
  //   .then(function(data){
  //     var img = `
  //       <img src="${data.message}" alt="Random Photo of a Dog">
  //     `;
  //     main.innerHTML = img;
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });

  // function getDog() {
  //   return fetch('https://dog.ceo/api/breeds/image/random');
  // }
  // async function initDogApi() {
  //   try {
  //     var res = await getDog();
  //     var data = await res.json();
  //     var img = `
  //       <img src="${data.message}" alt="Random Photo of a Dog">
  //     `;
  //     main.innerHTML = img;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // initDogApi();

  // Iteration 2

  // function getRates() {
  //   return fetch('https://api.exchangeratesapi.io/latest');
  // }

  // function addEvent(currency, selectedValue) {
  //   var dropDown = document.querySelector('#rates');
  //   dropDown.addEventListener('change', function(event) {
  //     selectedValue.innerHTML = currency[event.target.value];
  //   });
  // }

  // async function initRates() {
  //   try {
  //     var response = await getRates();
  //     var data = await response.json();
  //     var markup =
  //       '<section class="rates-section"><p>Rates: </p><select id="rates">';
  //     for (var rate in data.rates) {
  //       markup += `
  //         <option>${rate}</option>
  //       `;
  //     }
  //     markup += '</select></section>';
  //     main.innerHTML = markup;
  //     var selectedValue = document.createElement('p');
  //     var rates = document.querySelector('.rates-section');
  //     rates.appendChild(selectedValue);
  //     addEvent(data.rates, selectedValue);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // initRates();

  // Iteration 3

  var main = document.querySelector('main');

  function getPosts(numPosts) {
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = `https://dev-js-explained-api.pantheonsite.io/wp-json/wp/v2/posts?per_page=${numPosts}`;
    return fetch(proxyUrl + targetUrl);
  }

  function getPost(id) {
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = `https://dev-js-explained-api.pantheonsite.io/wp-json/wp/v2/posts/${id}`;
    return fetch(proxyUrl + targetUrl);
  }

  async function initPosts() {
    try {
      var posts = await getPosts(5);
      var data = await posts.json();
      var markup = '<section class="posts"><ul>';
      data.forEach(function(post) {
        markup += `<li>
          <a data-id="${post.id}" href="${post.link}">${post.title.rendered}</a>
        </li>`;
      });
      markup += '</ul></section>';
      main.innerHTML = markup;
      var postContent = document.createElement('section');
      postContent.setAttribute('class', 'post-content');
      main.appendChild(postContent);
    } catch (error) {
      console.log(error);
    }
    addEventsToPosts();
  }

  function addEventsToPosts() {
    var postElements = document.querySelectorAll('[data-id]');
    postElements.forEach(function(postElement) {
      postElement.addEventListener('click', function(event) {
        event.preventDefault();
        return loadPost(event.target.dataset.id);
      });
    });
  }

  async function loadPost(id) {
    var postSection = document.querySelector('.post-content');
    try {
      var res = await getPost(id);
      var postInfo = await res.json();
      var markup = `
        <h1>${postInfo.title.rendered}</h1>
        ${postInfo.content.rendered}
      `;
      postSection.innerHTML = markup;
    } catch (error) {
      console.log(error);
    }
  }

  initPosts();
}

window.addEventListener('load', main);
