/**
 * custom-styles.js
 *
 * Will apply any custom styles that the user has enabled in the settings. Such as night mode or
 * fluent design bootstrap.
 */

/**
 * Gets the users currently selected custom theme
 * @returns {string}    The users custom theme
 */
function getCustomTheme() {
    let customTheme = "defaultBootstrap";
    for (let i = 0; i < localStorage.length; i++) {
        const tempStorage = loadList(localStorage.key(i));
        if (localStorage.key(i) === "settings") {
            const userSettings = JSON.parse(tempStorage);
            customTheme = userSettings.custom_theme;
        }
    }
    switch (customTheme) {
        case "defaultBootstrap":
            return "defaultBootstrap";
        case "fluentDesignBootstrap":
            return "fluentDesignBootstrap";
        default:
            return "defaultBootstrap";
    }
}

/**
 * Loads any extra stylesheets required by user settings
 */
(() => {
    if (!(getCustomTheme() === "defaultBootstrap")) {
        const customTheme = getCustomTheme();
        switch (customTheme) {
            case "fluentDesignBootstrap":
                // eslint-disable-next-line no-case-declarations
                const head = document.getElementsByTagName("head")[0];
                // eslint-disable-next-line no-case-declarations
                const nightModeStylesheet = document.createElement("link");
                if (checkHostType() !== "electron") {
                    nightModeStylesheet.href = "/css/fluent.css";
                } else if (getCurrentFileName() === "popup.html" || getCurrentFileName() === "delayedloading.html" || getCurrentFileName() === "openingtabs.html") {
                    nightModeStylesheet.href = "./css/fluent.css";
                } else {
                    nightModeStylesheet.href = "../../css/fluent.css";
                }
                nightModeStylesheet.rel = "stylesheet";
                head.appendChild(nightModeStylesheet);
                break;
            default:
                break;
        }
    }
    if (isNightModeEnabled()) {
        const head = document.getElementsByTagName("head")[0];
        const nightModeStylesheet = document.createElement("link");
        if (checkHostType() !== "electron") {
            nightModeStylesheet.href = "/css/style-dark.css";
        } else if (getCurrentFileName() === "popup.html" || getCurrentFileName() === "delayedloading.html" || getCurrentFileName() === "openingtabs.html") {
            nightModeStylesheet.href = "./css/style-dark.css";
        } else {
            nightModeStylesheet.href = "../../css/style-dark.css";
        }
        nightModeStylesheet.rel = "stylesheet";
        nightModeStylesheet.id = "styles-dark";
        head.appendChild(nightModeStylesheet);
    }
    document.getElementById("tempStylesheetLoader").remove();
})();
