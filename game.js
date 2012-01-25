var RADIUS = 0.5, WIDTH = 10, ARG_MAX = 0.5, i, j, len, theta = 0.0, phi = 0.0, cubes = [];

enchant();
window.onload = function() {
	var matrix = new mat4.create();
	var game = new Game(640, 640);
	game.onload = function() {
		function createCamera() {
			var camera = new Camera3D();
			camera.x = camera.y = 0;
			camera.z = -100;
			camera.centerX = camera.centerY = camera.centerZ = 0; 
			return camera;
		}
		function createLight() {
			var light = new DirectionalLight();
			light.directionX = light.directionY = 0;
			light.directionZ = -1;
			light.color = [1.0, 1.0, 1.0];
			return light;
		}
		function createFloor() {
			var floor = new PlaneXY();
			floor.x = floor.y = 0;
			floor.z = 0;
			floor.mesh.normals = floor.mesh.vertices = [
				-10.0, -10.0,  0.0,
				 10.0, -10.0,  0.0,
				 10.0,  10.0,  0.0,
				-10.0,  10.0,  0.0
			];
			floor.mesh.setBaseColor("#999999");
			floor.mesh.texture.ambient = [1.0, 1.0, 1.0, 0.7];
			floor.mesh.texture.specular = [0, 0, 0, 0];
			floor.addEventListener('enterframe', function (e) {
				if (game.input.right) theta += 0.1;
				if (game.input.left)  theta -= 0.1;
				if (game.input.up) phi += 0.1;
				if (game.input.down)  phi -= 0.1;

				theta = Math.min(ARG_MAX, Math.max(-ARG_MAX, theta));
				phi = Math.min(ARG_MAX, Math.max(-ARG_MAX, phi));
				mat4.identity(matrix);
				mat4.rotateX(matrix, phi);
				mat4.rotateY(matrix, theta);
				this.rotation = matrix;
			});

			return floor;
		}
		function createBall() {
			var ball = new Sphere();
			ball.x = -WIDTH / 2; ball.y = WIDTH / 2; ball.z = -RADIUS;
			ball.vx = ball.vy = 0;
			ball.bounding.scale = 1;
			ball.mesh.setBaseColor("#cccccc");

			ball.addEventListener('enterframe', function (e) {
				this.vx -= Math.sin(theta) / 10;
				this.vy += Math.sin(phi) / 10;

				this.x += this.vx;
				if (this.x < RADIUS-WIDTH) {
					this.x = RADIUS-WIDTH;
					this.vx = -this.vx / 3;
				} else if (this.x > WIDTH-RADIUS) {
					this.x = WIDTH-RADIUS;
					this.vx = -this.vx / 3;
				} else {
					for (i = 0; i < cubes.length; ++i) {
						if (ball.intersect(cubes[i])) {
							this.x -= this.vx;
							this.vx = -this.vx / 3;
							break;
						}
					}
				}

				this.y += this.vy;
				if (this.y < RADIUS-WIDTH) {
					this.y = RADIUS-WIDTH;
					this.vy = -this.vy / 3;
				} else if (this.y > WIDTH-RADIUS) {
					this.y = WIDTH-RADIUS;
					this.vy = -this.vy / 3;
				} else {
					for (i = 0; i < cubes.length; ++i) {
						if (ball.intersect(cubes[i])) {
							this.y -= this.vy;
							this.vy = -this.vy / 3;
							break;
						}
					}
				}
			});

			return ball;
		}
		function createCube(i) {
			var cube = new Cube(), j, len, arr;
			cube.bounding = new AABB();
			cube.bounding.scale = 1;
			cube.x = cube.y = (i - 2) * 2; cube.z = -RADIUS;
			arr = cube.mesh.normals;
			for (j = 0, len = arr.length; j < len; ++j) {
				arr[j] *= 2;
			}
			cube.mesh.normals = cube.mesh.vertices = arr;
			cube.mesh.setBaseColor("#666666");
			cube.mesh.texture.specular = [0, 0, 0, 0];
			cube.mesh.texture.ambient = [1.0, 1.0, 1.0, 0.4];
			return cube;
		}
		var scene = new Scene3D();
		scene.setDirectionalLight(createLight());
		scene.setCamera(createCamera());
		var floor = createFloor();
		scene.addChild(floor);
		floor.addChild(createBall());

		for (i = 0; i < 5; ++i) {
			var cube = createCube(i);
			floor.addChild(cube);
			cubes.push(cube);
		}
	};
	game.start();
};