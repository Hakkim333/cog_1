Vue.component('tweet-component', {
	template: `<div class="col-md-4" :id = "city.name">{{city.name}}</div>`,
  /*template: `
    <div class="tweet">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img :src="city.name" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{city.name}}</strong> <small>{{city.name}}</small>
                <br>
                {{city.name}}
              </p>
            </div>
              <div class="level-left">
                <a class="level-item">
                  <span class="icon is-small"><i class="fas fa-heart"></i></span>
                  <span class="likes">{{city.name}}</span>
                </a>
              </div>
          </div>
        </article>
      </div>
    </div> 
  `,*/
  props: {
    city: Object
  }
});

new Vue({
  el: '#app',
  data: {
    selected_cities : [
		{name:'Chennai', min:'30', max:'33'}
		]
  }
});