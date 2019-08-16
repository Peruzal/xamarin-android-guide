(function(){
    'use strict';
    waitForPageLoad(function(){
        mixpanel.tract('Page View', window.location.href);
    });
})();