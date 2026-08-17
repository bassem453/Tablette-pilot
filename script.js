/* ============================================================
   FENIX EFB PILOT
   SCRIPT COMPLET
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {


    /* ========================================================
       ÉLÉMENTS
       ======================================================== */

    const currentDate =
        document.getElementById("currentDate");

    const currentTime =
        document.getElementById("currentTime");

    const batteryPercent =
        document.getElementById("batteryPercent");

    const batteryLevel =
        document.getElementById("batteryLevel");


    /* ========================================================
       SETTINGS
       ======================================================== */

    const settingsApp =
        document.getElementById("settingsApp");

    const settingsScreen =
        document.getElementById("settingsScreen");

    const settingsBackButton =
        document.getElementById("settingsBackButton");


    /* ========================================================
       BRIGHTNESS
       ======================================================== */

    const brightnessScreen =
        document.getElementById("brightnessScreen");

    const brightnessDisplayRow =
        document.getElementById("brightnessDisplayRow");

    const displayBrightnessRow =
        document.getElementById("displayBrightnessRow");

    const brightnessBackButton =
        document.getElementById("brightnessBackButton");

    const brightnessSlider =
        document.getElementById("brightnessSlider");

    const brightnessPercentage =
        document.getElementById("brightnessPercentage");

    const brightnessSliderFill =
        document.getElementById("brightnessSliderFill");

    const brightnessSliderKnob =
        document.getElementById("brightnessSliderKnob");

    const brightnessSettingValue =
        document.getElementById("brightnessSettingValue");


    /* ========================================================
       WALLPAPER
       ======================================================== */

    const wallpaperScreen =
        document.getElementById("wallpaperScreen");

    const wallpaperRow =
        document.getElementById("wallpaperRow");

    const wallpaperBackButton =
        document.getElementById("wallpaperBackButton");

    const wallpaperItems =
        document.querySelectorAll(".wallpaper-item");


    /* ========================================================
       SIMBRIEF
       ======================================================== */

    const simbriefRow =
        document.getElementById("simbriefRow");

    const simbriefScreen =
        document.getElementById("simbriefScreen");

    const simbriefBackButton =
        document.getElementById("simbriefBackButton");

    const connectSimbriefButton =
        document.getElementById("connectSimbriefButton");

    const disconnectSimbriefButton =
        document.getElementById(
            "disconnectSimbriefButton"
        );

    const simbriefConnected =
        document.getElementById(
            "simbriefConnected"
        );

    const simbriefNotConnected =
        document.getElementById(
            "simbriefNotConnected"
        );

    const simbriefSettingStatus =
        document.getElementById(
            "simbriefSettingStatus"
        );


    /* ========================================================
       SLEEP
       ======================================================== */

    const sleepRow =
        document.getElementById("sleepRow");

    const sleepScreen =
        document.getElementById("sleepScreen");

    const finishSleepButton =
        document.getElementById(
            "finishSleepButton"
        );


    /* ========================================================
       AUTRES
       ======================================================== */

    const rebootRow =
        document.getElementById("rebootRow");

    const resetRow =
        document.getElementById("resetRow");

    const volumeRange =
        document.getElementById("volumeRange");

    const flightModeSwitch =
        document.getElementById(
            "flightModeSwitch"
        );

    const nightModeSwitch =
        document.getElementById(
            "nightModeSwitch"
        );

    const deviceBatteryValue =
        document.getElementById(
            "deviceBatteryValue"
        );

    const settingsTime =
        document.getElementById(
            "settingsTime"
        );


    /* ========================================================
       DATE / HEURE
       ======================================================== */

    function updateDateTime() {

        const now = new Date();

        const date =
            new Intl.DateTimeFormat(
                "en-GB",
                {
                    timeZone: "Europe/Paris",
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            ).format(now);

        const time =
            new Intl.DateTimeFormat(
                "fr-FR",
                {
                    timeZone: "Europe/Paris",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                }
            ).format(now);

        currentDate.textContent =
            date;

        currentTime.textContent =
            time;

        settingsTime.textContent =
            time;
    }


    /* ========================================================
       BATTERIE
       ======================================================== */

    async function updateBattery() {

        if (!navigator.getBattery) {

            batteryPercent.textContent =
                "--%";

            deviceBatteryValue.textContent =
                "--%";

            return;
        }

        try {

            const battery =
                await navigator.getBattery();

            function refreshBattery() {

                const percentage =
                    Math.round(
                        battery.level * 100
                    );

                batteryPercent.textContent =
                    `${percentage}%`;

                deviceBatteryValue.textContent =
                    `${percentage}%`;

                batteryLevel.style.width =
                    `${percentage}%`;
            }

            refreshBattery();

            battery.addEventListener(
                "levelchange",
                refreshBattery
            );

        } catch {

            batteryPercent.textContent =
                "--%";

            deviceBatteryValue.textContent =
                "--%";
        }
    }


    /* ========================================================
       ÉCRANS
       ======================================================== */

    function openSettings() {

        settingsScreen.classList.remove(
            "hidden"
        );

        brightnessScreen.classList.add(
            "hidden"
        );

        wallpaperScreen.classList.add(
            "hidden"
        );

        simbriefScreen.classList.add(
            "hidden"
        );

        sleepScreen.classList.add(
            "hidden"
        );
    }


    function closeSettings() {

        settingsScreen.classList.add(
            "hidden"
        );
    }


    /* ========================================================
       BRIGHTNESS PAGE
       ======================================================== */

    function openBrightness() {

        settingsScreen.classList.add(
            "hidden"
        );

        brightnessScreen.classList.remove(
            "hidden"
        );

        updateBrightnessUI();
    }


    function closeBrightness() {

        brightnessScreen.classList.add(
            "hidden"
        );

        settingsScreen.classList.remove(
            "hidden"
        );
    }


    /* ========================================================
       BRIGHTNESS ENGINE
       ======================================================== */

    const savedBrightness =
        localStorage.getItem(
            "fenixEfbBrightness"
        );

    if (savedBrightness !== null) {

        brightnessSlider.value =
            savedBrightness;
    }


    function updateBrightnessUI() {

        const value =
            Number(
                brightnessSlider.value
            );

        const minimum = 20;
        const maximum = 100;

        const percentage =
            ((value - minimum) /
            (maximum - minimum)) *
            100;


        brightnessPercentage.textContent =
            `${value}%`;


        brightnessSettingValue.textContent =
            `${value}%`;


        brightnessSliderFill.style.width =
            `${percentage}%`;


        brightnessSliderKnob.style.left =
            `${percentage}%`;


        /*
         * Le filtre permet de rendre visuellement
         * l'écran réellement plus sombre.
         */

        const brightness =
            value / 100;

        document.body.style.filter =
            `brightness(${brightness})`;


        localStorage.setItem(
            "fenixEfbBrightness",
            value
        );
    }


    brightnessSlider.addEventListener(
        "input",
        updateBrightnessUI
    );


    brightnessDisplayRow.addEventListener(
        "click",
        openBrightness
    );


    displayBrightnessRow.addEventListener(
        "click",
        openBrightness
    );


    brightnessBackButton.addEventListener(
        "click",
        closeBrightness
    );


    /* ========================================================
       WALLPAPER PAGE
       ======================================================== */

    function openWallpaper() {

        settingsScreen.classList.add(
            "hidden"
        );

        wallpaperScreen.classList.remove(
            "hidden"
        );

        loadSelectedWallpaper();
    }


    function closeWallpaper() {

        wallpaperScreen.classList.add(
            "hidden"
        );

        settingsScreen.classList.remove(
            "hidden"
        );
    }


    const wallpaperStorageKey =
        "fenixEfbSelectedWallpaper";


    function loadSelectedWallpaper() {

        const selected =
            localStorage.getItem(
                wallpaperStorageKey
            );

        wallpaperItems.forEach(
            item => {

                item.classList.remove(
                    "selected"
                );

                if (
                    selected &&
                    item.dataset.wallpaper ===
                    selected
                ) {

                    item.classList.add(
                        "selected"
                    );
                }

            }
        );
    }


    wallpaperItems.forEach(
        item => {

            item.addEventListener(
                "click",
                () => {

                    const id =
                        item.dataset.wallpaper;

                    localStorage.setItem(
                        wallpaperStorageKey,
                        id
                    );


                    /*
                     * Si une vraie image existe,
                     * elle devient immédiatement
                     * le fond de la tablette.
                     */

                    const image =
                        item.dataset.image;

                    if (image) {

                        document.body.style.backgroundImage =
                            `url("${image}")`;
                    }


                    wallpaperItems.forEach(
                        other => {

                            other.classList.remove(
                                "selected"
                            );

                        }
                    );

                    item.classList.add(
                        "selected"
                    );

                }
            );

        }
    );


    wallpaperRow.addEventListener(
        "click",
        openWallpaper
    );


    wallpaperBackButton.addEventListener(
        "click",
        closeWallpaper
    );


    /* ========================================================
       CHARGER LE WALLPAPER AU DÉMARRAGE
       ======================================================== */

    function loadWallpaper() {

        const selected =
            localStorage.getItem(
                wallpaperStorageKey
            );

        if (!selected) {
            return;
        }

        const item =
            document.querySelector(
                `.wallpaper-item[data-wallpaper="${selected}"]`
            );

        if (!item) {
            return;
        }

        const image =
            item.dataset.image;

        if (image) {

            document.body.style.backgroundImage =
                `url("${image}")`;
        }
    }


    /* ========================================================
       SIMBRIEF ACCOUNT
       ======================================================== */

    const simbriefConnectedKey =
        "fenixEfbSimbriefConnected";


    function openSimbrief() {

        settingsScreen.classList.add(
            "hidden"
        );

        simbriefScreen.classList.remove(
            "hidden"
        );

        updateSimbriefUI();
    }


    function closeSimbrief() {

        simbriefScreen.classList.add(
            "hidden"
        );

        settingsScreen.classList.remove(
            "hidden"
        );
    }


    function updateSimbriefUI() {

        const connected =
            localStorage.getItem(
                simbriefConnectedKey
            ) === "true";


        if (connected) {

            simbriefConnected.classList.remove(
                "hidden"
            );

            simbriefNotConnected.classList.add(
                "hidden"
            );

            connectSimbriefButton.classList.add(
                "hidden"
            );

            disconnectSimbriefButton.classList.remove(
                "hidden"
            );

            simbriefSettingStatus.textContent =
                "Connected";

        } else {

            simbriefConnected.classList.add(
                "hidden"
            );

            simbriefNotConnected.classList.remove(
                "hidden"
            );

            connectSimbriefButton.classList.remove(
                "hidden"
            );

            disconnectSimbriefButton.classList.add(
                "hidden"
            );

            simbriefSettingStatus.textContent =
                "Not connected";
        }
    }


    /*
     * IMPORTANT :
     *
     * Ici on ouvre le site officiel SimBrief.
     * On ne demande JAMAIS le mot de passe.
     *
     * L'état "connected" ne doit pas être inventé
     * avant la vraie intégration API/backend.
     */

    connectSimbriefButton.addEventListener(
        "click",
        () => {

            window.open(
                "https://www.simbrief.com/",
                "_blank",
                "noopener,noreferrer"
            );

        }
    );


    disconnectSimbriefButton.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                simbriefConnectedKey
            );

            updateSimbriefUI();

        }
    );


    simbriefRow.addEventListener(
        "click",
        openSimbrief
    );


    simbriefBackButton.addEventListener(
        "click",
        closeSimbrief
    );


    /* ========================================================
       SLEEP
       ======================================================== */

    sleepRow.addEventListener(
        "click",
        () => {

            settingsScreen.classList.add(
                "hidden"
            );

            sleepScreen.classList.remove(
                "hidden"
            );

        }
    );


    finishSleepButton.addEventListener(
        "click",
        () => {

            sleepScreen.classList.add(
                "hidden"
            );

            settingsScreen.classList.remove(
                "hidden"
            );

        }
    );


    /* ========================================================
       VOLUME
       ======================================================== */

    const savedVolume =
        localStorage.getItem(
            "fenixEfbVolume"
        );

    if (savedVolume !== null) {

        volumeRange.value =
            savedVolume;
    }


    volumeRange.addEventListener(
        "input",
        () => {

            localStorage.setItem(
                "fenixEfbVolume",
                volumeRange.value
            );

        }
    );


    /* ========================================================
       FLIGHT MODE
       ======================================================== */

    const savedFlightMode =
        localStorage.getItem(
            "fenixEfbFlightMode"
        );

    if (savedFlightMode === "true") {

        flightModeSwitch.checked =
            true;
    }


    flightModeSwitch.addEventListener(
        "change",
        () => {

            localStorage.setItem(
                "fenixEfbFlightMode",
                flightModeSwitch.checked
            );

        }
    );


    /* ========================================================
       DAY / NIGHT
       ======================================================== */

    const savedNightMode =
        localStorage.getItem(
            "fenixEfbNightMode"
        );

    if (savedNightMode === "true") {

        nightModeSwitch.checked =
            true;
    }


    nightModeSwitch.addEventListener(
        "change",
        () => {

            localStorage.setItem(
                "fenixEfbNightMode",
                nightModeSwitch.checked
            );


            if (
                nightModeSwitch.checked
            ) {

                const current =
                    Number(
                        brightnessSlider.value
                    );

                document.body.style.filter =
                    `brightness(${current / 100 * 0.65})`;

            } else {

                updateBrightnessUI();

            }

        }
    );


    /* ========================================================
       REBOOT
       ======================================================== */

    rebootRow.addEventListener(
        "click",
        () => {

            location.reload();

        }
    );


    /* ========================================================
       RESET
       ======================================================== */

    resetRow.addEventListener(
        "click",
        () => {

            const confirmReset =
                confirm(
                    "Reset all EFB settings?"
                );

            if (!confirmReset) {
                return;
            }

            localStorage.clear();

            location.reload();

        }
    );


    /* ========================================================
       SETTINGS APP
       ======================================================== */

    settingsApp.addEventListener(
        "click",
        openSettings
    );


    settingsApp.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openSettings();
            }

        }
    );


    settingsBackButton.addEventListener(
        "click",
        closeSettings
    );


    /* ========================================================
       INITIALISATION
       ======================================================== */

    updateDateTime();

    setInterval(
        updateDateTime,
        1000
    );

    updateBattery();

    updateBrightnessUI();

    loadWallpaper();

    updateSimbriefUI();

});