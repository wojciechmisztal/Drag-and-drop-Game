class GameManager {
    static set(className, gameAreaId, withoutDropdown = false, withoutSnackbar = false) {
        $("#" + gameAreaId).empty();
        GameManager.game = new className(gameAreaId);
        if (!withoutDropdown)
            Dropdown.setDropdown();
        if (!withoutSnackbar) {
            Snackbar.setSnackbar();
            Snackbar.show("info", '_start');
        }
    }

    static get() {
        return GameManager.game;
    }

}
