'use strict';

Rss.EventEmitter = function() {};

Rss.EventEmitter.prototype = Object.create(new Object(), {
    'on' : {
        'value' : function (event, handler) {
            if (!this.listeners) this.listeners = {};
            if (!this.listeners[event]) this.listeners[event] = [];

            this.listeners[event].push(handler);

            return this;
        }
    },
    'once' : {
        'value' : function (event, handler) {
            if (!this.onceListeners) this.onceListeners = {};
            if (!this.onceListeners[event]) this.onceListeners[event] = [];

            this.onceListeners[event].push(handler);

            return this;
        }
    },
    'emit' : {
        'value' : function (event, eventData) {
            var self = this;
            if (this.listeners && this.listeners[event] instanceof Array) {
                this.listeners[event].forEach(function(element) {
                    element.call(self, eventData);
                });
            }
            
            if (this.onceListeners && this.onceListeners[event] instanceof Array) {
                this.onceListeners[event].forEach(function(element) {
                    element.call(self, eventData);
                });
                
                delete this.onceListeners[event];
            }

            return this;
        }
    }
});