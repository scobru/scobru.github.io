const translations = {
    en: {
        bio: "Open Source Developer, Sound Designer & Teacher",
        description: "Building sustainable tools & creating sounds.",
        musicTitles: "Music & Art",
        musicDesc: "Music, Art, and other creative projects.",
        homologoTitle: "HOMOLOGO on Bandcamp",
        homologoDesc: "Songwriter, Pop, Electronic",
        fadeTitle: "FADE on Bandcamp",
        fadeDesc: "Electronic",
        zimaTitle: "ZIMA BLUE on Bandcamp",
        zimaDesc: "Ambient, Experimental",
        audiusDesc: "All my music on Audius",
        spotifyDesc: "All my music on Spotify",
        youtubeDesc: "Music for Fashion and ADV",
        selfHostTitle: "Self Hosted",
        selfHostDesc: "Self-hosted projects and services.",
        sudoDesc: "Independent record label based on an instance of TUNECAMP",
        appsTitle: "Apps & Services",
        appsDesc: "Core tools for identity, transfer, and digital assets.",
        tunecampDesc: "Decentralized Music Streaming Platform",
        shogunEcoDesc: "Decentralized ecosystem",
        authDesc: "Decentralized authentication",
        lindaDesc: "Encrypted P2P chat protocol",
        wormholeDesc: "Secure file transfer",
        spaceDesc: "Decentralized hub",
        scanDesc: "Network monitor",
        devTitle: "Dev Tools",
        devDesc: "Libraries, SDK, contracts and infrastructure for developers.",
        coreDesc: "SDK, auth & storage",
        relayDesc: "Network node server",
        contractsDesc: "Smart contracts",
        ccDesc: "CC or Continue Communication is a terminal-based peer-to-peer encrypted chat application.",
        ipfsDesc: "Storage wrapper",
        buttonDesc: "Auth components",
        starterDesc: "TypeScript/React template",
        cliDesc: "Command-line utilities"
    },
    it: {
        bio: "Sviluppatore Open Source, Sound Designer e Insegnante",
        description: "Sviluppo strumenti sostenibili e creo suoni.",
        musicTitles: "Musica e Arte",
        musicDesc: "Musica, arte e altri progetti creativi.",
        homologoTitle: "HOMOLOGO su Bandcamp",
        homologoDesc: "Cantautore, Pop, Elettronica",
        fadeTitle: "FADE su Bandcamp",
        fadeDesc: "Elettronica",
        zimaTitle: "ZIMA BLUE su Bandcamp",
        zimaDesc: "Ambient, Sperimentale",
        audiusDesc: "Tutta la mia musica su Audius",
        spotifyDesc: "Tutta la mia musica su Spotify",
        youtubeDesc: "Musica per Moda e ADV",
        selfHostTitle: "Self Hosted",
        selfHostDesc: "Progetti e servizi ospitati in proprio.",
        sudoDesc: "Etichetta discografica indipendente basata su un'istanza di TUNECAMP",
        appsTitle: "App e Servizi",
        appsDesc: "Strumenti core per identità, trasferimenti e asset digitali.",
        tunecampDesc: "Piattaforma di streaming musicale decentralizzata",
        shogunEcoDesc: "Ecosistema decentralizzato",
        authDesc: "Autenticazione decentralizzata",
        lindaDesc: "Protocollo di chat P2P crittografato",
        wormholeDesc: "Trasferimento file sicuro",
        spaceDesc: "Hub decentralizzato",
        scanDesc: "Monitor di rete",
        devTitle: "Strumenti per Sviluppatori",
        devDesc: "Librerie, SDK, contratti e infrastruttura per sviluppatori.",
        coreDesc: "SDK, auth e archiviazione",
        relayDesc: "Server nodo di rete",
        contractsDesc: "Smart contracts",
        ccDesc: "CC o Continue Communication è un'applicazione di chat crittografata peer-to-peer basata su terminale.",
        ipfsDesc: "Wrapper di archiviazione",
        buttonDesc: "Componenti di auth",
        starterDesc: "Template TypeScript/React",
        cliDesc: "Strumenti a riga di comando"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Theme setup
    const themeBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        root.setAttribute('data-theme', 'light');
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeBtn.addEventListener('click', () => {
        const isLight = root.getAttribute('data-theme') === 'light';
        if (isLight) {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Language setup
    const langBtn = document.getElementById('lang-toggle');
    const currentLang = localStorage.getItem('lang') || 'en';
    let lang = currentLang;

    const translateElements = document.querySelectorAll('[data-i18n]');

    const updateLanguage = () => {
        translateElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        langBtn.textContent = lang === 'en' ? 'IT' : 'EN';
    };

    updateLanguage();

    langBtn.addEventListener('click', () => {
        lang = lang === 'en' ? 'it' : 'en';
        localStorage.setItem('lang', lang);
        updateLanguage();
    });
});
