let weather = new Vue({
  el: '#weather',
  data: {
	message 		: '',
	url				: '',
	cities			: ['chennai', 'madurai', 'thiruvarur', 'trichy', 'coimbatore'],
	selected_cities : []
  },
  watch: {
    message: function (value) {
		
    }
  },
  methods:{
	  fetch_weather : async function(event){
		try{
			 //Api Call weathermap
			 let url = `http://api.openweathermap.org/data/2.5/weather?q=${this.message}&units=metric&appid=e693425fe5fc8178c44c7d680cff53e8`;
			 const response = await fetch(url); //Fetch API Call
			 if(response.ok){
				const myJson 	= await response.json();
				let temp_min	= myJson.main.temp_min;
				let temp_max	= myJson.main.temp_max;
				
				//console.log(this.selected_cities.some(city => city.name === this.message.toLowerCase()))
				if(!this.selected_cities.some(city => city.name === this.message.toLowerCase())){
					this.selected_cities.push({ name : this.message.toLowerCase(), max : temp_max, min : temp_min}); //set selected cities
					this.selected_cities.sort((a, b) => (a.max < b.max) ? 1 : -1); //Sorted by Max temperature
					$('#app_weather').html('');
					
					//Sorted Output
					this.selected_cities.filter(details => {
						$('#app_weather').append(`<div class="col-md-4" id = "${details.name}"><div class="pull-right"><a href="#"><i class="glyphicon glyphicon-remove" onclick="remove_city(${details.name})"  style="font-size:11px;padding-right:5px"></i></a></div><div class=" panel panel-default"><div class="panel-body" align="center"><h4>${details.name.toUpperCase()}</h4><h6>Min : ${details.min}&#8451;</h6><h6>Max :${details.max}&#8451;</h6></div></div></div>`);
					});
					
					if(this.cities.indexOf(this.message.toLowerCase()) != 0){
						this.cities.push(this.message.toLowerCase());
					}
				}
			 }
			 else{
				 alert(`Not a Valid Input..HTTP-Error:  ${response.status}`);
			 }
		}
		catch(err){
			console.log(err.message);
		}
	  },
  }
});

const remove_city = (city) => {
	let city_rem = $(city).attr('id');
	var index = weather.selected_cities.some(city => city.name === city_rem);
	if (index !== -1) {
		weather.selected_cities = weather.selected_cities.filter(e => e.name !== city_rem);
		$('#app_weather #'+city_rem).remove();
	}
}

$( "#search_cities" ).autocomplete({
  source: weather.cities,
  select: function(event, ui) {
	weather.message = ui.item.value;
  }
});
//e693425fe5fc8178c44c7d680cff53e8