var Clouds=function(){function a(h){for(var a=0;2>a;a++)b=g[a]=new Boid,b.position.x=320,b.position.y=20+10*Math.random(),b.position.z=200+Math.random(),b.velocity.x=2*Math.random()-1,b.velocity.y=2*Math.random()-1,b.velocity.z=2*Math.random()-1,b.setAvoidWalls(!0),b.setWorldSize(1E3,200,400),e[a]=new ROME.Animal(h,!0),e[a].timeOffset=100*Math.random(),c=l[a]=e[a].mesh,c.phase=Math.floor(62.8*Math.random()),c.rotation.set(0,-.5,0),c.updateMatrix(),c.update(),window.morphObject=e[a],e[a].play(e[a].availableAnimals[0],
e[a].availableAnimals[0]),c.position=g[a].position,c.doubleSided=!1,c.scale.x=c.scale.y=c.scale.z=.03+.05*Math.random(),q.addChild(c);w.position.z=-4E3;u.addObject(w);x.position.z=0;u.addObject(x);y.addObject(q)}var b,c,l=[],g=[],e=[],r=0,h=0,E={x:0,y:0,z:0},f,z,m=start_time=(new Date).getTime(),d,A,u,B,y,k,q,w,x,v,n,C,F,p,t;n=new THREE.Fog(5413329,-100,3E3);d=new THREE.Camera(30,window.innerWidth/window.innerHeight,1,3E3);d.position.z=6E3;u=new THREE.Scene;y=new THREE.Scene;q=new THREE.Object3D;
v=new THREE.Geometry;var D=THREE.ImageUtils.loadTexture("img/cloud256.png",null,function(){C=new THREE.MeshShaderMaterial({uniforms:{map:{type:"t",value:2,texture:D},fogColor:{type:"c",value:n.color},fogNear:{type:"f",value:n.near},fogFar:{type:"f",value:n.far}},vertexShader:"varying vec2 vUv;\nvoid main() {\nvUv = uv;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform sampler2D map;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nvarying vec2 vUv;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\ngl_FragColor = texture2D( map, vUv );\ngl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}",
depthTest:!1});for(var h=new THREE.Mesh(new THREE.Plane(64,64)),b=0;4E3>b;b++)h.position.x=1E3*Math.random()-500,h.position.y=-Math.random()*Math.random()*200-15,h.position.z=b,h.rotation.z=Math.random()*Math.PI,h.scale.x=h.scale.y=Math.random()*Math.random()*1.5+.5,GeometryUtils.merge(v,h);w=new THREE.Mesh(v,C);x=new THREE.Mesh(v,C);(new THREE.JSONLoaderAjax).load({model:"js/bird.js",callback:a})});D.magFilter=THREE.LinearMipMapLinearFilter;D.minFilter=THREE.LinearMipMapLinearFilter;k=new THREE.WebGLRenderer({antialias:!1,
clearColor:0,clearAlpha:0});k.domElement.style.position="absolute";k.domElement.style.left="0px";k.domElement.style.top="0px";k.getContext();k.sortObjects=!1;k.autoClear=!1;p=new THREE.WebGLRenderTarget(512,512,{minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter});t=new THREE.WebGLRenderTarget(1024,512,{minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter});p.depthBuffer=!1;p.stencilBuffer=!1;t.depthBuffer=!1;t.stencilBuffer=!1;window.renderTargetClouds=p;A=new THREE.Camera;A.projectionMatrix=
THREE.Matrix4.makeOrtho(window.innerWidth/-2,window.innerWidth/2,window.innerHeight/2,window.innerHeight/-2,-1E4,1E4);B=new THREE.Scene;F=new THREE.MeshShaderMaterial({uniforms:{tClouds:{type:"t",value:0,texture:p},tFlamingos:{type:"t",value:1,texture:t},width:{type:"f",value:window.innerWidth},height:{type:"f",value:window.innerHeight},fogColor:{type:"c",value:n.color}},vertexShader:"varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
fragmentShader:"uniform sampler2D tClouds;\nuniform sampler2D tFlamingos;\nuniform vec3 fogColor;\nuniform float width;\nuniform float height;\nvarying vec2 vUv;\nvoid main() {\nvec4 flamingos = vec4(0.);\nif (vUv.y > 0.5) {\nflamingos += texture2D( tFlamingos, vUv );\nflamingos += texture2D( tFlamingos, vUv+vec2(1./width,0.) );\nflamingos += texture2D( tFlamingos, vUv+vec2(.0,1./height) );\nflamingos += texture2D( tFlamingos, vUv+vec2(1./width,1./height) );\nflamingos *= 1./4.;\nflamingos.rgb = mix(flamingos.rgb, vec3(fogColor), 0.15*flamingos.a);\n}\nvec4 clouds = texture2D( tClouds, vUv );\ngl_FragColor = mix(flamingos, clouds, clouds.a);\ngl_FragColor.rgb *= 1./gl_FragColor.a;\n}"});
B.addObject(new THREE.Mesh(new THREE.Plane(window.innerWidth,window.innerHeight),F));this.mouseMove=function(a,b,d,f){r=a/d*100-50;h=b/f*60-30;E=new THREE.Vector3(a-d/2,-b+f/2,0)};this.getDomElement=function(){return k.domElement};this.resize=function(h,a){d.aspect=h/a;d.updateProjectionMatrix();k.setSize(h,a);k.domElement.style.width=h+"px";k.domElement.style.height=a+"px"};this.update=function(){position=.03*((new Date).getTime()-start_time)%4E3;z=(new Date).getTime();f=z-m;m=z;d.position.x+=.009*
(r-d.position.x);d.position.y+=.009*(-h-d.position.y);d.position.z=-position+4E3;q.position.z=d.position.z-500;q.position.y=-50;d.target.position.x=d.position.x;d.target.position.y=d.position.y;d.target.position.z=d.position.z-1E3;k.clear();k.render(u,d,p,!0);k.render(y,d,t,!0);k.render(B,A);for(var a=0,n=l.length;a<n;a++)b=g[a],E.z=b.position.z,b.run(g),c=l[a],c.rotation.y=Math.atan2(-b.velocity.z,b.velocity.x)+Math.PI/2,c.rotation.z=Math.asin(b.velocity.y/b.velocity.length()),c.phase=(c.phase+(Math.max(0,
c.rotation.z)+.1))%62.83,e[a].update(f*c.phase/100)}},Boid=function(){var a=new THREE.Vector3,b,c=500,l=500,g=200,e,r=!1;this.position=new THREE.Vector3;this.velocity=new THREE.Vector3;b=new THREE.Vector3;this.setGoal=function(a){e=a};this.setAvoidWalls=function(a){r=a};this.setWorldSize=function(a,b,f){c=a;l=b;g=f};this.run=function(h){r&&(a.set(15*-c,this.position.y,this.position.z),a=this.avoid(a),a.multiplyScalar(5),b.addSelf(a),a.set(c,this.position.y,this.position.z),a=this.avoid(a),a.multiplyScalar(5),
b.addSelf(a),a.set(this.position.x,0,this.position.z),a=this.avoid(a),a.multiplyScalar(5),b.addSelf(a),a.set(this.position.x,l,this.position.z),a=this.avoid(a),a.multiplyScalar(5),b.addSelf(a),a.set(this.position.x,this.position.y,-g),a=this.avoid(a),a.multiplyScalar(5),b.addSelf(a),a.set(this.position.x,this.position.y,g),a=this.avoid(a),a.multiplyScalar(5),b.addSelf(a));.5<Math.random()&&this.flock(h);this.move()};this.flock=function(a){e&&b.addSelf(this.reach(e,.005));b.addSelf(this.alignment(a));
b.addSelf(this.cohesion(a));b.addSelf(this.separation(a))};this.move=function(){this.velocity.addSelf(b);var a=this.velocity.length();.6<a&&this.velocity.divideScalar(a/.6);this.position.addSelf(this.velocity);b.set(0,0,0)};this.checkBounds=function(){this.position.x>c&&(this.position.x=-c);this.position.x<-c&&(this.position.x=c);this.position.y>l&&(this.position.y=-l);this.position.y<-l&&(this.position.y=l);this.position.z>g&&(this.position.z=-g);this.position.z<-g&&(this.position.z=g)};this.avoid=
function(a){var b=new THREE.Vector3;b.copy(this.position);b.subSelf(a);b.multiplyScalar(1/this.position.distanceToSquared(a));return b};this.repulse=function(a){var c=this.position.distanceTo(a);if(150>c){var f=new THREE.Vector3;f.sub(this.position,a);f.multiplyScalar(.5/c);b.addSelf(f)}};this.reach=function(a,b){var f=new THREE.Vector3;f.sub(a,this.position);f.multiplyScalar(b);return f};this.alignment=function(a){for(var b,f=new THREE.Vector3,c=0,m=0,d=a.length;m<d;m++).6<Math.random()||(b=a[m],
distance=b.position.distanceTo(this.position),0<distance&&3E3>=distance&&(f.addSelf(b.velocity),c++));0<c&&(f.divideScalar(c),a=f.length(),.03<a&&f.divideScalar(a/.03));return f};this.cohesion=function(a){for(var b,c,g=new THREE.Vector3,m=new THREE.Vector3,d=0,e=0,l=a.length;e<l;e++).6<Math.random()||(b=a[e],c=b.position.distanceTo(this.position),0<c&&3E3>=c&&(g.addSelf(b.position),d++));0<d&&g.divideScalar(d);m.sub(g,this.position);a=m.length();.03<a&&m.divideScalar(a/.03);return m};this.separation=
function(a){for(var b,c,g=new THREE.Vector3,e=new THREE.Vector3,d=0,l=a.length;d<l;d++).6<Math.random()||(b=a[d],c=b.position.distanceTo(this.position),0<c&&3E3>=c&&(e.sub(this.position,b.position),e.normalize(),e.divideScalar(c),g.addSelf(e)));return g}};