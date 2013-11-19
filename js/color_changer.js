function color_changer(config) {


  	/*========================================*/
	/* Parametres par défaut
  	/*========================================*/

	params = {
		rows: 	1,
		cols: 	1,
		number: 10,
		random: true,
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

	// Si random == true
	if(params.number != '' && typeof params.number == 'number' && params.random == true) {
		for(i=0 ; i < params.number; i++) {
			colors[i] = get_random_color();
		}

	// Sinon utilise les couleurs données dans le parametre "colors"
	} else if(params.random == false) {
		colors = params.colors;
	}


	
  	/*========================================*/
	/* Fonctions utiles
  	/*========================================*/

	function get_random_color() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.round(Math.random() * 15)];
		}
		return color;
	}


	
  	/*========================================*/
	/* Process
  	/*========================================*/
	
	this.build = function(){

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

	this.destroy = function(){

		this.stop();
		element.innerHTML = '';

	}
		

	// Méthode play();
	this.play = function(){	

		var p = 2;

		interval_timer = params.timer;
		is_playing = true;

		var elementRows = element.childNodes;

		for(eR=0 ; eR < elementRows.length ; eR++){
			elementCols = elementRows[eR].childNodes;

			for(eC=0 ; eC < elementCols.length ; eC++) {

				the_color = Math.floor(Math.random() * colors.length);

				// Colori les blocs avec une couleur aléatoire
				elementCols[eC].style.backgroundColor = colors[the_color];

				// Affiche les couleurs
				this.play_colors(elementCols[eC]);

			}

		}

	}

	this.play_colors = function(elementCol) {

		var p = Math.floor(Math.random() * colors.length);

		interval = setInterval(function() { 

					elementCol.style.backgroundColor = colors[p];

					p++;

					// Repetition
					if(params.repeat==true) {
						if(p == colors.length) p=0;
					}

					if(p >= colors.length) 
						clearInterval(interval);

            	}, interval_timer);

	}

	// Méthode stop();
	this.stop = function(){

		elementRows = element.childNodes;

		for(eR=0 ; eR < elementRows.length ; eR++){
			elementCols = elementRows[eR].childNodes;

			for(eC=0 ; eC < elementCols.length ; eC++) {
				elementCols[eC].style.backgroundColor = 'transparent';
			}
		}

		for (var i = 1; i <= interval; i++)
			window.clearInterval(i);
		
		is_playing = false;
	}

	// Méthode toggle_play();
	this.toggle_play = function(){
		if(is_playing == false)
			this.play();
		else
			this.stop();
	}

	// Launch
	this.build();
}




colors = ['#DE5654', '#F0A954', '#5023FA'];

var color_changer = new color_changer({
	element: 	document.getElementById('color_changer'),

	rows: 		200,
	cols: 		1,

	number: 	100,
	//random: 	false,
	colors: 	colors,

	timer: 		50,
	repeat: 	true
});