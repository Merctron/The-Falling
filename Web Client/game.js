
var gameboard = document.getElementById("gameboard");
gameboard.width = $(window).width() - $("#info").width();
gameboard.height = $(window).height();

var canvas = gameboard.getContext("2d");
canvas.fillStyle = "black";
canvas.fillRect(0, 0, gameboard.width, gameboard.height);

var play_sound = true;
var gamestarted = false;
var welstarted = false;
var score = 0;
var health = 0;
var invaded = 0;
var minFoeSpd = 0;
var maxFoeSpd = 5;


var ufo_img = new Image();
var flag_img = new Image();
var earth_img = new Image();
var alien_img = new Image();
var player_img = new Image();
var missile_img = new Image();
var endgame_img = new Image();
var par1_img = new Image();
var par2_img = new Image();
var par3_img = new Image();
var par4_img = new Image();
ufo_img.src = './sprites/ufo.png';
flag_img.src = './sprites/flag.png';
earth_img.src = './sprites/earth.png';
alien_img.src = './sprites/alien.png';
player_img.src = './sprites/player.png';
missile_img.src = './sprites/missile.png';
endgame_img.src = './sprites/endgame.png';
par1_img.src = './sprites/par1.png';
par2_img.src = './sprites/par2.png';
par3_img.src = './sprites/par3.png';
par4_img.src = './sprites/par4.png';

var entr_audio = new Audio('./sounds/entrance.mp3');
var FPS = 17;
var game_interval_id = 0;
var wel_interval_id = 0;

$(document).ready(function () {
	var wScreen = new WelcomeScreen();
	window.requestAnimationFrame(function() {
		wScreen.start();
	});

	var gScreen = new Game();
	$("#playbutton").click(function() {
		if (welstarted) {
			clearInterval(wel_interval_id);
			welstarted = false;
		}
		if (gamestarted) {
			clearInterval(game_interval_id);
			welstarted = false;
		}
		//window.requestAnimationFrame(function() {
			gScreen.reset();
			gScreen.init();
			gScreen.start();
		//});

	});
	$("#mutebutton").click(function() {
		if (play_sound) {
			$("#mutebutton").text('Play Sound');
			play_sound = false;
			entr_audio.pause();
		}
		else {
			$("#mutebutton").text('Mute Sound');
			play_sound = true;
			entr_audio.play();
		}
	});

	$("#expbutton").click(function() {

	});

	$("#helpbutton").click(function() {
		var overlay = "<div class='dialog' style='overflow-y:scroll;'>";

		overlay += "<br></br>";
		overlay += "<h1 class='gtitle' style='color: #DB162F;font-size:50px;'>THE FALLING: HELP</h1>";
		overlay += "<br></br>";

		overlay += "<h2 style='color: #DB162F;'>How To Play</h2>";
		overlay += "<p style='font-size:20px; margin-left:auto; margin-right:auto; width: 40em;'>";
		overlay+= "Destroy the Falling before they invade planet earth! Use the arrow keys to move and space to attack.";
		overlay += "</p>";

		overlay += "<h2 style='color: #DB162F;'>About</h2>";
		overlay += "<p style='font-size:20px; margin-left:auto; margin-right:auto; width: 40em;'>Concieved and developed by Murtuza Kainan. &copy Murtuza Kainan.</p>";

		overlay += "<p><Button id='close-d'>Close";
		overlay += "</Button></p>";


        overlay += "</div>"; //close overlay div
        var $overl = $(overlay);
        $overl.appendTo("body"); //Appends to body and adds to DOM
        $(".dialog").fadeIn();
	});

	$(document).on('click', '#close-d', function () {
    	$(".dialog").remove();
    });


	var keyMap = {
		32: false,
		37: false,
		38: false,
		39: false,
		40: false
	};

	$(document).keydown(function(key) {
		if (gamestarted) {
			switch (parseInt(key.which,10)) {
				case 32: //space
					keyMap[32] = true;
					break;
				case 37: //left
					keyMap[37] = true;
					break;
				case 38: //up
					keyMap[38] = true;
					break;
				case 39: //right
					keyMap[39] = true;
					break;
				case 40: //down
					keyMap[40] = true;
					break;
			}

			if (keyMap[32]) {
				gScreen.plr_missile_sprites.push(new Sprite(gScreen.player_sprite.x_pos + gScreen.player_sprite.sprite_img.width/2 - 4.5, gScreen.player_sprite.y_pos, 0, -3, 7, 22, missile_img));
			}
			if (keyMap[37]) {
				if (gScreen.player_sprite.x_spd > -6) {
					gScreen.player_sprite.x_spd -= 2;
				}
			}
			if (keyMap[38]) {
				if (gScreen.player_sprite.y_spd > -6) {
					gScreen.player_sprite.y_spd -= 2;
				}
			}
			if (keyMap[39]) {
				if (gScreen.player_sprite.x_spd < 6) {
					gScreen.player_sprite.x_spd += 2;
				}
			}
			if (keyMap[40]) {
				if (gScreen.player_sprite.y_spd < 6) {
					gScreen.player_sprite.y_spd += 2;
				}
			}

		}
	});

	$(document).keyup(function(key) {
		if (gamestarted) {
			switch (parseInt(key.which,10)) {
				case 32: //space
					keyMap[32] = false;
					break;
				case 37: //left
					keyMap[37] = false;
					break;
				case 38: //up
					keyMap[38] = false;
					break;
				case 39: //right
					keyMap[39] = false;
					break;
				case 40: //down
					keyMap[40] = false;
					break;
			}

			// if (!keyMap[37] && !keyMap[39]) {
			// 	gScreen.player_sprite.x_spd = 0;
			// }
			// if (!keyMap[38] && !keyMap[40]) {
			// 	gScreen.player_sprite.y_spd = 0;
			// }
		}
	});

	function drawWelcomeScreen() {
		
	}

});

var WelcomeScreen = function() {
	this.sprites = [];
	this.sprites.push(new Sprite(gameboard.width/2 - 1000, gameboard.height/2 + 150, 0, 0, 2000, 2000, earth_img));
	this.sprites.push(new Sprite(10, 10, 2, 0, 220, 120, ufo_img));
	this.sprites.push(new Sprite(400, 100, -2, 0, 220, 120, ufo_img));
	this.sprites.push(new Sprite(250, 250, 2, 0, 220, 120, ufo_img));
	this.sprites.push(new Sprite(250, 0, 2, 1, 35, 65, alien_img));
	this.sprites.push(new Sprite(200, 0, 1, 3, 35, 65, alien_img));
	this.sprites.push(new Sprite(500, 0, -1, 1, 35, 65, alien_img));
	this.sprites.push(new Sprite(50, 0, -3, 4, 35, 65, alien_img));
	this.sprites.push(new Sprite(400, 0, 1, 2, 35, 65, alien_img));
}

WelcomeScreen.prototype.start = function() {

	entr_audio.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	entr_audio.play();
	var that = this;
	wel_interval_id = window.setInterval(function () {
		canvas.fillRect(0, 0, gameboard.width, gameboard.height);

		for (i = 0; i < that.sprites.length; i++) {
			canvas.drawImage(that.sprites[i].sprite_img, that.sprites[i].x_pos, that.sprites[i].y_pos);
			that.sprites[i].x_pos += that.sprites[i].x_spd;
			that.sprites[i].y_pos += that.sprites[i].y_spd;
			if (that.sprites[i].x_pos < 0 && that.sprites[i].x_spd < 0) {
				that.sprites[i].x_spd = -that.sprites[i].x_spd;
			}
			if (that.sprites[i].y_pos < 0 && that.sprites[i].y_spd < 0) {
				that.sprites[i].y_spd = -that.sprites[i].y_spd;
			}
			if (that.sprites[i].x_pos > gameboard.width - that.sprites[i].sprite_img.width && that.sprites[i].x_spd > 0) {
				that.sprites[i].x_spd = -that.sprites[i].x_spd;
			}
			if (that.sprites[i].y_pos > gameboard.height - that.sprites[i].sprite_img.height && that.sprites[i].y_spd > 0) {
				that.sprites[i].y_spd = -that.sprites[i].y_spd;
			}
		}
	}, FPS);
	welstarted = true;
};

var Game = function() {
	this.background_sprites = [];
	this.alien_sprites = [];
	this.par_sprites = [];
	this.opp_missile_sprites = [];
	this.plr_missile_sprites = [];
	this.player_sprite = new Sprite(gameboard.width/2, gameboard.height/2, 0, 0, 80, 110, player_img);
}

Game.prototype.init = function() {
	this.foe_limit = 8;
	health = 20;
	invaded = 0;
	this.player_sprite = new Sprite(gameboard.width/2, gameboard.height/2, 0, 0, 80, 110, player_img);
	this.background_sprites.push(new Sprite(gameboard.width/2 - 1000, gameboard.height/2 + 150, 0, 0, 2000, 2000, earth_img));
	this.background_sprites.push(new Sprite(10, 10, 1, 0, 220, 120, ufo_img));
	this.background_sprites.push(new Sprite(400, 100, -1, 0, 220, 120, ufo_img));
	this.background_sprites.push(new Sprite(250, 250, 1, 0, 220, 120, ufo_img));
	this.generateFoe(this);
}

Game.prototype.reset = function() {
	health = 20;
	invaded = 0;
	score = 0;
	this.background_sprites = [];
	this.alien_sprites = [];
	this.par_sprites = [];
	this.opp_missile_sprites = [];
	this.plr_missile_sprites = [];
	this.player_sprite = new Sprite(gameboard.width/2, gameboard.height/2, 0, 0, 80, 110, player_img);
}

Game.prototype.drawGameState = function(that) {
	canvas.fillRect(0, 0, gameboard.width, gameboard.height);
	for (var i = 0; i < that.background_sprites.length; i++) {
		canvas.drawImage(that.background_sprites[i].sprite_img, that.background_sprites[i].x_pos, that.background_sprites[i].y_pos);
	}
	for (var i = 0; i < that.alien_sprites.length; i++) {
		canvas.drawImage(that.alien_sprites[i].sprite_img, that.alien_sprites[i].x_pos, that.alien_sprites[i].y_pos);
	}
	for (i = 0; i < that.plr_missile_sprites.length; i++) {
		canvas.drawImage(that.plr_missile_sprites[i].sprite_img, that.plr_missile_sprites[i].x_pos, that.plr_missile_sprites[i].y_pos);
	}
	for (var i = 0; i < that.par_sprites.length; i++) {
		canvas.drawImage(that.par_sprites[i].sprite_img, that.par_sprites[i].x_pos, that.par_sprites[i].y_pos);
	}
	canvas.drawImage(that.player_sprite.sprite_img, that.player_sprite.x_pos, that.player_sprite.y_pos);
	if (health <= 0 || invaded >= 50) {
		canvas.fillRect(0, 0, gameboard.width, gameboard.height);
		canvas.drawImage(endgame_img, gameboard.width/2 - endgame_img.width/2, gameboard.height/2 - endgame_img.height/2);
	}
}

Game.prototype.updateGamePositions = function(sprites) {
	for (var i = 0; i < sprites.length; i++) {
		sprites[i].x_pos += sprites[i].x_spd;
		sprites[i].y_pos += sprites[i].y_spd;
		if (sprites[i].x_pos < 0 && sprites[i].x_spd < 0) {
			sprites[i].x_spd = -sprites[i].x_spd;
		}
		if (sprites[i].y_pos < 0 && sprites[i].y_spd < 0) {
			sprites[i].y_spd = -sprites[i].y_spd;
		}
		if (sprites[i].x_pos > gameboard.width - sprites[i].sprite_img.width && sprites[i].x_spd > 0) {
			sprites[i].x_spd = -sprites[i].x_spd;
		}
		if (sprites[i].y_pos > gameboard.height - sprites[i].sprite_img.height && sprites[i].y_spd > 0) {
			sprites[i].y_spd = -sprites[i].y_spd;
		}
	}
}

Game.prototype.updateFoeGamePositions = function(sprites, that) {
	for (var i = 0; i < sprites.length; i++) {
		sprites[i].x_pos += sprites[i].x_spd;
		sprites[i].y_pos += sprites[i].y_spd;
		if (sprites[i].x_pos < 0 && sprites[i].x_spd < 0) {
			sprites[i].x_spd = -sprites[i].x_spd;
		}
		if (sprites[i].y_pos < 0 && sprites[i].y_spd < 0) {
			sprites[i].y_spd = -sprites[i].y_spd;
		}
		if (sprites[i].x_pos > gameboard.width - sprites[i].sprite_img.width && sprites[i].x_spd > 0) {
			sprites[i].x_spd = -sprites[i].x_spd;
		}
		if (sprites[i].y_pos > gameboard.height - sprites[i].sprite_img.height && sprites[i].y_spd > 0) {
			invaded++;
			if (invaded%5 == 0) {
				that.background_sprites.push(new Sprite(sprites[i].x_pos, getRandomNumber(sprites[i].y_pos - 200, sprites[i].y_pos - 100), 0, 0, 220, 120, flag_img));	
			}
			sprites.splice(i, 1);
			$("#invaded").text("Invaded: " + ((invaded * 100)/50) + "%");
		}
	}
}

Game.prototype.updateGameState = function(that) {
	that.updateGamePositions(that.background_sprites);
	that.updateGamePositions(that.par_sprites);
	that.updateFoeGamePositions(that.alien_sprites, that);

	for (var i = 0; i < that.plr_missile_sprites.length; i++) {
		that.plr_missile_sprites[i].x_pos += that.plr_missile_sprites[i].x_spd;
		that.plr_missile_sprites[i].y_pos += that.plr_missile_sprites[i].y_spd;
		if (that.plr_missile_sprites[i].x_pos < 0 && that.plr_missile_sprites[i].x_spd < 0) {
			that.plr_missile_sprites[i].x_spd = -that.plr_missile_sprites[i].x_spd;
		}
		else if (that.plr_missile_sprites[i].y_pos < 0 && that.plr_missile_sprites[i].y_spd < 0) {
			that.plr_missile_sprites.splice(i, 1);
		}
		else if (that.plr_missile_sprites[i].x_pos > gameboard.width && that.plr_missile_sprites[i].x_spd > 0) {
			that.plr_missile_sprites[i].x_spd = -that.plr_missile_sprites[i].x_spd;
		}
		else if (that.plr_missile_sprites[i].y_pos > gameboard.height && that.plr_missile_sprites[i].y_spd > 0) {
			that.plr_missile_sprites[i].y_spd = -that.plr_missile_sprites[i].y_spd;
		}
	}

	for (var i = 0; i < that.plr_missile_sprites.length; i++) {
		for (var j = 0; j < that.alien_sprites.length; j++) {
			if (that.detectCollision(that.plr_missile_sprites[i], that.alien_sprites[j])) {
				that.plr_missile_sprites.splice(i, 1);
				that.generateBlueParticleExplosion(that.alien_sprites[j].x_pos, that.alien_sprites[j].y_pos, that);
				that.alien_sprites.splice(j, 1);
				score++;
				$("#score").text("Score: " + score);
			}
		}
	}

	for (var i = 0; i < that.alien_sprites.length; i++) {
		if (that.detectCollision(that.player_sprite, that.alien_sprites[i])) {
			that.alien_sprites.splice(i, 1);
			health--;
			$("#health").text("Health: " + health);
		}
	}

	for (var i = 0; i < that.par_sprites.length; i++) {
		if (that.par_sprites[i].distance_travelled > 20) {
			that.par_sprites.splice(i, 1);
		}
		that.par_sprites[i].distance_travelled++;
	}

	that.player_sprite.x_pos += that.player_sprite.x_spd;
	that.player_sprite.y_pos += that.player_sprite.y_spd;
	
	if (that.player_sprite.x_pos < 0 && that.player_sprite.x_spd < 0) {
		that.player_sprite.x_spd = 2;
	}
	if (that.player_sprite.y_pos < 0 && that.player_sprite.y_spd < 0) {
		that.player_sprite.y_spd = 2;
	}
	if (that.player_sprite.x_pos > gameboard.width - that.player_sprite.sprite_img.width && that.player_sprite.x_spd > 0) {
		that.player_sprite.x_spd = -2;
	}
	if (that.player_sprite.y_pos > gameboard.height - that.player_sprite.sprite_img.height && that.player_sprite.y_spd > 0) {
		that.player_sprite.y_spd = -2;
	}
};

Game.prototype.generateFoe = function(that) {
	var foesToGen = that.foe_limit - that.alien_sprites.length;
	for (var i = 0; i < foesToGen; i++) {
		that.alien_sprites.push(new Sprite(getRandomNumber(0, gameboard.width), -10, getRandomNumber(-6, 6), getRandomNumber(1, 3), 35, 65, alien_img));
	}
}

Game.prototype.generateBlueParticleExplosion = function(x, y, that) {
	that.par_sprites.push(new Sprite(x, y, 0, -2, 1, 1, par1_img));
	that.par_sprites.push(new Sprite(x, y, 0, 2, 1, 1, par1_img));
	that.par_sprites.push(new Sprite(x, y, -2, 0, 1, 1, par1_img));
	that.par_sprites.push(new Sprite(x, y, 2, 0, 1, 1, par1_img));

	that.par_sprites.push(new Sprite(x, y, 1, -1, 1, 1, par1_img));
	that.par_sprites.push(new Sprite(x, y, 1, 1, 1, 1, par1_img));
	that.par_sprites.push(new Sprite(x, y, -1, 1, 1, 1, par1_img));
	that.par_sprites.push(new Sprite(x, y, -1, -1, 1, 1, par1_img));
}

Game.prototype.detectCollision = function(sprite_1, sprite_2) {
	var r_x = sprite_2.sprite_img.width/2;
	var r_y = sprite_2.sprite_img.height/2;
	if ((sprite_2.x_pos > sprite_1.x_pos - r_x && sprite_2.x_pos < sprite_1.x_pos + r_x*2) && 
		(sprite_2.y_pos > sprite_1.y_pos - r_y && sprite_2.y_pos < sprite_1.y_pos + r_y*2)) {
		return true;
	}
	return false;
}

Game.prototype.checkForDefeat = function(that) {
	if (health <= 0 || invaded >= 50) {
		clearInterval(game_interval_id);
		canvas.fillRect(0, 0, gameboard.width, gameboard.height);
		canvas.drawImage(endgame_img, gameboard.width/2 - endgame_img.width/2, gameboard.height/2 - endgame_img.height/2);
	}
}

Game.prototype.start = function() {
	entr_audio.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	entr_audio.play();
	var that = this;
	game_interval_id = window.setInterval(function () {
		that.checkForDefeat(that);
		that.updateGameState(that);
		that.drawGameState(that);
		that.generateFoe(that);
	}, FPS);
	gamestarted = true;
};

var Sprite = function(x_pos, y_pos, x_spd, y_spd, x_scl, y_scl, sprite_img) {
	this.x_pos = x_pos;
	this.y_pos = y_pos;
	this.x_spd = x_spd;
	this.y_spd = y_spd;
	this.x_scl = x_scl;
	this.y_scl = y_scl;
	this.sprite_img = sprite_img;
	this.distance_travelled = 0;
};

function getRandomNumber(min, max) {
	var rand = min + Math.random()*(max+1-min)
	rand = Math.floor(rand)
	return rand;
};
