'use strict';

Rss.Canvas = function(appendTo, canvasId) {
    if (!appendTo) appendTo = document.body;
    if (!canvasId) canvasId = 'canvas';
    
    var _canvas = document.createElement('canvas');
    _canvas.setAttribute('id', 'canvas');
    
    appendTo.appendChild(_canvas);
    
    this.getCanvas = function() {
        return _canvas;
    }
    
    this.getContext2d = function() {
        return _canvas.getContext('2d');
    }
    
    this.destroy = function() {
        appendTo.removeChild(_canvas);
    }
}