(function () {
    "use strict";
    this.popUp = function () {
        this.popup = null;
        checkCookie() ? null : init.call(this);
        return;
    };
    function buildOut() {
        this.popup = document.createElement('div');
        this.popup.classList.add('popup');
        this.popUpBox = document.createElement('div');
        this.popUpBox.classList.add('popup-box');
        this.popUpContent = document.createElement('div');
        this.popUpContent.classList.add('popup-content');
        this.popUpBox.appendChild(this.popUpContent);
        this.popUpFooter = document.createElement('div');
        this.popUpFooter.classList.add('popup-footer');
        this.popUpBox.appendChild(this.popUpFooter);
        this.popup.appendChild(this.popUpBox);
    }
    function setContent() {
    	const content = '<h1>GDPR consent</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'
        this.popUpContent.innerHTML = content;
    };
    function addBtn(label, cssClass, callback) {
        var btn = document.createElement('button');
        btn.innerHTML = label;
        btn.classList.add('popup-btn');
        btn.classList.add(cssClass);
        btn.addEventListener('click', callback);
        this.popUpFooter.appendChild(btn);
        return btn;
    };
    function addButtons(){
    	addBtn.call(this,'Accept','popup-btn-accept', function(){
    		close.call(this,true);
    	}.bind(this));
    	addBtn.call(this,'Cancel', 'popup-btn-cancel', function(){
    		close.call(this,false);
    	}.bind(this));
    }
    function init() {
        if (this.popup) {
            return;
        }
        buildOut.call(this);
        initEvents.call(this);
        setContent.call(this);
        addButtons.call(this);
        this.popup.classList.add('visible');
        document.addEventListener("DOMContentLoaded", function() {
            document.body.insertBefore(this.popup, document.body.firstChild);
        }.bind(this))
    };
    function close(accepted) {
        document.body.classList.remove('popup');
        this.popup.classList.remove('visible');
        if (accepted===true){
        	setCookie('GDPR', 'accepted', 1);
        }

    };
    function initEvents() {
        if (this.btn) {
            this.btn.addEventListener('click', this.close.bind(this));
        }
    }

    function setCookie(name, value, days){
        var d = new Date();
        d.setTime(d.getTime()+(days*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = name + "=" + value + ";" + days + ";path=/";
    }
    function checkCookie(){
    	// if(document.cookie.split(';').filter((item) => item.includes('GDPR=1')).length){
    	// 	return true;
    	// }
    	if (document.cookie.split(';').filter(function(item) {
    		return item.indexOf('GDPR=accepted') >= 0
		}).length) {
    		return true;
		}
    }
    return{
        popup: popUp
    };
}).call(this);