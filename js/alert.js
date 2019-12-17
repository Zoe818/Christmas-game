(function(exports, undefined){
    'use strict';
    var document = exports.document;
    function createDiv(class_name){
        var div = document.createElement('div');
        div.setAttribute('class', class_name);
        document.body.appendChild(div);
        return div;
    }
    function Alert(){
        if(!(this instanceof Alert)) return;
        return this;
    }
    Alert.prototype = {
        init: function(){
            this.mask = this.mask || createDiv('mask');
            this.alert = this.alert || createDiv('alert');
            this.initEvents.call(this);
            return this;
        },
        show: function(message){
            this.alert.innerHTML = message || '';
            this.alert.style.display = this.mask.style.display = 'block';
        },
        hide: function(){
            this.alert.style.display = this.mask.style.display = 'none';
            exports.event && (exports.event.stopPropagation(), exports.event.preventDefault());
        },
        initEvents: function(){
            this.hideHandler = this.hideHandler || this.hide.bind(this);
            this.mask.addEventListener('touchend', this.hideHandler, false);
        },
        removeEvents: function(){
            this.mask.removeEventListener('touchend', this.hideHandler, false);
            this.hideHandler = null;
        },
        reset: function(){
            this.removeEvents.call(this);
            this.alert.style.display = this.mask.style.display = 'none';
        }
    }
    var alert = new Alert().init();
    exports.showAlert = alert.show.bind(alert);
    exports.hideAlert = alert.hide.bind(alert);
})(window);