var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	function preload(){
		game.load.image('grass', 'assets/dark_grass.png');
		game.load.image('ship', 'assets/car90.png');
		game.load.image('bullet', 'assets/bullet14.png');
	}

	var sprite;
	var weapon;
	var cursors;
	var fireBtn;

	function create(){
		game.add.tileSprite(0, 0, 1000, 1000, 'grass');
		sprite = this.add.sprite (400, 300, 'ship');
		sprite.anchor.set(0.5);
		game.physics.arcade.enable(sprite);
		sprite.body.drag.set(70);
		sprite.body.maxVelocity.set(200);

		weapon = game.add.weapon(30, 'bullet');
		weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		weapon.bulletSpeed = 600;
		weapon.fireRate = 100;
		weapon.trackSprite(sprite, 0, 0, true);
		// weapon.animations.add([0,1,2,3], 10, true);

		cursors = this.input.keyboard.createCursorKeys();
		fireBtn = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

	}

	function update(){
		if (cursors.up.isDown){
			game.physics.arcade.accelerationFromRotation(sprite.rotation, 300, sprite.body.acceleration);
		}
		else {
			sprite.body.acceleration.set(0);
		}

		if (cursors.left.isDown){
			sprite.body.angularVelocity = -300;
		}
		else if(cursors.right.isDown){
			sprite.body.angularVelocity = 300;
		}
		else {
			sprite.body.angularVelocity = 0;
		}

		if (fireBtn.isDown){
			weapon.fire();
		}

		game.world.wrap(sprite, 16);

	}

	function render() {

    weapon.debug();

}