'use strict';

Rss.Random = {};

Rss.Random.index = function(array) {
    return Math.floor(Math.random() * array.length);
}

Rss.Random.choice = function(array) {
    return array[Rss.Random.index(array)];
}