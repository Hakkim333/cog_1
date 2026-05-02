Vue.component('input-component', {
	template: `<div class="col-md-6 col-md-offset-3">
					<div class="input-group">
						<input type="text" class="form-control" placeholder="Type the name of a city" name="search" id="search_cities" v-model="message">
						<div class="input-group-btn">
							<button class="btn btn-default" type="submit" v-on:click="fetch_weather"><i class="glyphicon glyphicon-search" ></i></button>
						</div>
					</div>
			   </div>`,
	props: {
		message: String,
		select_city: Object,
		all_city: Object
	},
	methods: {
		fetch_weather: async function(event){
			try{
				console.log(this.select_city);
				if(!this.select_city.some(city => city.name === this.message.toLowerCase())){
					 //Api Call weathermap
					 let url = `http://api.openweathermap.org/data/2.5/weather?q=${this.message}&units=metric&appid=e693425fe5fc8178c44c7d680cff53e8`;
					 const response = await fetch(url); //Fetch API Call
					 if(response.ok){
						const myJson 	= await response.json();
						let temp_min	= myJson.main.temp_min;
						let temp_max	= myJson.main.temp_max;

						if(!this.select_city.some(city => city.name === this.message.toLowerCase())){
							this.select_city.push({ name : this.message.toLowerCase(), max : temp_max, min : temp_min}); //set selected cities
							this.select_city.sort((a, b) => (a.max < b.max) ? 1 : -1); //Sorted by Max temperature
							console.log(this.select_city)
							if(this.all_city.indexOf(this.message.toLowerCase()) == '-1'){
								this.all_city.push(this.message.toLowerCase());
							}
						}
					 }
					 else{
						 alert(`Not a Valid Input..HTTP-Error:  ${response.status}`);
					 }
				}
			}
			catch(err){
				console.log(err.message);
			}
		}
	}
});

Vue.component('weather-component', {
  template: `
    <div class="col-md-4" :id = "city.name">
		<div class="pull-right">
<a href="#"><i class="glyphicon glyphicon-remove" v-on:click="remove_city(city.name)" style="font-size:11px;padding-right:5px"></i></a>
		</div>
		<div class=" panel panel-default">
			<div class="panel-body" align="center">
				<h4>{{city.name}}</h4>
				<h6>Min : {{city.min}}&#8451;</h6>
				<h6>Max :{{city.max}}&#8451;</h6>
			</div>
		</div>
	</div> 
  `,
  props: {
    city: Object
  },
  methods: {
	remove_city : function(city_rem){
		var index = weather.selected_cities.some(city => city.name === city_rem);
		if (index !== -1) {
			weather.selected_cities = weather.selected_cities.filter(e => e.name !== city_rem);
		}
	}
  }
});

let weather = new Vue({
  el: '#weather',
  data: {
	message 		: '',
	url				: '',
	cities			: ['chennai', 'madurai', 'thiruvarur', 'trichy', 'coimbatore'],
	selected_cities : []
  }
});


$( "#search_cities" ).autocomplete({
  source: weather.cities,
  select: function(event, ui) {
	weather.message = ui.item.value;
  },
  minLength:0
});

//e693425fe5fc8178c44c7d680cff53e8