"use strict";

var gl;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }

     var vertices = [
        vec2(-1,-1),
        vec2(0,1),
        vec2(1,-1)
     ];
      
    var colors = [
        vec4(1.0, 0.0, 0.0, 1.0),  // red
        vec4(0.0, 0.0, 1.0, 1.0), //blue
        vec4(0.0, 1.0, 0.0, 1.0),  // green
        vec4(1.0, 0.0, 0.0, 1.0),  //red
    ]


    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    //color buffer
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    
    
    var verColor = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(verColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(verColor);


    
    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( aPosition );
    
    render();
    
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 3);
   
}
