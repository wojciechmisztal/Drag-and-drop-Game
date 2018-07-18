class GameManager {
    static set(className, gameAreaId, withoutDropdown = false, withoutSnackbar = false) {
        var setUp = function () {
            $("#" + gameAreaId).empty();
            Locale.setLanguage();
            GameManager.game = new className(gameAreaId);
            if (!withoutDropdown)
                Dropdown.setDropdown();
            if (!withoutSnackbar) {
                Snackbar.setSnackbar();
                Snackbar.show("info", '_start_header', '_start');
            }
        }

        GameManager.loadImages(className);
        var resourceObject = window.top.document.getElementById('resourceobject');
        if(resourceObject) {
            if(!resourceObject.style.height){
                var observer = new MutationObserver(function(e) {
                    if(e[0].target.style.height){
                        setUp();
                        this.disconnect();
                    }
                });
                observer.observe(resourceObject, {
                    attributes: true,
                    childList: false,
                    characterData: true,
                    subtree: false
                });
            }
            else {
                setUp();
            }

            // For moodle
            resourceObject.style.border = '0px';
        }
        else {
            setUp();
        }
    }

    static get() {
        return GameManager.game;
    }

    static loadImages(className) {
        GameManager.images.forEach(function(entry){
            var img = $('<img />').attr('src',Game.folder + entry);
            $('body').append(img);      
            img.hide();
        });

        var numberOfImagesToLoad = className.loadImages();
        Load.ImagesToLoad(GameManager.images.length + numberOfImagesToLoad);
    }
}

