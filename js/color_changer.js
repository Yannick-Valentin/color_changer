function color_changer(config) {
  
	// Parametres par défaut
	params = {
		rows: 	1,
		cols: 	1,
		number: 10,
		timer: 	50,
		repeat: true
	}
	// Fusionne les paramêtres
	for (var attrname in config) {params[attrname] = config[attrname]}

	// Variables
	var colors = new Array;
	var element = params.element;
	var interval;
	var is_playing = false;

	if(params.number != '' && typeof params.number == 'number') {
		for(i=1 ; i <= params.number; i++) {
			colors[i] = '#'+Math.floor(Math.random()*16777215).toString(16);
		}
	}

	
	build_blocks();

	function build_blocks() {

        element.className = element.className + ' rows-' + params.rows;
        element.className = element.className + ' cols-' + params.cols;

		// Créé les lignes
		for(i=1 ; i<= params.rows ; i++) {
			var row=document.createElement("div");
            element.appendChild(row);
            row.className = "rows";
            row.style.height = 100 / params.rows + '%';

            // Créé les colonnes            
			for(c=1 ; c<= params.cols ; c++) {
				var col=document.createElement("div");
	            row.appendChild(col);
	            col.className = "cols";
            	col.style.width = 100 / params.cols + '%';
	        }
		}

	}

		

	this.play = function(){	

		var p = 2;

		interval_timer = params.timer;
		is_playing = true;

		element.style.backgroundColor = colors[1];

		// Affiche les autres images
    	interval = setInterval(function() { 

						element.style.backgroundColor = colors[p];

						p++;

						// Repetition
						if(params.repeat==true) {
							if(p == colors.length) p=1;
						}

						if(p >= colors.length) 
							clearInterval(interval);

                	}, interval_timer);
	}

	this.stop = function(){
		element.removeAttribute('style');
		clearInterval(interval);
		is_playing = false;
	}

	this.toggle_play = function(){
		if(is_playing == false)
			this.play();
		else
			this.stop();
	}
}

var color_changer = new color_changer({
	rows: 		1,
	cols: 		1,
	element: 	document.getElementById('color_changer'),
	number: 	10,
	timer: 		50,
	repeat: 	true
});