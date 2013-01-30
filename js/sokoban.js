'use strict';

function Sokoban(patterns) {
    this.mapIndex       = 0;
    
    var _map            = Rss.Matrix.clone(maps[this.mapIndex]),
        _originalMap    = Rss.Matrix.clone(maps[this.mapIndex]),
        w               = _map[0].length,
        h               = _map.length,
        grid            = new Rss.Grid(w, h, 32),
        self            = this;
        
    var _drawMap = function() {
        var i, j;

        for (i=0; i<_map.length; i++) {
            for (j=0; j<_map[i].length; j++) {
                grid.fillSquare(j, i, patterns[_map[i][j]]);
            }
        }
    }
    
    var _getCoordOfKeeper = function () {
        var x, y, i, j;
        
        for (i=0; i<_map.length; i++) {
            if (_map[i].indexOf(6) !== -1 || _map[i].indexOf(7) !== -1) {
                x = _map[i].indexOf(6) !== -1 ? _map[i].indexOf(6) : _map[i].indexOf(7);
                y = i;
                break;
            }
        }
        
        return [x, y];
    }
    
    var _checkIfFinished = function() {
        var finished = true,
            i, j;
        for (i=0; i<_map.length; i++) {
            for (j=0; j<_map[i].length; j++) {
                if (_map[i][j] == 3 || _map[i][j] == 4) {
                    finished = false;
                }
            }
        }
        
        if (finished) {
            alert('You have completed this stage, the next stage will start now.');
            _playNextMap();
        }
    }
    
    var _playNextMap = function() {
        self.playMap(self.mapIndex + 1);
    }
    
    this.playMap = function(mapIndex) {
        this.mapIndex = mapIndex;
        
        grid.destroy();
        this.mapIndex       %= maps.length;
        _map            = Rss.Matrix.clone(maps[this.mapIndex]);
        _originalMap    = Rss.Matrix.clone(maps[this.mapIndex]),
        w               = _map[0].length,
        h               = _map.length,
        grid            = new Rss.Grid(w, h, 32);
        
        this.play();
    }
    
    this.play = function() {
        _drawMap();
        this.emit('stageStarted');
    }
    
    this.restartStage = function() {
        _map = Rss.Matrix.clone(_originalMap);
        _drawMap();
    }
    
    this.moveLeft = function() {
        var coords = _getCoordOfKeeper();
        var x = coords[0],
            y = coords[1],
            moved = false;
        
        if (_map[y][x-1] == 0 || _map[y][x-1] == 1)
            return;
        
        if (_map[y][x-1] == 2) {
            _map[y][x-1] = 6;
            moved = true;
        } else if (_map[y][x-1] == 3) {
            _map[y][x-1] = 7;
            moved = true;
        } else if (_map[y][x-1] == 4) {
            if (_map[y][x-2] == 2) {
                _map[y][x-2] = 4;
                _map[y][x-1] = 6;
                moved = true;
            } else if (_map[y][x-2] == 3) {
                _map[y][x-2] = 5;
                _map[y][x-1] = 6;
                moved = true;
            }
        } else if (_map[y][x-1] == 5) {
            if (_map[y][x-2] == 2) {
                _map[y][x-2] = 4;
                _map[y][x-1] = 7;
                moved = true;
            } else if (_map[y][x-2] == 3) {
                _map[y][x-2] = 5;
                _map[y][x-1] = 7;
                moved = true;
            }
        }
        
        if (moved) {
            if (_map[y][x] == 6) {
                _map[y][x] = 2;
            } else if (_map[y][x] == 7) {
                _map[y][x] = 3;
            }
        }
        
        _drawMap();
        _checkIfFinished();
    }
    
    this.moveRight = function() {
        var coords = _getCoordOfKeeper();
        var x = coords[0],
            y = coords[1],
            moved = false;
        
        if (_map[y][x+1] == 0 || _map[y][x+1] == 1)
            return;
        
        if (_map[y][x+1] == 2) {
            _map[y][x+1] = 6;
            moved = true;
        } else if (_map[y][x+1] == 3) {
            _map[y][x+1] = 7;
            moved = true;
        } else if (_map[y][x+1] == 4) {
            if (_map[y][x+2] == 2) {
                _map[y][x+2] = 4;
                _map[y][x+1] = 6;
                moved = true;
            } else if (_map[y][x+2] == 3) {
                _map[y][x+2] = 5;
                _map[y][x+1] = 6;
                moved = true;
            }
        } else if (_map[y][x+1] == 5) {
            if (_map[y][x+2] == 2) {
                _map[y][x+2] = 4;
                _map[y][x+1] = 7;
                moved = true;
            } else if (_map[y][x+2] == 3) {
                _map[y][x+2] = 5;
                _map[y][x+1] = 7;
                moved = true;
            }
        }
        
        if (moved) {
            if (_map[y][x] == 6) {
                _map[y][x] = 2;
            } else if (_map[y][x] == 7) {
                _map[y][x] = 3;
            }
        }
        
        _drawMap();
        _checkIfFinished();
    }
    
    this.moveUp = function() {
        var coords = _getCoordOfKeeper();
        var x = coords[0],
            y = coords[1],
            moved = false;
        
        if (_map[y-1][x] == 0 || _map[y-1][x] == 1)
            return;
        
        if (_map[y-1][x] == 2) {
            _map[y-1][x] = 6;
            moved = true;
        } else if (_map[y-1][x] == 3) {
            _map[y-1][x] = 7;
            moved = true;
        } else if (_map[y-1][x] == 4) {
            if (_map[y-2][x] == 2) {
                _map[y-2][x] = 4;
                _map[y-1][x] = 6;
                moved = true;
            } else if (_map[y-2][x] == 3) {
                _map[y-2][x] = 5;
                _map[y-1][x] = 6;
                moved = true;
            }
        } else if (_map[y-1][x] == 5) {
            if (_map[y-2][x] == 2) {
                _map[y-2][x] = 4;
                _map[y-1][x] = 7;
                moved = true;
            } else if (_map[y-2][x] == 3) {
                _map[y-2][x] = 5;
                _map[y-1][x] = 7;
                moved = true;
            }
        }
        
        if (moved) {
            if (_map[y][x] == 6) {
                _map[y][x] = 2;
            } else if (_map[y][x] == 7) {
                _map[y][x] = 3;
            }
        }
        
        _drawMap();
        _checkIfFinished();
    }
    
    this.moveDown = function() {
        var coords = _getCoordOfKeeper();
        var x = coords[0],
            y = coords[1],
            moved = false;
        
        if (_map[y+1][x] == 0 || _map[y+1][x] == 1)
            return;
        
        if (_map[y+1][x] == 2) {
            _map[y+1][x] = 6;
            moved = true;
        } else if (_map[y+1][x] == 3) {
            _map[y+1][x] = 7;
            moved = true;
        } else if (_map[y+1][x] == 4) {
            if (_map[y+2][x] == 2) {
                _map[y+2][x] = 4;
                _map[y+1][x] = 6;
                moved = true;
            } else if (_map[y+2][x] == 3) {
                _map[y+2][x] = 5;
                _map[y+1][x] = 6;
                moved = true;
            }
        } else if (_map[y+1][x] == 5) {
            if (_map[y+2][x] == 2) {
                _map[y+2][x] = 4;
                _map[y+1][x] = 7;
                moved = true;
            } else if (_map[y+2][x] == 3) {
                _map[y+2][x] = 5;
                _map[y+1][x] = 7;
                moved = true;
            }
        }
        
        if (moved) {
            if (_map[y][x] == 6) {
                _map[y][x] = 2;
            } else if (_map[y][x] == 7) {
                _map[y][x] = 3;
            }
        }
        
        _drawMap();
        _checkIfFinished();
    }
}

Sokoban.prototype = new Rss.EventEmitter();