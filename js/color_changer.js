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
	var colors = new Array,
		element = params.element,
		interval_timer = params.timer,
		rows = params.rows,
		cols = params.cols,
		interval;

		is_playing = false;

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

       // element.className = element.className + ' rows-' + rows;
       // element.className = element.className + ' cols-' + cols;

		// Créé les lignes
		for(i=1 ; i<= rows ; i++) {
			var row=document.createElement("div");
            element.appendChild(row);
            row.className = "rows";
            row.style.height = 100 / rows + '%';

            // Créé les colonnes            
			for(c=1 ; c<= cols ; c++) {
				var col=document.createElement("div");
	            row.appendChild(col);
	            col.className = "cols";
            	col.style.width = 100 / cols + '%';
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

		is_playing = true;

		var elementRows = element.childNodes;

		for(eR=0 ; eR < elementRows.length ; eR++){
			elementCols = elementRows[eR].childNodes;

			for(eC=0 ; eC < elementCols.length ; eC++) {

				the_color = Math.floor(Math.random() * colors.length);

				// Colori les blocs avec une couleur aléatoire
				elementCols[eC].style.backgroundColor = colors[the_color];

				// Affiche les couleurs
				play_colors(elementCols[eC]);

			}

		}

		return is_playing;

	}

		function play_colors(elementCol) {

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

		return is_playing;
	}


	// Méthode toggle_play();
	this.toggle_play = function(){
		if(is_playing == false)
			this.play();
		else
			this.stop();
	}


	// Méthode update_colors();
	this.update_colors = function(new_number){
		//console.log(new_number);

		colors = new Array;

		for(i=0 ; i < new_number; i++) {
			colors[i] = get_random_color();
		}

		if(is_playing == true) {
			this.stop();
			this.play();
		}

	}


	// Méthode update_timer();
	this.update_timer = function(new_timer){
		//console.log(new_number);

		interval_timer = new_timer;

		if(is_playing == true) {
			this.stop();
			this.play();
		}
	}


	// Méthode update_rows();
	this.update_rows = function(new_rows){

		rows = new_rows;

		element.innerHTML = '';
		this.build();

		if(is_playing == true) {
			//console.log(is_playing);
			this.stop();
			this.play();
		}
	}


	// Méthode update_cols();
	this.update_cols = function(new_cols){

		cols = new_cols;

		element.innerHTML = '';
		this.build();

		if(is_playing == true) {
			//console.log(is_playing);
			this.stop();
			this.play();
		}
	}



	// Launch
	this.build();

	return is_playing;
}




// Init
colors = ['#DE5654', '#F0A954', '#5023FA'];

var color_changer = new color_changer({
	element: 	document.getElementById('color_changer'),

	rows: 		1,
	cols: 		1,

	number: 	10,
	//random: 	false,
	colors: 	colors,

	timer: 		50,
	repeat: 	true
});





// Bouton play
toggle_play = document.getElementById('toggle_play_btn');
toggle_play.onclick = function(){
	color_changer.toggle_play();

	if(is_playing == true)
		toggle_play.className = 'pause';
	else
		toggle_play.className = '';
}

// Toggle de la toolbox
toolbox = document.getElementById('toolbox');
toolbox_toggle = document.getElementById('toolbox_toggle');

toolbox.style.top = -toolbox.offsetHeight + 'px';

toolbox_toggle.onclick = function(){

	if(toolbox.style.top != '0px') {
		toolbox.style.top = '0px';
		toolbox_toggle.className = 'toggled';
		//animate(toolbox, 'top', 0, 500);
	} else {
		toolbox.style.top = -toolbox.offsetHeight + 'px';
		toolbox_toggle.className = '';
		//animate(toolbox, 'top', -72, 500);
	}

}





// Met à jour les couleurs suivant le input range
inputColors = document.getElementById('colors');

inputColors.onchange = function(){
	color_changer.update_colors(this.value);

	inputColors.nextSibling.innerHTML = this.value;

	if(is_playing == true)
		toggle_play.className = 'pause';
	else
		toggle_play.className = '';

}


// Met à jour le timer suivant le input range
inputTimer = document.getElementById('timer');

inputTimer.onchange = function(){
	color_changer.update_timer(this.value);

	inputTimer.nextSibling.innerHTML = this.value + 'ms';

	if(is_playing == true)
		toggle_play.className = 'pause';
	else
		toggle_play.className = '';
}



// Met à jour les rangs suivant le input range
inputRows = document.getElementById('rows');

inputRows.onchange = function(){
	color_changer.update_rows(this.value);

	inputRows.nextSibling.innerHTML = this.value;

	if(is_playing == true)
		toggle_play.className = 'pause';
	else
		toggle_play.className = '';
}



// Met à jour les rangs suivant le input range
inputCols = document.getElementById('cols');

inputCols.onchange = function(){
	color_changer.update_cols(this.value);
	
	inputCols.nextSibling.innerHTML = this.value;

	if(is_playing == true)
		toggle_play.className = 'pause';
	else
		toggle_play.className = '';
}



function animate(elmt, property, value, time){

	the_timer = time / Math.abs(value);

	counter = parseInt(elmt.style[property]);

	animate_timer = setInterval(function() { 

					counter += value / the_timer + 'px';

					elmt.style[property] = counter;

					if(counter != value) 
						clearInterval(animate_timer);

            	}, the_timer);

	//elmt.style[property] = value;

}


