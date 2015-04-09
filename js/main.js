//amazing-race
var P2Game = {};

var game = new Phaser.Game(840, 500, Phaser.CANVAS, 'game');
var score = 0;


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
		this.load.spritesheet('bull','assets/bull.png',148,80,4);
		this.load.image('dessertbg','assets/streetbackground.png');
		this.load.image('woodbox','assets/woodbox.png');
		this.load.image('continuebutton','assets/continuebutton.png');
		this.load.image('airplane','assets/airplane.png');	
		this.load.tilemap('flyingmap', 'assets/flyingmap.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('bulltile', 'assets/bulltile.png'); 		


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

	//music = game.add.audio('ThemeSong');
	//music.play();	

	
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

},


    ToCamel: function(){
	this.state.start('Desert');

    },

    ToAirplane: function(){
	this.state.start('FlyingAirplane');

    },


    update: function () {




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
	this.timeleft = 5;
	

};

P2Game.Desert.prototype = {

    create: function () {

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

	this.cursors = this.input.keyboard.createCursorKeys();
	
	this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 61, this.minustime,this);
	
	
	

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
		score = score + 60-this.timeleft;

	},


    update: function () {

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
        this.player.body.velocity.y = -200;

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

},

P2Game.FlyingAirplane.prototype = {

preload: function () {
 

    },

    create: function () {


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

	this.game.camera.follow(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();

	this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 81, this.minustime,this);

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
		score = score + this.health + 81-this.timeleft;
	}    

	if(this.health <= 0){ 
		this.player.body.velocity.x = 0;
		this.game.add.button(this.player.x, this.player.y, 'continuebutton', this.Click, this, null);
		score = score + this.health + 81-this.timeleft;
	
	}


    },

    render: function () {

	this.game.debug.text("Distance Left: " + this.timeleft, 50, 50);
	this.game.debug.text("Health: " + this.health, 400, 50);


    },

};




//////////InWitchShop/////////////////////////////
P2Game.InWitchShop = function (game) {

	this.player;
	this.bg;
	this.layer;
	this.stop = false;

},

P2Game.InWitchShop.prototype = {

preload: function () {
 

    },

    create: function () {
	locationy = "witchshop";

	music3 = game.add.audio('hellopotion');
	music3.play();

        //this.game.stage.backgroundColor = '#806000';
	this.bg = game.add.tileSprite(0, 0, 2000, 600, 'witchbackground');
	//this.bg.scale.set(2,2);

	this.blackbar = this.game.add.sprite(870,590,'blackbar'); //435
	this.blackbar.scale.set(1,2);
	this.game.physics.arcade.enable(this.blackbar);
	this.blackbar.body.immovable = true;
	
	this.map = this.game.add.tilemap('witchmap');
	this.map.addTilesetImage('witchtile');
    	this.layer =this. map.createLayer('Tile Layer 1');
    	this.layer.resizeWorld();
 	this.map.setCollisionBetween(1, 12);

	this.potion1 = this.game.add.sprite(1500,400,'potion1');
	this.game.physics.arcade.enable(this.potion1);
	this.potion1.body.immovable = true;
	this.potion1.scale.set(.3,.3);

	this.potion2 = this.game.add.sprite(700,80,'potion2');
	this.game.physics.arcade.enable(this.potion2);
	//this.potion2.body.immovable = true;
	this.potion2.scale.set(.3,.3);

	this.potion3 = this.game.add.sprite(1300,100,'potion3');
	this.game.physics.arcade.enable(this.potion3);
	//this.potion3.body.immovable = true;
	this.potion3.scale.set(.3,.3);

	this.potion4 = this.game.add.sprite(500,400,'potion4');
	this.game.physics.arcade.enable(this.potion4);
	//this.potion4.body.immovable = true;
	this.potion4.scale.set(.3,.3);

	this.potion5 = this.game.add.sprite(1000,200,'potion5');
	this.game.physics.arcade.enable(this.potion5);
	//this.potion5.body.immovable = true;
	this.potion5.scale.set(.3,.3);

	this.witchlady = this.game.add.sprite(900,400, 'witchsprite');
	this.game.physics.arcade.enable(this.witchlady);
	this.witchlady.animations.add('left', [3,4,5], 3, true);
    	this.witchlady.animations.add('right', [6,7,8], 3, true);
    	this.witchlady.animations.add('idle', [0,1,2], 3, true);
    	this.witchlady.animations.add('up', [9,10,11], 3, true);

	this.player = this.game.add.sprite(920,540,'player');
	this.game.physics.arcade.enable(this.player);
	this.player.animations.add('left', [3,4,5], 3, true);
    	this.player.animations.add('right', [6,7,8], 3, true);
    	this.player.animations.add('idle', [0,1,2], 3, true);
    	this.player.animations.add('up', [9,10,11], 3, true);


	this.game.camera.follow(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();

	this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 3000, this.minustime,this);
	this.game.time.events.repeat(Phaser.Timer.SECOND * 3, 3000, this.witchladymove,this);


	
    
},

   witchladymove: function(){
	this.witchlady.body.velocity.x = Math.random()*(101)+100*-1^(Math.random());
	this.witchlady.body.velocity.y = Math.random()*(101)+100*-1^(Math.random());
},

    minustime: function(){
	timeleft --;
},
   
    goDesert: function(){
	this.state.start('Desert');
},

   pausemovement: function(){
	this.witchlady.body.velocity.x = 0;
	this.witchlady.body.velocity.y = 0;
},

   getpotion1: function(body1,body2){
	if(holdingpotion == false && money >= 150){
		body2.kill()
		potioninbag = "potion1"
		holdingpotion = true;
		money = money - 150;
	}
},

   getpotion2: function(body1,body2){
	if(holdingpotion == false && money >= 150){
		body2.kill()
		potioninbag = "potion2"
		holdingpotion = true;
		money = money - 150;
	}
},

   getpotion3: function(body1,body2){
	if(holdingpotion == false && money >= 150){
		body2.kill()
		potioninbag = "potion3"
		holdingpotion = true;
		money = money - 150;
	}
},

   getpotion4: function(body1,body2){
	if(holdingpotion == false && money >= 150){
		body2.kill()
		potioninbag = "potion4"
		holdingpotion = true;
		money = money - 150;
	}
},

   getpotion5: function(body1,body2){
	if(holdingpotion == false && money >= 150){
		body2.kill()
		potioninbag = "potion5"
		holdingpotion = true;
		money = money - 150;
	}
},




    update: function () {

	if(timeleft <=0){
		this.state.start('End1');
	}	

	this.game.physics.arcade.collide(this.witchlady,this.layer);
	this.game.physics.arcade.collide(this.player,this.layer);
	this.game.physics.arcade.overlap(this.player,this.blackbar,this.goDesert,null,this);
	this.game.physics.arcade.overlap(this.player,this.potion1,this.getpotion1,null,this);
	this.game.physics.arcade.overlap(this.player,this.potion2,this.getpotion2,null,this);
	this.game.physics.arcade.overlap(this.player,this.potion3,this.getpotion3,null,this);
	this.game.physics.arcade.overlap(this.player,this.potion4,this.getpotion4,null,this);
	this.game.physics.arcade.overlap(this.player,this.potion5,this.getpotion5,null,this);

	this.player.body.velocity.x = 0;
    	this.player.body.velocity.y = 0;

	this.game.physics.arcade.overlap(this.player,this.witchlady,this.pausemovement,null,this);
	

if(this.witchlady.body.velocity.x > 0 && this.witchlady.body.velocity.x > this.witchlady.body.velocity.y){
		this.witchlady.animations.play('right');
}
	else if (this.witchlady.body.velocity.x < 0 && this.witchlady.body.velocity.x < this.witchlady.body.velocity.y){
		this.witchlady.animations.play('left');
}
	else if(this.witchlady.body.velocity.y > 0 && this.witchlady.body.velocity.y > this.witchlady.body.velocity.x){
		this.witchlady.animations.play('up');
}
	else{
		this.witchlady.animations.play('idle');
}


if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -200;

        if (this.facing != 'left')
        {
            this.player.animations.play('left');
            this.facing = 'left';
        }
    }
else if (this.cursors.down.isDown)
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
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 200;
	        if (this.facing != 'right')
        {
            this.player.animations.play('right');
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



    },

    render: function () {

       

       this.game.debug.text("Time Remaining: " + timeleft, 50, 50);
	if(gettingflowers == true){
		this.game.debug.text("Flowers: " + flowerpoint, 50,480);
	}       
	this.game.debug.text("Money: " + money, 400,50);


    }

};

P2Game.End1 = function (game) {


    this.cursors;

    this.result = 'Move with cursors. Hit an object to change State';

};

P2Game.End1.prototype = {

    create: function () {


	this.game.stage.backgroundColor = '#00FFFF';	

	var style3 = {font: "30px Arial", fill:"#DC143C"};
	if(timeleft > 0){
		var scoringstuff = "Thanks for your help! You saved your friend!"}
	else{
		var scoringstuff = "Try Again. Refresh to Play!";
	}
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
game.state.add('InWitchShop', P2Game.InWitchShop);
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

