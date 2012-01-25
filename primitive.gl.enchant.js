if(enchant.gl){
	(function(){
	enchant.gl.primitive = {};
    enchant.gl.primitive.Plane = enchant.Class.create(enchant.gl.Sprite3D, {
    	initialize:function(){
    		enchant.gl.Sprite3D.call(this);
            this.mesh.vertices = [
            	 0.5,  0.5,  0.0,
            	-0.5,  0.5,  0.0,
            	-0.5, -0.5,  0.0,
            	 0.5, -0.5,  0.0
            ];
            this.mesh.colors = [
            	1.0, 0.0, 0.0, 1.0,
            	1.0, 0.0, 0.0, 1.0,
            	1.0, 0.0, 0.0, 1.0,
            	1.0, 0.0, 0.0, 1.0
            ];
            this.mesh.normals =[
            	0.0, 0.0,  1.0, 
            	0.0, 0.0,  1.0, 
            	0.0, 0.0,  1.0, 
            	0.0, 0.0,  1.0, 
            ];
            this.mesh.texCoords = [
            	1.0, 1.0,
            	0.0, 1.0,
            	0.0, 0.0,
            	1.0, 0.0
            ];
            this.mesh.indices = [
            	0, 1, 2,
            	2, 3, 0,
            	2, 1, 0,
            	0, 3, 2
            ];
       	}
    });
    enchant.gl.primitive.PlaneXY = enchant.Class.create(enchant.gl.Sprite3D, {
    	initialize:function(){
    		enchant.gl.Sprite3D.call(this);
            this.mesh.vertices = [
            	 0.5,  0.5,  0.0,
            	-0.5,  0.5,  0.0,
            	-0.5, -0.5,  0.0,
            	 0.5, -0.5,  0.0
            ];
            this.mesh.colors = [
            	1.0, 0.0, 0.0, 1.0,
            	1.0, 0.0, 0.0, 1.0,
            	1.0, 0.0, 0.0, 1.0,
            	1.0, 0.0, 0.0, 1.0
            ];
            this.mesh.normals =[
            	0.0, 0.0,  1.0, 
            	0.0, 0.0,  1.0, 
            	0.0, 0.0,  1.0, 
            	0.0, 0.0,  1.0, 
            ];
            this.mesh.texCoords = [
            	1.0, 1.0,
            	0.0, 1.0,
            	0.0, 0.0,
            	1.0, 0.0
            ];
            this.mesh.indices = [
            	0, 1, 2,
            	2, 3, 0,
            	2, 1, 0,
            	0, 3, 2
            ];
       	}
    });
    enchant.gl.primitive.PlaneYZ = enchant.Class.create(enchant.gl.Sprite3D, {
    	initialize:function(){
    		enchant.gl.Sprite3D.call(this);
            this.mesh.vertices = [
            	 0.0,  0.5,  0.5, 
            	 0.0, -0.5,  0.5, 
            	 0.0, -0.5, -0.5,
            	 0.0,  0.5, -0.5, 
            ];
            this.mesh.colors = [
            	1.0, 0.0, 0.0, 1.0,
            	1.0, 0.0, 0.0, 1.0,
            	1.0, 0.0, 0.0, 1.0,
            	1.0, 0.0, 0.0, 1.0
            ];
            this.mesh.normals =[
            	1.0, 0.0, 0.0, 
            	1.0, 0.0, 0.0, 
            	1.0, 0.0, 0.0, 
            	1.0, 0.0, 0.0, 
            ];
            this.mesh.texCoords = [
            	1.0, 1.0,
            	0.0, 1.0,
            	0.0, 0.0,
            	1.0, 0.0
            ];
            this.mesh.indices = [
            	0, 1, 2,
            	2, 3, 0,
            	2, 1, 0,
            	0, 3, 2
            ];
       	}
    });
    enchant.gl.primitive.PlaneXZ = enchant.Class.create(enchant.gl.Sprite3D, {
    	initialize:function(){
    		enchant.gl.Sprite3D.call(this);
            this.mesh.vertices = [
            	 0.5,  0.0,  0.5, 
            	-0.5,  0.0,  0.5,
            	-0.5,  0.0, -0.5,
            	 0.5,  0.0, -0.5,
            ];
            this.mesh.colors = [
            	1.0, 0.0, 0.0, 1.0,
            	1.0, 0.0, 0.0, 1.0,
            	1.0, 0.0, 0.0, 1.0,
            	1.0, 0.0, 0.0, 1.0
            ];
            this.mesh.normals =[
            	0.0, 1.0, 0.0,
            	0.0, 1.0, 0.0,
            	0.0, 1.0, 0.0,
            	0.0, 0.0, 0.0,
            ];
             this.mesh.texCoords = [
            	0.0, 0.0,
            	1.0, 0.0,
            	1.0, 1.0,
            	0.0, 1.0
            ];
            this.mesh.indices = [
            	0, 1, 2,
            	2, 3, 0,
            	2, 1, 0,
            	0, 3, 2
            ];
       	}
    });
    enchant.gl.primitive.Billboard = enchant.Class.create(enchant.gl.primitive.Plane, {
        initialize: function() {
            var game = enchant.Game.instance;
            enchant.gl.primitive.Plane.call(this);
            this.addEventListener('render', function() {
                if (game.currentScene3D._camera) {
                    this.rotation = game.currentScene3D.cameraMatInverse;
                }
            });
        }   
    }); 
    enchant.gl.primitive.BillboardAnimation = enchant.Class.create(enchant.gl.primitive.Billboard, {
        initialize: function(divide) {
            enchant.gl.primitive.Billboard.call(this);
            if (typeof divide != 'undefined') {
                this.divide = divide;
            } else {
                this.divide = 4;
            }
            this.frame = 0;
        },
        frame: {
            get: function() {
                return this._frame;
            },
            set: function(frame) {
                this._frame = frame;
                var left = (frame % this.divide) / this.divide;
                var top = 1 - ((frame / this.divide) | 0) / this.divide;
                var right = left + (1 / this.divide);
                var bottom = top - (1 / this.divide);
                this.mesh.texCoords = [
                    right, top,
                    left, top,
                    left, bottom,
                    right, bottom 
                ];
            }
        }
    }); 
    enchant.gl.primitive.BillboardY = enchant.Class.create(enchant.gl.primitive.Plane, {
        initialize: function() {
            var game = enchant.Game.instance;
            enchant.gl.primitive.Plane.call(this);
            this.addEventListener('render', function() {
                if (game.currentScene3D._camera) {
                    this.rotation = game.currentScene3D.cameraMatInverseY;
                }
            });
        }   
    }); 
    enchant.gl.primitive.Cube= enchant.Class.create(enchant.gl.Sprite3D, {
    	initialize:function(){
    		enchant.gl.Sprite3D.call(this);
            this.mesh.vertices = [
            	 0.5,  0.5,  0.5,
            	-0.5,  0.5,  0.5,
            	-0.5, -0.5,  0.5,
            	 0.5, -0.5,  0.5,

            	 0.5,  0.5, -0.5,
            	-0.5,  0.5, -0.5,
            	-0.5, -0.5, -0.5,
            	 0.5, -0.5, -0.5,

            	 0.5,  0.5,  0.5,
            	-0.5,  0.5,  0.5,
            	-0.5,  0.5, -0.5,
            	 0.5,  0.5, -0.5,

            	 0.5, -0.5,  0.5,
            	-0.5, -0.5,  0.5,
            	-0.5, -0.5, -0.5,
            	 0.5, -0.5, -0.5,

            	 0.5,  0.5,  0.5,
            	 0.5, -0.5,  0.5,
            	 0.5, -0.5, -0.5,
            	 0.5,  0.5, -0.5,

            	-0.5,  0.5,  0.5,
            	-0.5, -0.5,  0.5,
            	-0.5, -0.5, -0.5,
            	-0.5,  0.5, -0.5
            ];
            this.mesh.colors = [
            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0,

            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0,

            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0,

            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0,

            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0,

            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0,
            	1.0, 1.0, 1.0, 1.0
            ];
            this.mesh.normals = this.mesh.vertices;
            this.mesh.texCoords = [
            	1.0, 0.0,
            	0.0, 0.0,
            	0.0, 1.0,
            	1.0, 1.0,

            	1.0, 0.0,
            	0.0, 0.0,
            	0.0, 1.0,
            	1.0, 1.0,

            	1.0, 0.0,
            	0.0, 0.0,
            	0.0, 1.0,
            	1.0, 1.0,

            	1.0, 0.0,
            	0.0, 0.0,
            	0.0, 1.0,
            	1.0, 1.0,

            	1.0, 0.0,
            	0.0, 0.0,
            	0.0, 1.0,
            	1.0, 1.0,

            	1.0, 0.0,
            	0.0, 0.0,
            	0.0, 1.0,
            	1.0, 1.0
            ];
            var a = [
            	0, 1, 2,
            	2, 3, 0,
            	2, 1, 0,
            	0, 3, 2,

            	0, 1, 2,
            	2, 3, 0,
            	2, 1, 0,
            	0, 3, 2,

            	0, 1, 2,
            	2, 3, 0,
            	2, 1, 0,
            	0, 3, 2,

            	0, 1, 2,
            	2, 3, 0,
            	2, 1, 0,
            	0, 3, 2,

            	0, 1, 2,
            	2, 3, 0,
            	2, 1, 0,
            	0, 3, 2,

            	0, 1, 2,
            	2, 3, 0,
            	2, 1, 0,
            	0, 3, 2
            ];
            for(var i = 0; i < 6 * 12; i++){
            	a[i] += Math.floor(i / 12) * 4;
            }
            this.mesh.indices = a;
       	}
    });
    enchant.gl.primitive.Sphere = enchant.Class.create(enchant.gl.Sprite3D, {
    	initialize:function(){
    		var v = 10;
    		var h = 10;
    		enchant.gl.Sprite3D.call(this);
    		var vertices = [];
    		var texCoords = [];
    		for(var i = 0; i < v; i++){
    			for(var j = 0; j < h; j++){
    				vertices[vertices.length] = Math.sin(Math.PI * i / (v - 1)) * Math.cos(Math.PI * 2 * j / (h - 1));
    				vertices[vertices.length] = Math.cos(Math.PI * i / (v - 1));
    				vertices[vertices.length] = Math.sin(Math.PI * i / (v - 1)) * Math.sin(Math.PI * 2 * j / (h - 1));
    				texCoords[texCoords.length] = 1.0 - j / (h - 1);
    				texCoords[texCoords.length] = 1.0 - i / (v - 1);
    			}
    		}
    		this.mesh.vertices = vertices;
    		this.mesh.texCoords = texCoords;
    		var colors = [];
    		for(var i = 0, l = this.mesh.vertices.length / 3 * 4; i < l; i++){
    			colors[colors.length] = 1.0;
    		}
    		this.mesh.colors = colors;
            this.mesh.normals = vertices;
            var indices = [];
            for(var i = 0; i < v - 1; i++){
            	for(var j = 0; j < h; j++){
            		indices[indices.length] = h * (i + 1) + j;
            		indices[indices.length] = h * i + j;
            		indices[indices.length] = h * (i + 1) + (1 + j) % h;
            		indices[indices.length] = h * i + (1 + j) % h;
            		indices[indices.length] = h * (i + 1) + (1 + j) % h;
            		indices[indices.length] = h * i + j;
            	}
            }
            this.mesh.indices = indices;
       	}
    });	 
  })();
}
