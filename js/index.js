function color_changer(config) {
  
	// Parametres par défaut
	params = {
		number: 10,
		timer: 	50,
		repeat: true
	}
	// Fusionne les paramêtres
	for (var attrname in config) {params[attrname] = config[attrname]}

	// Variables
	var colors = new Array;
	var element = params.element;

	if(params.number != '' && typeof params.number == 'number') {
		for(i=1 ; i <= params.number; i++) {
			colors[i] = '#'+Math.floor(Math.random()*16777215).toString(16);
		}
	}

	this.play = function(){	

		var p = 1;

		// Affiche les autres images
    	var interval = setInterval(function() { 

						element.style.backgroundColor = colors[p];

						p++;

						// Repetition
						if(params.repeat==true) {
							if(p == colors.length) p=1;
						}

						if(p >= colors.length) 
							clearInterval(interval);

                	}, params.timer);
	}

	this.stop = function(){
		element.removeAttribute('style');
	}

	this.toggle_play = function(){
		if(!play())
			play();
		else
			alert('stop');
	}
}

var color_changer = new color_changer({
		element: 		document.getElementById('color_changer'),
		number: 		10,
		timer: 			1000,
		repeat: 		true
});
//color_changer.method();

//color_changer();
 

 // color_changer('test');

/*

function test_function(config) {
	var config = config;

	//alert(config);
	this.test = function(){alert(config)};
}

var test_function = new test_function('alert');

test_function.test();*/