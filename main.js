'use strict';

window.onload = function() {
    var keyMap = {
        32 : 'SPACE',
        37 : 'LEFT',
        38 : 'UP',
        39 : 'RIGHT',
        40 : 'DOWN'
    };
    
    var currentStage    = document.getElementById('currentStage'),
        stageSelect     = document.getElementById('stageSelect'),
        gotoStage       = document.getElementById('gotoStage');
    
    for (var i=0; i<maps.length; i++) {
        var option = document.createElement('option');
        option.textContent = 'Stage ' + (i + 1);
        
        stageSelect.appendChild(option);
    }
    
    var emptyImage          = document.getElementById('emptyImage'),
        wallImage           = document.getElementById('wallImage'),
        floorImage          = document.getElementById('floorImage'),
        targetImage         = document.getElementById('targetImage'),
        cargoImage          = document.getElementById('cargoImage'),
        cargoOnTargetImage  = document.getElementById('cargoOnTargetImage'),
        keeperImage         = document.getElementById('keeperImage'),
        keeperOnTargetImage = document.getElementById('keeperOnTargetImage');

    document.body.removeChild(emptyImage);
    document.body.removeChild(wallImage);
    document.body.removeChild(floorImage);
    document.body.removeChild(targetImage);
    document.body.removeChild(cargoImage);
    document.body.removeChild(cargoOnTargetImage);
    document.body.removeChild(keeperImage);
    document.body.removeChild(keeperOnTargetImage);
    
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    
    var patterns = {
            0 : context.createPattern(emptyImage, 'repeat'),
            1 : context.createPattern(wallImage, 'repeat'),
            2 : context.createPattern(floorImage, 'repeat'),
            3 : context.createPattern(targetImage, 'repeat'),
            4 : context.createPattern(cargoImage, 'repeat'),
            5 : context.createPattern(cargoOnTargetImage, 'repeat'),
            6 : context.createPattern(keeperImage, 'repeat'),
            7 : context.createPattern(keeperOnTargetImage, 'repeat')
        };
    
    var sokoban = new Sokoban(patterns);
    
    document.addEventListener('keydown', function (event) {
        var handled = false;
        
        switch (keyMap[event.keyCode]) {
            case 'UP' :
                sokoban.moveUp();
                handled = true;
                break;
            case 'LEFT' :
                sokoban.moveLeft();
                handled = true;
                break;
            case 'RIGHT' :
                sokoban.moveRight();
                handled = true;
                break;
            case 'DOWN' :
                sokoban.moveDown();
                handled = true;
                break;
            case 'SPACE' :
                sokoban.playMap(sokoban.mapIndex);
                handled = true;
            default :
                break;
        }
        
        if (handled) {
            event.preventDefault();
        }
    });
    
    sokoban.on('stageStarted', function() {
        currentStage.textContent = this.mapIndex + 1;
        stageSelect.children[this.mapIndex].selected = true;
    });
    
    gotoStage.addEventListener('click', function (event) {
        var i;
        
        for (i=0; i<stageSelect.children.length; i++) {
            if (stageSelect.children[i].selected) {
                sokoban.playMap(i);
            }
        }
    });
    
    
    sokoban.play();
}