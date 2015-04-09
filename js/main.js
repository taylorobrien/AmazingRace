//amazing-race
var P2Game = {};

var game = new Phaser.Game(840, 500, Phaser.CANVAS, 'game');
var score = 0;
var visitdesert = false;
var visitairplane = false;
var visittrivia = false;
var visitwater = false;
var music;


P2Game.Boot = function (game){

},

P2Game.Boot.prototype = {
	preload: function () {
		this.load.image('preloaderbar','assets/loader.png');

	},

	create: function (){
		this.game.stage.backgroundColor = '#abf';
		this.state.start('Preload');
	},

	update: function(){

	},
}



P2Game.Preload = function (game){

},

P2Game.Preload.prototype = {
	preload: function () {
		this.game.stage.backgroundColor = '#63B8FF';
		var preloaderbar = this.add.sprite(150,300, 'preloaderbar');
		var style3 = {font: "30px Arial", fill:"#DC143C"};
		var scoringstuff = "Welcome to the AMAZING RACE!";
 		var winstatement = game.add.text(200,200,scoringstuff,style3);
		this.load.image('world-mapbg','assets/world-map.gif');
		this.load.spritesheet('flyingflag','assets/flyingflag.png',50.3,73,11);
		this.load.spritesheet('camel','assets/camel.png',80,80,12);
		this.load.spritesheet('redplayer','assets/redrunning.png',98,113,6);
		this.load.spritesheet('mermaid','assets/mermaid.png',56,48,12);
		this.load.spritesheet('bull','assets/bull.png',148,80,4);
		this.load.spritesheet('clam','assets/clamshell.png',1000,1000,2);
		this.load.image('dessertbg','assets/streetbackground.png');
		this.load.image('woodbox','assets/woodbox.png');
		this.load.image('continuebutton','assets/continuebutton.png');
		this.load.image('airplane','assets/airplane.png');	
		this.load.tilemap('flyingmap', 'assets/flyingmap.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('underwater', 'assets/underwater.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('seaweedtile','assets/seaweedtile.png');
		this.load.image('bulltile', 'assets/bulltile.png');
		this.load.image('balloon','assets/balloon.png'); 
		this.load.image('UW-BG','assets/underwater-bg.jpg'); 
		this.load.image('sea-urchin','assets/sea-urchin.png');	
		this.load.audio('ThemeSong',['assets/ThemeSong.mp3','assets/ThemeSong.ogg']);


	},

	create: function (){

		this.state.start('WorldMap');

	},

	update: function(){

	},
}


P2Game.WorldMap = function (game) {

	this.player;
	this.bg;
	this.layer;

},

P2Game.WorldMap.prototype = {

preload: function () {
 

    },

    create: function () {

	music = game.add.audio('ThemeSong');
	music.play();	

	
	this.bg = game.add.tileSprite(0, 0, 2000, 1000, 'world-mapbg');
	this.bg.scale.set(.7,.7);

	this.game.physics.arcade.gravity.y = 0;

        this.cursors = this.input.keyboard.createCursorKeys();

	this.flag1 = this.game.add.sprite(100,100,'flyingflag');
	this.game.physics.arcade.enable(this.flag1);
	this.flag1.animations.add('flying', [0,1,2,3,4,5,6,7,8,9,10], 11, true);
	this.flag1.animations.play('flying');

	this.flag2 = this.game.add.sprite(380,140,'flyingflag');
	this.game.physics.arcade.enable(this.flag2);
	this.flag2.animations.add('flying', [0,1,2,3,4,5,6,7,8,9,10], 11, true);
	this.flag2.animations.play('flying');

	this.flag3 = this.game.add.sprite(600,175,'flyingflag');
	this.game.physics.arcade.enable(this.flag3);
	this.flag3.animations.add('flying', [0,1,2,3,4,5,6,7,8,9,10], 11, true);
	this.flag3.animations.play('flying');
    
	this.flag1.inputEnabled = true;
	this.flag1.events.onInputDown.add(this.ToCamel,this);
	this.flag2.inputEnabled = true;
	this.flag2.events.onInputDown.add(this.ToAirplane,this);
	this.flag3.inputEnabled = true;
	this.flag3.events.onInputDown.add(this.ToWater,this);


},


    ToCamel: function(){
	if(visitdesert == false){
	this.state.start('Desert');
	}

    },

    ToAirplane: function(){
	if(visitairplane == false){
	this.state.start('FlyingAirplane');
	}
    },

    ToWater: function(){
	if(visitwater == false){
	this.state.start('UnderWater');
	}
    },


    update: function () {

	if(visitwater == true && visitairplane == true && visitdesert == true){
		this.state.start('End1');
	}


    },

    render: function () {
	
	
	this.game.debug.text("Score: " + score, 50, 50);

    },

};


//  Desert //////////////////////////////////////////////////////////

P2Game.Desert = function (game) {
	this.player;
	this.map;
	this.bg;
	this.layer;
	this.cursors;
	this.facing = 'left';
	this.timeleft = 60;
	this.score = 0;
	

};

P2Game.Desert.prototype = {

    create: function () {
	visitdesert = true;

	this.bg = game.add.tileSprite(0, 0, 2000, 600, 'dessertbg');
	this.bg.scale.set(2,2.22);
	
	this.game.physics.arcade.gravity.y = 200;
	
	this.bull = this.game.add.sprite(150,500,'bull');
	this.game.physics.arcade.enable(this.bull);
	this.bull.animations.add('run', [0,1,2,3],4, true);
    	this.bull.animations.add('idle', [0], 1, true);
	this.bull.body.collideWorldBounds = true;
	//this.player.scale.set(4.5,4.5);
	//this.game.camera.follow(this.player);
	this.bull.animations.play('run');
        
	this.player = this.game.add.sprite(400,500,'redplayer');
	this.game.physics.arcade.enable(this.player);
	this.player.body.collideWorldBounds = true;
	this.player.animations.add('run', [0,1,2,3],4, true);
    	this.player.animations.add('idle', [0], 1, true);

    	this.broken2 = game.add.group();
    	this.broken2.enableBody = true;


	this.cursors = this.input.keyboard.createCursorKeys();
	
	this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 61, this.minustime,this);
	this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 61, this.addbox, this);
	
	
	

    },



	addbox: function(){
		this.box = this.broken2.create(800, game.world.randomY+50, 'woodbox');
       		this.box.body.velocity.x = -100-(2*(60-this.timeleft));
		this.box.body.allowGravity = false;
		this.box.scale.set(.2,.2);
		this.box.body.immovable = true;

	},


	Click: function(){
		this.state.start('WorldMap');
	},
  
	minustime: function(){
		this.timeleft--;

	},    

	killed: function(){
		this.bull.animations.stop();
		this.player.body.immovable = true;

		this.game.add.button(game.world.centerX-50, game.world.centerY, 'continuebutton', this.Click, this, null);
		score = score + (60-this.timeleft) + this.score;

	},

	up: function(){
		if(this.cursors.up.isDown){
			this.player.body.velocity.y = -300;
		        
		}
	},


	killballoon: function(body1,body2){
		body2.kill();
		this.score++;
	},


    update: function () {
		this.game.physics.arcade.collide(this.player,this.broken2, this.up, null, this);
	this.game.physics.arcade.collide(this.player,this.bull, this.killed, null, this);
	
	if(this.timeleft <= 0){
		this.bull.animations.stop();
		this.player.body.immovable = true;

		this.game.add.button(game.world.centerX-50, game.world.centerY, 'continuebutton', this.Click, this, null);
		score = score + 60;
		
	}
else{
		this.bg.tilePosition.x -= 2;
}



    this.player.body.velocity.x = 0;


if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -200;

        if (this.facing != 'left')
        {
            this.player.animations.play('run');
            this.facing = 'left';
        }
    }


else if (this.cursors.up.isDown && this.player.body.onFloor())
    {
        this.player.body.velocity.y = -300;

        if (this.facing != 'idle')
        {
            this.player.animations.play('run');
            this.facing = 'idle';
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 200;
	        if (this.facing != 'right')
        {
            this.player.animations.play('run');
            this.facing = 'right';
        }


    }
     else
    {
        if (this.facing != 'idle')
        {
            this.player.animations.stop();

            if (this.facing == 'left')
            {
                this.player.frame = 0;
            }
            else
            {
                this.player.frame = 5;
            }

            this.facing = 'idle';
        }
    }


	//this.bg.tilePosition.x -= 1;
    },


    render: function () {
	
	this.game.debug.text("Time Remaining: " + this.timeleft, 50, 50);
    }


};


//////////FlyingAirplane/////////////////////////////
P2Game.FlyingAirplane = function (game) {

	this.player;
	this.bg;
	this.layer;
	this.timeleft = 81;
	this.health = 100;
	this.score = 0;

},

P2Game.FlyingAirplane.prototype = {

preload: function () {
 

    },

    create: function () {

	visitairplane = true;


	//music2 = game.add.audio('flowercollecting');
	//music2.play();

        
	this.map = this.game.add.tilemap('flyingmap');
	this.map.addTilesetImage('bulltile');
    	this.layer = this.map.createLayer('Tile Layer 2');
    	this.layer.resizeWorld();
 	this.map.setCollisionBetween(1, 12);



	this.player = this.game.add.sprite(50,50,'airplane');
	this.game.physics.arcade.enable(this.player);
	this.player.scale.set(.2,.2);
	this.player.body.collideWorldBounds = true;

	this.redballoon = game.add.group();
	this.redballoon.enableBody = true;

	this.game.camera.follow(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();

	this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 81, this.minustime,this);
	this.game.time.events.repeat(Phaser.Timer.SECOND * .0001, 50, this.makeballoon,this);

    },

	killballoon: function(body1, body2){
		body2.kill();
		this.score ++;
	},
    

	makeballoon: function(){
		this.balloon = this.redballoon.create(game.world.randomX, game.world.randomY+100, 'balloon');
		this.balloon.body.immovable = true;
		this.balloon.body.velocity.y = -5;

		

	},


	removehealth: function(){
		this.health--;


	},


	minustime: function(){
		this.timeleft--;
	},



	Click: function(){
		this.state.start('WorldMap');
	},

  
    update: function () {

	this.player.body.velocity.x = 120;
	this.player.body.velocity.y = 0;
	this.game.physics.arcade.collide(this.player,this.layer, this.removehealth, null, this);
	this.game.physics.arcade.overlap(this.player,this.redballoon,this.killballoon,null,this);
	


 if (this.cursors.down.isDown)
    {
        this.player.body.velocity.y = 200;

        if (this.facing != 'idle')
        {
            this.player.animations.play('idle');
            this.facing = 'idle';
        }
    }
else if (this.cursors.up.isDown)
    {
        this.player.body.velocity.y = -200;

        if (this.facing != 'idle')
        {
            this.player.animations.play('up');
            this.facing = 'idle';
        }
    }
	if(this.timeleft <= 0){
		this.player.body.velocity.x = 0;
		this.game.add.button(game.world.centerX-50, game.world.centerY, 'continuebutton', this.Click, this, null);
		score = score + this.health + 81-this.timeleft + this.score;
		this.health = 0;
	}    

	if(this.health <= 0){ 
		this.player.body.velocity.x = 0;
		this.game.add.button(this.player.x, this.player.y, 'continuebutton', this.Click, this, null);
		score = score + this.health + 81-this.timeleft + this.score;
		this.timeleft = 0;
	
	}


    },

    render: function () {

	this.game.debug.text("Distance Left: " + this.timeleft, 50, 50);
	this.game.debug.text("Health: " + this.health, 450, 50);
	this.game.debug.text("Score: " + this.score, 250, 50);


    },

};




//////////UnderWater/////////////////////////////
P2Game.UnderWater = function (game) {

	this.mermaid;
	this.bg;
	this.layer;
	this.timeleft = 60;
	this.stop = false;
	this.score = 0;
	this.pearl1 = false;
	this.pearl2 = false;
	this.pearl3 = false;
	this.pearl4 = false;
	this.pearl5 = false;
	this.health = 100;

},

P2Game.UnderWater.prototype = {

preload: function () {
 

    },

    create: function () {
	visitwater = true;

	//music3 = game.add.audio('hellopotion');
	//music3.play();

        //this.game.stage.backgroundColor = '#806000';
	this.bg = game.add.tileSprite(0, 0, 2000, 600, 'UW-BG');
	this.bg.scale.set(1.2,1);

	
	this.map = this.game.add.tilemap('underwater');
	this.map.addTilesetImage('seaweedtile');
    	this.layer =this. map.createLayer('Tile Layer 1');
    	this.layer.resizeWorld();
 	this.map.setCollisionBetween(1, 12);

	this.clam1 = this.game.add.sprite(325,500,'clam');
	this.game.physics.arcade.enable(this.clam1);
	this.clam1.animations.add('haspearl',[0],1,true);
	this.clam1.animations.add('nopearl',[1],1,true);
	this.clam1.animations.play('haspearl');
	this.clam1.scale.set(.06,.06);

	this.clam2 = this.game.add.sprite(580,90,'clam');
	this.game.physics.arcade.enable(this.clam2);
	this.clam2.animations.add('haspearl',[0],1,true);
	this.clam2.animations.add('nopearl',[1],1,true);
	this.clam2.animations.play('haspearl');
	this.clam2.scale.set(.06,.06);

	this.clam3 = this.game.add.sprite(860,530,'clam');
	this.game.physics.arcade.enable(this.clam3);
	this.clam3.animations.add('haspearl',[0],1,true);
	this.clam3.animations.add('nopearl',[1],1,true);
	this.clam3.animations.play('haspearl');
	this.clam3.scale.set(.06,.06);

	this.clam4 = this.game.add.sprite(1480,280,'clam');
	this.game.physics.arcade.enable(this.clam4);
	this.clam4.animations.add('haspearl',[0],1,true);
	this.clam4.animations.add('nopearl',[1],1,true);
	this.clam4.animations.play('haspearl');
	this.clam4.scale.set(.06,.06);

	this.clam5 = this.game.add.sprite(1850,500,'clam');
	this.game.physics.arcade.enable(this.clam5);
	this.clam5.animations.add('haspearl',[0],1,true);
	this.clam5.animations.add('nopearl',[1],1,true);
	this.clam5.animations.play('haspearl');
	this.clam5.scale.set(.06,.06);
	
	this.mermaid = this.game.add.sprite(80,80, 'mermaid');
	this.game.physics.arcade.enable(this.mermaid);
	this.mermaid.animations.add('left', [3,4,5], 3, true);
    	this.mermaid.animations.add('right', [6,7,8], 3, true);
    	this.mermaid.animations.add('down', [0,1,2], 3, true);
    	this.mermaid.animations.add('up', [9,10,11], 3, true);
    	this.mermaid.animations.add('idle', [0], 1, true);
	this.game.camera.follow(this.mermaid);

	this.seaurchin1 = this.game.add.sprite(170,200,'sea-urchin');
	this.game.physics.arcade.enable(this.seaurchin1);
	this.seaurchin1.scale.set(.3,.3);

	this.seaurchin2 = this.game.add.sprite(670,100,'sea-urchin');
	this.game.physics.arcade.enable(this.seaurchin2);
	this.seaurchin2.scale.set(.3,.3);

	this.seaurchin3 = this.game.add.sprite(1300,300,'sea-urchin');
	this.game.physics.arcade.enable(this.seaurchin3);
	this.seaurchin3.scale.set(.3,.3);




	//this.game.camera.follow(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();
 
},

	Click: function(){
		this.state.start('WorldMap');
	},

	getpearl1: function(){
		if(this.pearl1 == false){
		this.clam1.animations.play('nopearl');
		this.score++;
		}
		this.pearl1 = true;
	},

	getpearl2: function(){
		if(this.pearl2 == false){
		this.clam2.animations.play('nopearl');
		this.score++;
		}
		this.pearl2 = true;
	},

	getpearl3: function(){
		if(this.pearl3 == false){
		this.clam3.animations.play('nopearl');
		this.score++;
		}
		this.pearl3 = true;
	},

	getpearl4: function(){
		if(this.pearl4 == false){
		this.clam4.animations.play('nopearl');
		this.score++;
		}
		this.pearl4 = true;
	},

	getpearl5: function(){
		if(this.pearl5 == false){
		this.clam5.animations.play('nopearl');
		this.score++;
		}
		this.pearl5 = true;
	},

   
    minushp: function(){
	this.health --;
},
   

    update: function () {
	this.game.physics.arcade.overlap(this.mermaid,this.clam1,this.getpearl1,null,this);
	this.game.physics.arcade.overlap(this.mermaid,this.clam2,this.getpearl2,null,this);
	this.game.physics.arcade.overlap(this.mermaid,this.clam3,this.getpearl3,null,this);
	this.game.physics.arcade.overlap(this.mermaid,this.clam4,this.getpearl4,null,this);
	this.game.physics.arcade.overlap(this.mermaid,this.clam5,this.getpearl5,null,this);
	this.game.physics.arcade.overlap(this.mermaid,this.seaurchin1,this.minushp,null,this);
	this.game.physics.arcade.overlap(this.mermaid,this.seaurchin2,this.minushp,null,this);
	this.game.physics.arcade.overlap(this.mermaid,this.seaurchin3,this.minushp,null,this);


	this.game.physics.arcade.collide(this.mermaid,this.layer);
	this.mermaid.body.velocity.x = 0;
	this.mermaid.body.velocity.y = -5;

	if(this.score == 5){
		this.game.add.button(this.mermaid.x, this.mermaid.y, 'continuebutton', this.Click, this, null);
		score = score + this.score;
		this.mermaid.body.immovable = true;

	}

	if(this.health <= 0){
		this.game.add.button(this.mermaid.x, this.mermaid.y, 'continuebutton', this.Click, this, null);
		score = score + this.score;
		this.mermaid.body.immovable = true;

	}	


if (this.cursors.left.isDown)
    {
        this.mermaid.body.velocity.x = -200;

        if (this.facing != 'left')
        {
            this.mermaid.animations.play('left');
            this.facing = 'left';
        }
    }
else if (this.cursors.down.isDown)
    {
        this.mermaid.body.velocity.y = 200;

        if (this.facing != 'idle')
        {
            this.mermaid.animations.play('down');
            this.facing = 'idle';
        }
    }
else if (this.cursors.up.isDown)
    {
        this.mermaid.body.velocity.y = -200;

        if (this.facing != 'idle')
        {
            this.mermaid.animations.play('up');
            this.facing = 'idle';
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.mermaid.body.velocity.x = 200;
	        if (this.facing != 'right')
        {
            this.mermaid.animations.play('right');
            this.facing = 'right';
        }


    }
     else
    {
        if (this.facing != 'idle')
        {
            this.mermaid.animations.stop();

            if (this.facing == 'left')
            {
                this.mermaid.frame = 0;
            }
            else
            {
                this.mermaid.frame = 5;
            }

            this.facing = 'idle';
        }
    }



    },

    render: function () {

       this.game.debug.text("Pearls: " + this.score, 50, 50);
       this.game.debug.text("Health: " + this.health, 400, 50);



    }

};

P2Game.End1 = function (game) {


    this.cursors;

    this.result = 'Move with cursors. Hit an object to change State';

};

P2Game.End1.prototype = {

    create: function () {


	this.game.stage.backgroundColor = '#00FFFF';	

	var style3 = {font: "25px Arial", fill:"#DC143C"};
	var scoringstuff = "You Finished the Amazing Race! Your score: " + score;
 	var winstatement = game.add.text(50,200,scoringstuff,style3);
	music.pause();
	

    },


    
    update: function () {


    },


    render: function () {

    }

};


game.state.add('End1', P2Game.End1);
game.state.add('Boot', P2Game.Boot);
game.state.add('UnderWater', P2Game.UnderWater);
game.state.add('WorldMap', P2Game.WorldMap);
game.state.add('Preload', P2Game.Preload);
game.state.add('Desert', P2Game.Desert);
game.state.add('FlyingAirplane', P2Game.FlyingAirplane);


game.state.start('Boot');

//http://www.spriters-resource.com/arcade/ms2/sheet/27591/
//http://geology.com/world/world-map.gif
//http://www.hdwallpapersinn.com/wp-content/uploads/2014/08/atacama_desert_in_bolivia..jpg
//http://www.spriters-resource.com/arcade/ms2/sheet/27591/
//http://www.spriters-resource.com/resources/sheets/47/49867.png
//http://features.cgsociety.org/newgallerycrits/g95/453895/453895_1298562889_medium.jpg
//http://forums.rpgmakerweb.com/uploads/gallery/album_2/gallery_5198_2_12576.png
//

