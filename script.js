/* ============================================================
   EFB PILOT TABLET - SCRIPT COMPLET
   FLIGHT CENTER / CENTRALIZED FLIGHT DATA
   ============================================================ */

/* ============================================================
   DATABASES
   ============================================================ */

const atisAirports = {

    LFPO: {
        name: "ORLY",

        frequencies: [
            {
                name: "Orly Prévol",
                code: "LFPO_DEL",
                frequency: "121.555"
            },
            {
                name: "Orly Sol",
                code: "LFPO_GND",
                frequency: "121.705"
            },
            {
                name: "Orly Tour",
                code: "LFPO_TWR",
                frequency: "118.700"
            },
            {
                name: "Orly Départ",
                code: "LFPO_DEP",
                frequency: "127.750"
            },
            {
                name: "Orly Approche",
                code: "LFPO_APP",
                frequency: "123.875"
            }
        ],

        control: [
            {
                name: "Paris Contrôle",
                code: "LFFF_CTR",
                frequency: "120.955"
            },
            {
                name: "Paris Contrôle Est",
                code: "LFFF_E_CTR",
                frequency: "132.100"
            },
            {
                name: "Paris Contrôle Ouest",
                code: "LFFF_W_CTR",
                frequency: "124.850"
            }
        ]
    }

};


/* ============================================================
   AIRPORT DATABASE
   ============================================================ */

const airports = {

    LFPO: {
        icao: "LFPO",
        name: "Paris Orly",
        city: "Paris",
        runways: ["06", "08", "24", "26"],
        sids: ["OKIPA", "LORNI", "MOPAR"],
        stars: ["LORNI", "OKIPA", "MOPAR"],
        approaches: ["ILS", "RNAV", "VOR", "LOC"]
    },

    LFPG: {
        icao: "LFPG",
        name: "Paris Charles de Gaulle",
        city: "Paris",
        runways: [
            "08L",
            "08R",
            "09L",
            "09R",
            "26L",
            "26R",
            "27L",
            "27R"
        ],
        sids: ["AGOPA", "BANOX", "KOLIV"],
        stars: ["AGOPA", "BANOX", "KOLIV"],
        approaches: ["ILS", "RNAV", "VOR", "LOC"]
    },

    LFLL: {
        icao: "LFLL",
        name: "Lyon Saint-Exupéry",
        city: "Lyon",
        runways: [
            "17L",
            "17R",
            "35L",
            "35R"
        ],
        sids: ["AMB", "OKASI"],
        stars: ["AMB", "OKASI"],
        approaches: ["ILS", "RNAV", "VOR"]
    },

    LFML: {
        icao: "LFML",
        name: "Marseille Provence",
        city: "Marseille",
        runways: [
            "13L",
            "13R",
            "31L",
            "31R"
        ],
        sids: ["DIPIR", "NIRGO"],
        stars: ["DIPIR", "NIRGO"],
        approaches: ["ILS", "RNAV", "VOR"]
    },

    LFBO: {
        icao: "LFBO",
        name: "Toulouse-Blagnac",
        city: "Toulouse",
        runways: [
            "14L",
            "14R",
            "32L",
            "32R"
        ],
        sids: ["MUREL", "TOU"],
        stars: ["MUREL", "TOU"],
        approaches: ["ILS", "RNAV", "VOR"]
    },

    LFMN: {
        icao: "LFMN",
        name: "Nice Côte d'Azur",
        city: "Nice",
        runways: [
            "04L",
            "04R",
            "22L",
            "22R"
        ],
        sids: ["OKTET", "PEKOD"],
        stars: ["OKTET", "PEKOD"],
        approaches: ["ILS", "RNAV", "VOR"]
    },

    EGLL: {
        icao: "EGLL",
        name: "London Heathrow",
        city: "London",
        runways: [
            "09L",
            "09R",
            "27L",
            "27R"
        ],
        sids: ["BIG", "LAM", "DET"],
        stars: ["BIG", "LAM", "DET"],
        approaches: ["ILS", "RNAV"]
    },

    KJFK: {
        icao: "KJFK",
        name: "John F. Kennedy International",
        city: "New York",
        runways: [
            "04L",
            "04R",
            "13L",
            "13R",
            "22L",
            "22R",
            "31L",
            "31R"
        ],
        sids: ["MERIT", "BETTE", "DEEZZ"],
        stars: ["MERIT", "BETTE", "DEEZZ"],
        approaches: ["ILS", "RNAV", "VOR"]
    }

};


/* ============================================================
   CENTRAL FLIGHT OBJECT
   ============================================================
   
   TOUTES LES PAGES DE L'EFB UTILISENT CET OBJET.

   Le vol est donc centralisé ici :
   
   FLIGHT CENTER
   FLIGHT PLAN
   MAP
   PASSENGERS
   CABIN CREW
   FLIGHT CREW
   CHECKLIST
   FUEL
   PERFORMANCE
   WEATHER
   ATC / COMMS
   GROUND
   CHARTS
   BRIEFING
   CABIN
   DISPATCH

   ============================================================ */

function defaultFlight() {

    return {

        /* -------------------------
           INFORMATIONS DU VOL
           ------------------------- */

        name: "",

        number: "",

        aircraft: "",

        departure: "",

        arrival: "",

        departureRunway: "",

        arrivalRunway: "",

        sid: "",

        route: "",

        star: "",

        approach: "",


        /* -------------------------
           NAVIGATION
           ------------------------- */

        cruiseAltitude: 350,

        cruiseSpeed: 450,

        waypoints: [],


        /* -------------------------
           STATUT
           ------------------------- */

        status: "DRAFT",


        /* -------------------------
           PASSAGERS
           ------------------------- */

        passengers: {

            total: 0,

            adults: 0,

            children: 0,

            infants: 0,

            economy: 0,

            business: 0,

            first: 0,

            boarded: 0,

            noShow: 0,

            status: "BOARDING"

        },


        /* -------------------------
           CABIN CREW
           ------------------------- */

        cabinCrew: {

            chief: "",

            pnc: [],

            positions: [],

            briefing: false,

            boarding: false,

            doors: false,

            safetyDemo: false,

            cabinReady: false,

            service: false

        },


        /* -------------------------
           FLIGHT CREW
           ------------------------- */

        flightCrew: {

            captain: "",

            firstOfficer: "",

            others: [],

            briefing: false

        },


        /* -------------------------
           FUEL
           ------------------------- */

        fuelData: {

            quantity: 0,

            consumption: 0,

            reserve: 0,

            endurance: 0

        },


        /* -------------------------
           PERFORMANCE
           ------------------------- */

        performance: {

            mass: "",

            takeoff: "",

            climb: "",

            cruise: "",

            descent: "",

            landing: ""

        },


        /* -------------------------
           WEATHER
           ------------------------- */

        weather: {

            departure: {

                metar: "",

                taf: "",

                wind: "",

                visibility: "",

                temperature: "",

                qnh: ""

            },

            route: "",

            destination: {

                metar: "",

                taf: "",

                wind: "",

                visibility: "",

                temperature: "",

                qnh: ""

            }

        },


        /* -------------------------
           GROUND
           ------------------------- */

        ground: {

            airport: "",

            gate: "",

            stand: "",

            parking: "",

            pushback: "",

            taxi: "",

            runway: "",

            taxiway: "",

            taxiRoute: "",

            status: "STANDBY"

        },


        /* -------------------------
           DISPATCH
           ------------------------- */

        dispatch: {

            prepared: false,

            sent: false

        },


        /* -------------------------
           CHECKLIST
           ------------------------- */

        checklist: {

            phase: 0,

            completed: []

        }

    };

}


/* ============================================================
   CURRENT FLIGHT
   ============================================================ */

let currentFlight = defaultFlight();

let airportSearchTarget = null;


/* ============================================================
   PAGE NAVIGATION
   ============================================================ */

function openPage(pageName) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(page => {

        page.classList.remove("active");

    });


    const target =
        document.getElementById(
            "page-" + pageName
        );


    if (!target) {

        console.warn(
            "Page introuvable :",
            pageName
        );

        return;

    }


    target.classList.add("active");


    /* -------------------------
       MISE À JOUR DES MODULES
       ------------------------- */

    if (pageName === "flight-center") {

        updateFlightCenter();

    }


    if (pageName === "flightplan") {

        updateFlightSummary();

    }


    if (pageName === "map") {

        updateMap();

    }


    if (pageName === "briefing") {

        updateBriefing();

    }


    if (pageName === "saved") {

        displaySavedFlights();

    }


    if (pageName === "checklist") {

        renderChecklist();

    }

}


/* ============================================================
   FLIGHT CENTER
   ============================================================ */

/*
   Met à jour les informations affichées
   dans le FLIGHT CENTER à partir du même
   objet currentFlight.
*/

function updateFlightCenter() {

    const values = {

        fcFlightName:
            currentFlight.name ||
            currentFlight.number ||
            "NO FLIGHT",

        fcFlightNumber:
            currentFlight.number ||
            "NO FLIGHT",

        fcDeparture:
            currentFlight.departure ||
            "----",

        fcArrival:
            currentFlight.arrival ||
            "----",

        fcAircraft:
            currentFlight.aircraft ||
            "----",

        flightCenterFlight:
            currentFlight.number ||
            currentFlight.name ||
            "NO FLIGHT"

    };


    Object.entries(values)
        .forEach(
            ([id, value]) => {

                const element =
                    document.getElementById(id);

                if (element) {

                    element.textContent =
                        value;

                }

            }
        );


    updateStatusDisplay();

}


/* ============================================================
   OPEN FLIGHT CENTER
   ============================================================ */

function goToFlightCenter() {

    updateFlightCenter();

    openPage("flight-center");

}


/* ============================================================
   NEW FLIGHT
   ============================================================ */

function newFlight() {

    currentFlight =
        defaultFlight();


    saveCurrentFlightState();


    /*
       On nettoie uniquement les champs
       du nouveau vol.
    */

    const fields = {

        flightNumber: "",

        editorFlightNumber: "",

        flightName: "",

        editorFlightName: "",

        departure: "",

        arrival: "",

        aircraft: "",

        departureRunway: "",

        arrivalRunway: "",

        sid: "",

        route: "",

        star: "",

        approach: ""

    };


    Object.entries(fields)
        .forEach(
            ([id, value]) => {

                const element =
                    document.getElementById(id);


                if (!element) {

                    return;

                }


                if ("value" in element) {

                    element.value =
                        value;

                } else {

                    element.textContent =
                        value;

                }

            }
        );


    updateFlightFields();

    openPage("flight-center");

}


/* ============================================================
   CREATE FLIGHT FROM FORM
   ============================================================ */

function createFlightFromForm() {

    function readValue(...ids) {

        for (const id of ids) {

            const element =
                document.getElementById(id);


            if (!element) {

                continue;

            }


            const value =
                "value" in element
                    ? element.value
                    : element.textContent;


            return value
                .trim()
                .toUpperCase();

        }


        return "";

    }


    const name =
        readValue(
            "flightName",
            "newFlightName",
            "editorFlightName"
        );


    const number =
        readValue(
            "flightNumber",
            "newFlightNumber",
            "editorFlightNumber"
        );


    const departure =
        readValue(
            "departure",
            "newFlightDeparture",
            "editorDeparture"
        );


    const arrival =
        readValue(
            "arrival",
            "newFlightArrival",
            "editorArrival"
        );


    const aircraft =
        readValue(
            "aircraft",
            "newFlightAircraft",
            "editorAircraft"
        );


    const departureRunway =
        readValue(
            "departureRunway",
            "newFlightDepartureRunway"
        );


    const sid =
        readValue(
            "sid",
            "newFlightSID"
        );


    const route =
        readValue(
            "route",
            "newFlightRoute"
        );


    const star =
        readValue(
            "star",
            "newFlightSTAR"
        );


    const approach =
        readValue(
            "approach",
            "newFlightApproach"
        );


    if (
        !departure ||
        !arrival
    ) {

        showModal(
            "FLIGHT INCOMPLETE",
            "ENTER A DEPARTURE AND ARRIVAL AIRPORT FIRST.",
            null
        );

        return false;

    }


    currentFlight.name =
        name;


    currentFlight.number =
        number ||
        `${departure}-${arrival}`;


    currentFlight.departure =
        departure;


    currentFlight.arrival =
        arrival;


    currentFlight.aircraft =
        aircraft;


    currentFlight.departureRunway =
        departureRunway;


    currentFlight.sid =
        sid;


    currentFlight.route =
        route;


    currentFlight.star =
        star;


    currentFlight.approach =
        approach;


    currentFlight.status =
        "DRAFT";


    /*
       La route devient automatiquement
       la liste des waypoints lorsque
       des espaces séparent les points.
    */

    currentFlight.waypoints =
        route
            ? route
                .split(/\s+/)
                .filter(Boolean)
                .map(
                    waypoint =>
                        waypoint.toUpperCase()
                )
            : [];


    updateFlightFields();

    saveCurrentFlightState();

    updateFlightCenter();

    openPage("flight-center");


    return true;

}


/* ============================================================
   CLOCK
   ============================================================ */

function updateClock() {

    const clock =
        document.getElementById(
            "clock"
        );


    if (!clock) {

        return;

    }


    const now =
        new Date();


    const hours =
        String(
            now.getHours()
        ).padStart(
            2,
            "0"
        );


    const minutes =
        String(
            now.getMinutes()
        ).padStart(
            2,
            "0"
        );


    clock.textContent =
        `${hours}:${minutes}`;

}


/* ============================================================
   DATE
   ============================================================ */

function updateDate() {

    const dateDisplay =
        document.getElementById(
            "dateDisplay"
        );


    if (!dateDisplay) {

        return;

    }


    const now =
        new Date();


    const days = [

        "SUN",
        "MON",
        "TUE",
        "WED",
        "THU",
        "FRI",
        "SAT"

    ];


    const months = [

        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"

    ];


    dateDisplay.textContent =
        `${days[now.getDay()]} ${months[now.getMonth()]} ${String(now.getDate()).padStart(2, "0")}`;

}


/* ============================================================
   BATTERY
   ============================================================ */

function updateBattery() {

    const percent =
        document.getElementById(
            "batteryPercent"
        );


    const level =
        document.getElementById(
            "batteryLevel"
        );


    if (
        !percent ||
        !level
    ) {

        return;

    }


    if (
        !navigator.getBattery
    ) {

        percent.textContent =
            "100%";

        level.style.width =
            "100%";

        return;

    }


    navigator
        .getBattery()
        .then(
            battery => {

                function refresh() {

                    const value =
                        Math.round(
                            battery.level *
                            100
                        );


                    percent.textContent =
                        `${value}%`;


                    level.style.width =
                        `${value}%`;

                }


                refresh();


                battery.addEventListener(
                    "levelchange",
                    refresh
                );

            }
        )
        .catch(
            () => {

                percent.textContent =
                    "100%";

                level.style.width =
                    "100%";

            }
        );

/* ============================================================
   ATIS
   ============================================================ */

function loadATISAirport() {

    const input =
        document.getElementById(
            "atisAirportInput"
        );

    const status =
        document.getElementById(
            "atisAirportStatus"
        );

    const waiting =
        document.getElementById(
            "atisWaiting"
        );

    const airportData =
        document.getElementById(
            "atisAirportData"
        );


    if (
        !input ||
        !status ||
        !waiting ||
        !airportData
    ) {

        return;

    }


    const icao =
        input.value
            .trim()
            .toUpperCase();


    input.value =
        icao;


    if (!icao) {

        status.textContent =
            "ENTER ICAO CODE";

        waiting.style.display =
            "block";

        airportData.style.display =
            "none";

        return;

    }


    const airport =
        atisAirports[icao];


    if (!airport) {

        status.textContent =
            "AIRPORT NOT FOUND";

        waiting.style.display =
            "block";

        airportData.style.display =
            "none";

        return;

    }


    status.textContent =
        `${icao} LOADED`;


    const name =
        document.getElementById(
            "atisAirportName"
        );


    const airportICAO =
        document.getElementById(
            "atisAirportICAO"
        );


    if (name) {

        name.textContent =
            airport.name;

    }


    if (airportICAO) {

        airportICAO.textContent =
            icao;

    }


    const frequencyCards =
        document.querySelectorAll(
            "#atisAirportData .atis-frequency-card"
        );


    const allFrequencies = [

        ...airport.frequencies,

        ...airport.control

    ];


    allFrequencies.forEach(
        (frequency, index) => {

            const card =
                frequencyCards[index];


            if (!card) {

                return;

            }


            const serviceName =
                card.querySelector(
                    ".atis-service-name"
                );


            const serviceCode =
                card.querySelector(
                    ".atis-service-code"
                );


            const frequencyValue =
                card.querySelector(
                    ".atis-frequency"
                );


            if (serviceName) {

                serviceName.textContent =
                    frequency.name;

            }


            if (serviceCode) {

                serviceCode.textContent =
                    frequency.code;

            }


            if (frequencyValue) {

                frequencyValue.textContent =
                    frequency.frequency;

            }

        }
    );


    waiting.style.display =
        "none";


    airportData.style.display =
        "block";

}


/* ============================================================
   ATIS ENTER KEY
   ============================================================ */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key !==
            "Enter"
        ) {

            return;

        }


        const input =
            document.getElementById(
                "atisAirportInput"
            );


        if (
            input &&
            document.activeElement === input
        ) {

            loadATISAirport();

        }

    }
);


/* ============================================================
   FLIGHT EDITOR
   ============================================================ */

function editFlight() {

    const fields = {

        editorFlightNumber:
            currentFlight.number,

        editorFlightName:
            currentFlight.name,

        editorDeparture:
            currentFlight.departure,

        editorArrival:
            currentFlight.arrival,

        editorAircraft:
            currentFlight.aircraft,

        departureRunway:
            currentFlight.departureRunway,

        sid:
            currentFlight.sid,

        route:
            currentFlight.route,

        star:
            currentFlight.star,

        approach:
            currentFlight.approach

    };


    Object.entries(fields)
        .forEach(
            ([id, value]) => {

                const element =
                    document.getElementById(id);


                if (!element) {

                    return;

                }


                if ("value" in element) {

                    element.value =
                        value || "";

                }

            }
        );


    openPage("editor");

}


/* ============================================================
   APPLY EDITOR
   ============================================================ */

function applyEditor() {

    function readValue(...ids) {

        for (const id of ids) {

            const element =
                document.getElementById(id);


            if (!element) {

                continue;

            }


            return (
                "value" in element
                    ? element.value
                    : element.textContent
            )
                .trim()
                .toUpperCase();

        }


        return "";

    }


    currentFlight.number =
        readValue(
            "editorFlightNumber",
            "flightNumber"
        );


    currentFlight.name =
        readValue(
            "editorFlightName",
            "flightName"
        );


    currentFlight.departure =
        readValue(
            "editorDeparture",
            "departure"
        );


    currentFlight.arrival =
        readValue(
            "editorArrival",
            "arrival"
        );


    currentFlight.aircraft =
        readValue(
            "editorAircraft",
            "aircraft"
        );


    currentFlight.departureRunway =
        readValue(
            "departureRunway"
        );


    currentFlight.sid =
        readValue(
            "sid"
        );


    currentFlight.route =
        readValue(
            "route"
        );


    currentFlight.star =
        readValue(
            "star"
        );


    currentFlight.approach =
        readValue(
            "approach"
        );


    currentFlight.waypoints =
        currentFlight.route
            ? currentFlight.route
                .split(/\s+/)
                .filter(Boolean)
            : [];


    updateFlightFields();

    saveCurrentFlightState();

    openPage("flight-center");

}


/* ============================================================
   UPDATE FLIGHT FIELDS
   ============================================================ */

function updateFlightFields() {

    const fields = {

        flightNumber:
            currentFlight.number ||
            "NO FLIGHT",

        flightName:
            currentFlight.name ||
            "",

        departure:
            currentFlight.departure ||
            "",

        arrival:
            currentFlight.arrival ||
            "",

        aircraft:
            currentFlight.aircraft ||
            "",

        departureRunway:
            currentFlight.departureRunway ||
            "",

        sid:
            currentFlight.sid ||
            "",

        route:
            currentFlight.route ||
            "",

        star:
            currentFlight.star ||
            "",

        approach:
            currentFlight.approach ||
            ""

    };


    Object.entries(fields)
        .forEach(
            ([id, value]) => {

                const element =
                    document.getElementById(id);


                if (!element) {

                    return;

                }


                if (
                    "value" in element
                ) {

                    element.value =
                        value;

                } else {

                    element.textContent =
                        value;

                }

            }
        );


    populateRunways();

    populateProcedures();

    renderWaypoints();

    updateFlightCenter();

}


/* ============================================================
   AIRPORT SEARCH
   ============================================================ */

function searchAirport(target) {

    airportSearchTarget =
        target;


    const input =
        document.getElementById(
            "airportSearchInput"
        );


    if (input) {

        input.value =
            "";

    }


    filterAirports();

    openPage("airport-search");

}


/* ============================================================
   FILTER AIRPORTS
   ============================================================ */

function filterAirports() {

    const input =
        document.getElementById(
            "airportSearchInput"
        );


    const results =
        document.getElementById(
            "airportResults"
        );


    if (
        !input ||
        !results
    ) {

        return;

    }


    const search =
        input.value
            .trim()
            .toLowerCase();


    results.innerHTML =
        "";


    Object.values(airports)
        .filter(
            airport => {

                if (!search) {

                    return true;

                }


                return (

                    airport.icao
                        .toLowerCase()
                        .includes(search)

                    ||

                    airport.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    airport.city
                        .toLowerCase()
                        .includes(search)

                );

            }
        )
        .forEach(
            airport => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "airport-result";


                button.innerHTML = `
                    <strong>
                        ${airport.icao}
                    </strong>

                    <span>
                        ${airport.name} - ${airport.city}
                    </span>
                `;


                button.onclick =
                    function() {

                        selectAirport(
                            airport.icao
                        );

                    };


                results.appendChild(
                    button
                );

            }
        );

}


/* ============================================================
   SELECT AIRPORT
   ============================================================ */

function selectAirport(icao) {

    if (!airportSearchTarget) {

        return;

    }


    const airport =
        airports[icao];


    if (!airport) {

        return;

    }


    const input =
        document.getElementById(
            airportSearchTarget
        );


    if (input) {

        input.value =
            airport.icao;

    }


    currentFlight[
        airportSearchTarget
    ] =
        airport.icao;


    if (
        airportSearchTarget ===
        "departure"
    ) {

        currentFlight.departure =
            airport.icao;

    }


    if (
        airportSearchTarget ===
        "arrival"
    ) {

        currentFlight.arrival =
            airport.icao;

    }


    populateRunways();

    populateProcedures();

    updateFlightSummary();

    saveCurrentFlightState();

    openPage("flightplan");

}


/* ============================================================
   AIRPORT INPUT
   ============================================================ */

function populateAirportOptions(id) {

    const input =
        document.getElementById(id);


    if (!input) {

        return;

    }


    input.value =
        currentFlight[id] || "";

}


/* ============================================================
   RUNWAYS
   ============================================================ */

function populateRunways() {

    const dep =
        document.getElementById(
            "departureRunway"
        );


    const arr =
        document.getElementById(
            "arrivalRunway"
        );


    if (dep) {

        const airport =
            airports[
                currentFlight.departure
            ];


        dep.innerHTML =
            `<option value="">SELECT</option>`;


        if (airport) {

            airport.runways
                .forEach(
                    runway => {

                        const option =
                            document.createElement(
                                "option"
                            );


                        option.value =
                            runway;


                        option.textContent =
                            runway;


                        dep.appendChild(
                            option
                        );

                    }
                );

        }


        dep.value =
            currentFlight.departureRunway ||
            "";

    }


    if (arr) {

        const airport =
            airports[
                currentFlight.arrival
            ];


        arr.innerHTML =
            `<option value="">SELECT</option>`;


        if (airport) {

            airport.runways
                .forEach(
                    runway => {

                        const option =
                            document.createElement(
                                "option"
                            );


                        option.value =
                            runway;


                        option.textContent =
                            runway;


                        arr.appendChild(
                            option
                        );

                    }
                );

        }


        arr.value =
            currentFlight.arrivalRunway ||
            "";

    }

}


/* ============================================================
   SID / STAR / APPROACH
   ============================================================ */

function populateProcedures() {

    const sid =
        document.getElementById(
            "sid"
        );


    const star =
        document.getElementById(
            "star"
        );


    const approach =
        document.getElementById(
            "approach"
        );


    if (sid) {

        const airport =
            airports[
                currentFlight.departure
            ];


        sid.innerHTML =
            `<option value="">SELECT SID</option>`;


        if (airport) {

            airport.sids
                .forEach(
                    procedure => {

                        const option =
                            document.createElement(
                                "option"
                            );


                        option.value =
                            procedure;


                        option.textContent =
                            procedure;


                        sid.appendChild(
                            option
                        );

                    }
                );

        }


        sid.value =
            currentFlight.sid ||
            "";

    }


    if (star) {

        const airport =
            airports[
                currentFlight.arrival
            ];


        star.innerHTML =
            `<option value="">SELECT STAR</option>`;


        if (airport) {

            airport.stars
                .forEach(
                    procedure => {

                        const option =
                            document.createElement(
                                "option"
                            );


                        option.value =
                            procedure;


                        option.textContent =
                            procedure;


                        star.appendChild(
                            option
                        );

                    }
                );

        }


        star.value =
            currentFlight.star ||
            "";

    }


    if (approach) {

        approach.value =
            currentFlight.approach ||
            "";

    }

}


/* ============================================================
   DISTANCE CALCULATION
   ============================================================ */

function calculateDistance() {

    if (
        !currentFlight.departure ||
        !currentFlight.arrival
    ) {

        return 0;

    }


    if (
        currentFlight.departure ===
        currentFlight.arrival
    ) {

        return 0;

    }


    const knownDistances = {

        "LFPO-KJFK": 3150,
        "KJFK-LFPO": 3150,

        "LFPG-KJFK": 3000,
        "KJFK-LFPG": 3000,

        "LFPO-LFPG": 18,
        "LFPG-LFPO": 18,

        "LFPO-LFLL": 205,
        "LFLL-LFPO": 205,

        "LFPO-LFML": 335,
        "LFML-LFPO": 335,

        "LFPO-LFBO": 295,
        "LFBO-LFPO": 295,

        "LFPO-LFMN": 370,
        "LFMN-LFPO": 370,

        "LFPG-EGLL": 190,
        "EGLL-LFPG": 190

    };


    const key =
        `${currentFlight.departure}-${currentFlight.arrival}`;


    if (
        knownDistances[key]
    ) {

        return knownDistances[key];

    }


    return 250;

}


/* ============================================================
   FLIGHT SUMMARY
   ============================================================ */

function updateFlightSummary() {

    const fields = {

        departure:
            document.getElementById(
                "departure"
            ),

        arrival:
            document.getElementById(
                "arrival"
            ),

        aircraft:
            document.getElementById(
                "aircraft"
            ),

        departureRunway:
            document.getElementById(
                "departureRunway"
            ),

        arrivalRunway:
            document.getElementById(
                "arrivalRunway"
            ),

        sid:
            document.getElementById(
                "sid"
            ),

        star:
            document.getElementById(
                "star"
            ),

        approach:
            document.getElementById(
                "approach"
            ),

        route:
            document.getElementById(
                "route"
            ),

        cruiseAltitude:
            document.getElementById(
                "cruiseAltitude"
            ),

        cruiseSpeed:
            document.getElementById(
                "cruiseSpeed"
            ),

        fuel:
            document.getElementById(
                "fuel"
            )

    };


    if (fields.departure) {

        currentFlight.departure =
            fields.departure.value
                .trim()
                .toUpperCase();

    }


    if (fields.arrival) {

        currentFlight.arrival =
            fields.arrival.value
                .trim()
                .toUpperCase();

    }


    if (fields.aircraft) {

        currentFlight.aircraft =
            fields.aircraft.value;

    }


    if (fields.departureRunway) {

        currentFlight.departureRunway =
            fields.departureRunway.value;

    }


    if (fields.arrivalRunway) {

        currentFlight.arrivalRunway =
            fields.arrivalRunway.value;

    }


    if (fields.sid) {

        currentFlight.sid =
            fields.sid.value;

    }


    if (fields.star) {

        currentFlight.star =
            fields.star.value;

    }


    if (fields.approach) {

        currentFlight.approach =
            fields.approach.value;

    }


    if (fields.route) {

        currentFlight.route =
            fields.route.value;

    }


    if (fields.cruiseAltitude) {

        currentFlight.cruiseAltitude =
            Number(
                fields.cruiseAltitude.value
            ) || 350;

    }


    if (fields.cruiseSpeed) {

        currentFlight.cruiseSpeed =
            Number(
                fields.cruiseSpeed.value
            ) || 450;

    }


    if (fields.fuel) {

        currentFlight.fuel =
            Number(
                fields.fuel.value
            ) || 0;

    }


    const distance =
        calculateDistance();


    const summaryRoute =
        document.getElementById(
            "summaryRoute"
        );


    const totalDistance =
        document.getElementById(
            "totalDistance"
        );


    const waypointCount =
        document.getElementById(
            "waypointCount"
        );


    const estimatedTime =
        document.getElementById(
            "estimatedTime"
        );


    if (summaryRoute) {

        if (
            currentFlight.departure &&
            currentFlight.arrival
        ) {

            summaryRoute.textContent =
                `${currentFlight.departure} → ${currentFlight.arrival}`;

        } else {

            summaryRoute.textContent =
                "----";

        }

    }


    if (totalDistance) {

        totalDistance.textContent =
            `${distance} NM`;

    }


    if (waypointCount) {

        waypointCount.textContent =
            currentFlight.waypoints.length;

    }


    let minutes =
        0;


    if (
        distance > 0 &&
        currentFlight.cruiseSpeed > 0
    ) {

        minutes =
            Math.round(
                (
                    distance /
                    currentFlight.cruiseSpeed
                ) * 60
            );

    }


    if (estimatedTime) {

        estimatedTime.textContent =
            formatTime(
                minutes
            );

    }


    updateStatusDisplay();

    updateFlightCenter();

    updateMap();

    updateBriefing();

    saveCurrentFlightState();

}


/* ============================================================
   FORMAT TIME
   ============================================================ */

function formatTime(minutes) {

    const hours =
        Math.floor(
            minutes / 60
        );


    const mins =
        minutes % 60;


    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;

}


/* ============================================================
   WAYPOINTS
   ============================================================ */

function addWaypoint() {

    const waypoint =
        prompt(
            "ENTER WAYPOINT ICAO / NAME"
        );


    if (!waypoint) {

        return;

    }


    currentFlight.waypoints.push(

        waypoint
            .trim()
            .toUpperCase()

    );


    /*
       La route centrale est également
       reconstruite automatiquement.
    */

    currentFlight.route =
        currentFlight.waypoints.join(
            " "
        );


    renderWaypoints();

    updateFlightSummary();

}


/* ============================================================
   REMOVE WAYPOINT
   ============================================================ */

function removeWaypoint(index) {

    if (
        index < 0 ||
        index >=
        currentFlight.waypoints.length
    ) {

        return;

    }


    currentFlight.waypoints.splice(
        index,
        1
    );


    currentFlight.route =
        currentFlight.waypoints.join(
            " "
        );


    renderWaypoints();

    updateFlightSummary();

}


/* ============================================================
   RENDER WAYPOINTS
   ============================================================ */

function renderWaypoints() {

    const list =
        document.getElementById(
            "waypointList"
        );


    if (!list) {

        return;

    }


    list.innerHTML =
        "";


    currentFlight.waypoints
        .forEach(
            (waypoint, index) => {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "waypoint-row";


                row.innerHTML = `
                    <span>
                        ${index + 1}
                    </span>

                    <strong>
                        ${waypoint}
                    </strong>

                    <button
                        type="button"
                        onclick="removeWaypoint(${index})"
                    >
                        ×
                    </button>
                `;


                list.appendChild(
                    row
                );

            }
        );

}


/* ============================================================
   MAP
   ============================================================ */

function openMap() {

    updateMap();

    openPage("map");

}


/* ============================================================
   UPDATE MAP
   ============================================================ */

function updateMap() {

    const mapDistance =
        document.getElementById(
            "mapDistance"
        );


    const mapTime =
        document.getElementById(
            "mapTime"
        );


    const mapWaypointCount =
        document.getElementById(
            "mapWaypointCount"
        );


    const mapWaypoints =
        document.getElementById(
            "mapWaypoints"
        );


    const distance =
        calculateDistance();


    let minutes =
        0;


    if (
        distance > 0 &&
        currentFlight.cruiseSpeed > 0
    ) {

        minutes =
            Math.round(
                distance /
                currentFlight.cruiseSpeed *
                60
            );

    }


    if (mapDistance) {

        mapDistance.textContent =
            `${distance} NM`;

    }


    if (mapTime) {

        mapTime.textContent =
            formatTime(
                minutes
            );

    }


    if (mapWaypointCount) {

        mapWaypointCount.textContent =
            currentFlight.waypoints.length;

    }


    if (mapWaypoints) {

        mapWaypoints.innerHTML =
            "";


        currentFlight.waypoints
            .forEach(
                (waypoint, index) => {

                    const point =
                        document.createElement(
                            "div"
                        );


                    point.className =
                        "map-waypoint";


                    point.textContent =
                        waypoint;


                    point.style.left =
                        `${25 + (index * 12) % 50}%`;


                    point.style.top =
                        `${35 + (index * 9) % 35}%`;


                    mapWaypoints.appendChild(
                        point
                    );

                }
            );

    }


    /*
       Informations centrales affichées
       sur la carte.
    */

    const mapDeparture =
        document.getElementById(
            "mapDeparture"
        );


    const mapArrival =
        document.getElementById(
            "mapArrival"
        );


    const mapRoute =
        document.getElementById(
            "mapRoute"
        );


    if (mapDeparture) {

        mapDeparture.textContent =
            currentFlight.departure ||
            "----";

    }


    if (mapArrival) {

        mapArrival.textContent =
            currentFlight.arrival ||
            "----";

    }


    if (mapRoute) {

        mapRoute.textContent =
            currentFlight.route ||
            "----";

    }

}


/* ============================================================
   FLIGHT STATUS
   ============================================================ */

function updateStatusDisplay() {

    const status =
        document.getElementById(
            "flightStatus"
        );


    if (!status) {

        return;

    }


    status.textContent =
        currentFlight.status;


    status.className =
        "status " +
        currentFlight.status
            .toLowerCase();


    const centerStatus =
        document.getElementById(
            "flightCenterStatus"
        );


    if (centerStatus) {

        centerStatus.textContent =
            currentFlight.status;

    }

}


/* ============================================================
   ACTIVATE FLIGHT
   ============================================================ */

function activateFlight() {

    if (
        !currentFlight.departure ||
        !currentFlight.arrival
    ) {

        showModal(
            "FLIGHT INCOMPLETE",
            "ENTER A DEPARTURE AND ARRIVAL AIRPORT FIRST.",
            null
        );

        return;

    }


    showModal(
        "ACTIVATE FLIGHT",
        `ACTIVATE ${currentFlight.departure} → ${currentFlight.arrival} ?`,
        function() {

            currentFlight.status =
                "ACTIVE";


            updateStatusDisplay();

            updateFlightCenter();

            updateBriefing();

            saveCurrentFlightState();

        }
    );

}


/* ============================================================
   SAVE CURRENT FLIGHT
   ============================================================ */

function saveCurrentFlight() {

    if (
        !currentFlight.departure ||
        !currentFlight.arrival
    ) {

        showModal(
            "CANNOT SAVE",
            "ENTER DEPARTURE AND ARRIVAL FIRST.",
            null
        );

        return;

    }


    const saved =
        JSON.parse(
            localStorage.getItem(
                "efbSavedFlights"
            ) || "[]"
        );


    const flightToSave =
        JSON.parse(
            JSON.stringify(
                currentFlight
            )
        );


    if (
        !flightToSave.number
    ) {

        flightToSave.number =
            `${flightToSave.departure}-${flightToSave.arrival}`;

    }


    saved.push(
        flightToSave
    );


    localStorage.setItem(
        "efbSavedFlights",
        JSON.stringify(
            saved
        )
    );


    currentFlight.number =
        flightToSave.number;


    updateFlightFields();

    saveCurrentFlightState();


    showModal(
        "FLIGHT SAVED",
        `${flightToSave.number} HAS BEEN SAVED.`,
        null
    );

}
/* ============================================================
   FLIGHT SUMMARY
   ============================================================ */

function updateFlightSummary() {

    const ids = [
        "departure",
        "arrival",
        "aircraft",
        "departureRunway",
        "arrivalRunway",
        "sid",
        "route",
        "star",
        "approach",
        "cruiseAltitude",
        "cruiseSpeed",
        "fuel"
    ];

    ids.forEach(id => {

        const el =
            document.getElementById(id);

        if (!el) {
            return;
        }

        if (
            id === "departure" ||
            id === "arrival"
        ) {

            currentFlight[id] =
                el.value
                    .trim()
                    .toUpperCase();

        }

        else if (
            id === "cruiseAltitude" ||
            id === "cruiseSpeed" ||
            id === "fuel"
        ) {

            currentFlight[id] =
                Number(el.value) || 0;

        }

        else {

            currentFlight[id] =
                el.value;
        }

    });


    populateRunways();

    populateProcedures();


    const distance =
        calculateDistance();


    const summaryRoute =
        document.getElementById(
            "summaryRoute"
        );

    const totalDistance =
        document.getElementById(
            "totalDistance"
        );

    const waypointCount =
        document.getElementById(
            "waypointCount"
        );

    const estimatedTime =
        document.getElementById(
            "estimatedTime"
        );


    if (summaryRoute) {

        summaryRoute.textContent =
            currentFlight.departure &&
            currentFlight.arrival
                ? `${currentFlight.departure} → ${currentFlight.arrival}`
                : "----";

    }


    if (totalDistance) {

        totalDistance.textContent =
            `${distance} NM`;

    }


    if (waypointCount) {

        waypointCount.textContent =
            currentFlight.waypoints.length;

    }


    const minutes =
        distance &&
        currentFlight.cruiseSpeed
            ? Math.round(
                distance /
                currentFlight.cruiseSpeed *
                60
            )
            : 0;


    if (estimatedTime) {

        estimatedTime.textContent =
            formatTime(minutes);

    }


    updateStatusDisplay();

    saveCurrentFlightState();

}


/* ============================================================
   DISTANCE CALCULATION
   ============================================================ */

function calculateDistance() {

    const known = {

        "LFPO-KJFK": 3150,
        "KJFK-LFPO": 3150,

        "LFPG-KJFK": 3000,
        "KJFK-LFPG": 3000,

        "LFPO-LFPG": 18,
        "LFPG-LFPO": 18,

        "LFPO-LFLL": 205,
        "LFLL-LFPO": 205,

        "LFPO-LFML": 335,
        "LFML-LFPO": 335,

        "LFPO-LFBO": 295,
        "LFBO-LFPO": 295,

        "LFPO-LFMN": 370,
        "LFMN-LFPO": 370,

        "LFPG-EGLL": 190,
        "EGLL-LFPG": 190

    };


    if (
        !currentFlight.departure ||
        !currentFlight.arrival ||
        currentFlight.departure ===
            currentFlight.arrival
    ) {

        return 0;

    }


    return known[
        `${currentFlight.departure}-${currentFlight.arrival}`
    ] || 250;

}


/* ============================================================
   FORMAT TIME
   ============================================================ */

function formatTime(minutes) {

    return `${String(
        Math.floor(minutes / 60)
    ).padStart(2, "0")}:${String(
        minutes % 60
    ).padStart(2, "0")}`;

}


/* ============================================================
   AIRPORT / PROCEDURES
   ============================================================ */

function searchAirport(target) {

    airportSearchTarget =
        target;


    const input =
        document.getElementById(
            "airportSearchInput"
        );


    if (input) {

        input.value = "";

    }


    filterAirports();

    openPage("airport-search");

}


function filterAirports() {

    const input =
        document.getElementById(
            "airportSearchInput"
        );

    const results =
        document.getElementById(
            "airportResults"
        );


    if (!input || !results) {

        return;

    }


    const q =
        input.value
            .trim()
            .toLowerCase();


    results.innerHTML = "";


    Object.values(airports)

        .filter(
            airport => {

                return (
                    !q ||

                    airport.icao
                        .toLowerCase()
                        .includes(q) ||

                    airport.name
                        .toLowerCase()
                        .includes(q) ||

                    airport.city
                        .toLowerCase()
                        .includes(q)
                );

            }
        )

        .forEach(
            airport => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "airport-result";


                button.innerHTML = `
                    <strong>${airport.icao}</strong>
                    <span>
                        ${airport.name} - ${airport.city}
                    </span>
                `;


                button.onclick =
                    () => selectAirport(
                        airport.icao
                    );


                results.appendChild(
                    button
                );

            }
        );

}


/* ============================================================
   SELECT AIRPORT
   ============================================================ */

function selectAirport(icao) {

    if (
        !airportSearchTarget ||
        !airports[icao]
    ) {

        return;

    }


    const input =
        document.getElementById(
            airportSearchTarget
        );


    if (input) {

        input.value =
            icao;

    }


    currentFlight[
        airportSearchTarget
    ] = icao;


    populateRunways();

    populateProcedures();

    updateFlightSummary();

    saveCurrentFlightState();

    openPage("flightplan");

}


/* ============================================================
   AIRPORT INPUT
   ============================================================ */

function populateAirportOptions(id) {

    const element =
        document.getElementById(id);


    if (element) {

        element.value =
            currentFlight[id] || "";

    }

}


/* ============================================================
   RUNWAYS
   ============================================================ */

function populateRunways() {

    [
        "departureRunway",
        "arrivalRunway"
    ].forEach(
        id => {

            const element =
                document.getElementById(id);


            if (!element) {

                return;

            }


            const airport =
                airports[
                    id === "departureRunway"
                        ? currentFlight.departure
                        : currentFlight.arrival
                ];


            const oldValue =
                element.value;


            element.innerHTML =
                `<option value="">SELECT</option>`;


            if (airport) {

                airport.runways.forEach(
                    runway => {

                        const option =
                            document.createElement(
                                "option"
                            );


                        option.value =
                            runway;


                        option.textContent =
                            runway;


                        element.appendChild(
                            option
                        );

                    }
                );

            }


            element.value =
                currentFlight[id] ||
                oldValue ||
                "";

        }
    );

}


/* ============================================================
   SID / STAR / APPROACH
   ============================================================ */

function populateProcedures() {

    const sid =
        document.getElementById(
            "sid"
        );

    const star =
        document.getElementById(
            "star"
        );

    const approach =
        document.getElementById(
            "approach"
        );


    if (sid) {

        const airport =
            airports[
                currentFlight.departure
            ];


        sid.innerHTML =
            `<option value="">SELECT SID</option>`;


        if (airport) {

            airport.sids.forEach(
                procedure => {

                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        procedure;


                    option.textContent =
                        procedure;


                    sid.appendChild(
                        option
                    );

                }
            );

        }


        sid.value =
            currentFlight.sid || "";

    }


    if (star) {

        const airport =
            airports[
                currentFlight.arrival
            ];


        star.innerHTML =
            `<option value="">SELECT STAR</option>`;


        if (airport) {

            airport.stars.forEach(
                procedure => {

                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        procedure;


                    option.textContent =
                        procedure;


                    star.appendChild(
                        option
                    );

                }
            );

        }


        star.value =
            currentFlight.star || "";

    }


    if (approach) {

        const oldValue =
            currentFlight.approach || "";


        if (
            approach.tagName ===
                "SELECT" &&
            airports[
                currentFlight.arrival
            ]
        ) {

            approach.innerHTML =
                `<option value="">SELECT APPROACH</option>`;


            airports[
                currentFlight.arrival
            ].approaches.forEach(
                procedure => {

                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        procedure;


                    option.textContent =
                        procedure;


                    approach.appendChild(
                        option
                    );

                }
            );

        }


        approach.value =
            oldValue;

    }

}


/* ============================================================
   WAYPOINTS / ROUTE
   ============================================================ */

function addWaypoint() {

    const waypoint =
        prompt(
            "ENTER WAYPOINT ICAO / NAME"
        );


    if (!waypoint) {

        return;

    }


    currentFlight.waypoints.push(
        waypoint
            .trim()
            .toUpperCase()
    );


    syncRouteFromWaypoints();

    renderWaypoints();

    updateFlightSummary();

}


function removeWaypoint(index) {

    if (
        index < 0 ||
        index >=
            currentFlight.waypoints.length
    ) {

        return;

    }


    currentFlight.waypoints.splice(
        index,
        1
    );


    syncRouteFromWaypoints();

    renderWaypoints();

    updateFlightSummary();

}


function syncRouteFromWaypoints() {

    const route =
        document.getElementById(
            "route"
        );


    if (route) {

        route.value =
            currentFlight.waypoints.join(
                " "
            );

    }


    currentFlight.route =
        currentFlight.waypoints.join(
            " "
        );

}


function renderWaypoints() {

    const list =
        document.getElementById(
            "waypointList"
        );


    if (!list) {

        return;

    }


    list.innerHTML = "";


    currentFlight.waypoints.forEach(
        (waypoint, index) => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "waypoint-row";


            row.innerHTML = `
                <span>${index + 1}</span>
                <strong>${waypoint}</strong>

                <button
                    type="button"
                    onclick="removeWaypoint(${index})"
                >
                    ×
                </button>
            `;


            list.appendChild(
                row
            );

        }
    );

}
}