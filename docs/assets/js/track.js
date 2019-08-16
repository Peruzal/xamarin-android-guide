(function(){
    'use strict';
    waitForPageLoad(function(){
        mixpanel.track(`${window.location.pathname}`);
    });
})();