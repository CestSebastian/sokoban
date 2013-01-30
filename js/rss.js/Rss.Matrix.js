'use strict';

Rss.Matrix = {};

Rss.Matrix.clone = function(matrix) {
    var i,
        newMatrix = [];
    
    for (i=0; i<matrix.length; i++) {
        newMatrix.push(matrix[i].slice(0));
    }
    
    return newMatrix;
}