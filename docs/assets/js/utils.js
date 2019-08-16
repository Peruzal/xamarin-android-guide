'use strict';

function waitForPageLoad(callback){
    window.onload = function() {
        callback();
    }
}