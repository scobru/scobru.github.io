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
        cliDesc: "Command-line utilities",
        blogTitle: "Blog",
        postTitle: "What do I actually do? Between Music, Code, and Teaching",
        readArticle: "Read article",
        postContent: "Hi! If you landed here, you might be wondering what I do with all these projects. Simply put: I combine creativity and technology.\n\nAs an Open Source Developer, I focus on building decentralized and secure tools. Projects like LINDA (encrypted chat) or WORMHOLE (secure file transfer) are born from the desire to give people control over their data.\n\nMusic is my other great passion. I create soundscapes and electronic tracks under various names like HOMOLOGO, FADE, and ZIMA BLUE.\n\nFinally, I love teaching. Sharing what I learn is key to growing the community.\n\nEverything on this page is the result of this journey: a bridge between bits and sounds."
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
        cliDesc: "Strumenti a riga di comando",
        blogTitle: "Blog",
        postTitle: "Cosa faccio davvero? Tra Musica, Codice e Insegnamento",
        readArticle: "Leggi l'articolo",
        postContent: "Ciao! Se sei arrivato qui, probabilmente ti starai chiedendo cosa faccio con tutti questi progetti. In poche parole: unisco creatività e tecnologia.\n\nCome Sviluppatore Open Source, mi concentro sulla creazione di strumenti decentralizzati e sicuri. Progetti come LINDA (una chat crittografata) o WORMHOLE (per inviare file in sicurezza) nascono dalla voglia di dare alle persone il controllo sui propri dati.\n\nLa Musica è l'altra mia grande passione. Creo paesaggi sonori e brani elettronici sotto vari nomi come HOMOLOGO, FADE e ZIMA BLUE.\n\nInfine, mi piace insegnare. Condividere quello che imparo è fondamentale per far crescere la community.\n\nTutto quello che trovi in questa pagina è frutto di questa ricerca: un ponte tra bit e suoni."
    }
};

const projectDetails = {
    en: {
        'https://homologomusic.bandcamp.com': {
            desc: "Songwriter, Pop, and Electronic music project.",
            bullets: ["Direct artist support", "Exclusive releases", "High-quality downloads"]
        },
        'https://fademusik.bandcamp.com': {
            desc: "Electronic music project focusing on beats and atmospheric soundscapes.",
            bullets: ["Electronic explorations", "Beat-driven tracks", "Available for licensing"]
        },
        'https://zimablue.bandcamp.com': {
            desc: "Ambient and experimental sound design project.",
            bullets: ["Atmospheric textures", "Deep listening experiences", "Sound art"]
        },
        'https://audius.co/francescobruno': {
            desc: "Stream all music tracks on the decentralized Audius network.",
            bullets: ["Web3 streaming", "Free access", "No intermediaries"]
        },
        'https://open.spotify.com/playlist/7n27JWYA8ZstzRVkQa6Jo7?si=b460e0078bfd42ac': {
            desc: "Curated playlist of all released tracks.",
            bullets: ["Official discography", "Regular updates", "High-fidelity streaming"]
        },
        'https://www.youtube.com/@scobru1988/videos': {
            desc: "Visual art, music videos, and commercial scores.",
            bullets: ["Fashion soundtracks", "Visual collaborations", "Behind the scenes"]
        },
        'https://sudorecords.scobrudot.dev/': {
            desc: "Independent record label hosted on a private instance.",
            bullets: ["Self-hosted infrastructure", "Independent distribution", "Privacy-focused"]
        },
        'https://scobru-tunecamp.vercel.app/': {
            desc: "Decentralized alternative to music streaming.",
            bullets: ["Subsonic compatibility", "Federated Music model", "Artist direct monetization"]
        },
        'https://scobru-linda.vercel.app/': {
            desc: "Primary messaging application of the ecosystem.",
            bullets: ["End-to-end encryption", "P2P architecture", "Post-Quantum resistance"]
        },
        'https://scobru-wormhole.vercel.app/': {
            desc: "Secure, asynchronous P2P file-sharing utility.",
            bullets: ["Encrypted transfers", "64KB chunk sharding", "Automatic cleanup"]
        },
        'https://scobru-nullroute.vercel.app/': {
            desc: "Premium payment dashboard for absolute privacy.",
            bullets: ["Stealth Addresses", "Ethereum-based", "Zero-link tracking"]
        },
        'https://github.com/scobru/shogun-relay': {
            desc: "Unified Connection Hub for P2P graph sync and storage.",
            bullets: ["WebSocket backbone", "IPFS Gateway", "SQLite persistence"]
        },
        'https://shogun-relay.scobrudot.dev': {
            desc: "Public node infrastructure for the Shogun network.",
            bullets: ["24/7 Availability", "Open access", "High performance"]
        },
        'https://github.com/scobru/shogun-contracts': {
            desc: "Core smart contracts powering the ecosystem.",
            bullets: ["Solidity based", "Security audited", "Gas optimized"]
        },
        'https://github.com/scobru/shogun-ipfs': {
            desc: "Storage wrapper and pinning utility.",
            bullets: ["IPFS integration", "Easy API", "Automated pinning"]
        }
    },
    it: {
        'https://homologomusic.bandcamp.com': {
            desc: "Progetto musicale Cantautore, Pop, Elettronica.",
            bullets: ["Supporto diretto all'artista", "Uscite esclusive", "Download in alta qualità"]
        },
        'https://fademusik.bandcamp.com': {
            desc: "Progetto di musica elettronica focalizzato su beat e paesaggi sonori.",
            bullets: ["Esplorazioni elettroniche", "Tracce basate su beat", "Disponibile per licensing"]
        },
        'https://zimablue.bandcamp.com': {
            desc: "Progetto di ambient e sound design sperimentale.",
            bullets: ["Texture atmosferiche", "Esperienze di ascolto profondo", "Arte sonora"]
        },
        'https://audius.co/francescobruno': {
            desc: "Ascolta tutti i brani sulla rete decentralizzata Audius.",
            bullets: ["Streaming Web3", "Accesso gratuito", "Senza intermediari"]
        },
        'https://open.spotify.com/playlist/7n27JWYA8ZstzRVkQa6Jo7?si=b460e0078bfd42ac': {
            desc: "Playlist curata con tutti i brani rilasciati.",
            bullets: ["Discografia ufficiale", "Aggiornamenti regolari", "Streaming in alta fedeltà"]
        },
        'https://www.youtube.com/@scobru1988/videos': {
            desc: "Arte visiva, video musicali e colonne sonore commerciali.",
            bullets: ["Colonne sonore per moda", "Collaborazioni visive", "Dietro le quinte"]
        },
        'https://sudorecords.scobrudot.dev/': {
            desc: "Etichetta discografica indipendente ospitata su istanza privata.",
            bullets: ["Infrastruttura self-hosted", "Distribuzione indipendente", "Orientata alla privacy"]
        },
        'https://scobru-tunecamp.vercel.app/': {
            desc: "Alternativa decentralizzata allo streaming musicale.",
            bullets: ["Compatibilità Subsonic", "Modello Federated Music", "Monetizzazione diretta"]
        },
        'https://scobru-linda.vercel.app/': {
            desc: "Applicazione di messaggistica principale dell'ecosistema.",
            bullets: ["Crittografia end-to-end", "Architettura P2P", "Resistenza Post-Quantum"]
        },
        'https://scobru-wormhole.vercel.app/': {
            desc: "Utility per la condivisione sicura e asincrona di file P2P.",
            bullets: ["Trasferimenti crittografati", "Sharding in chunk da 64KB", "Pulizia automatica"]
        },
        'https://scobru-nullroute.vercel.app/': {
            desc: "Dashboard di pagamento premium per la massima privacy.",
            bullets: ["Stealth Addresses", "Basato su Ethereum", "Nessun tracciamento"]
        },
        'https://github.com/scobru/shogun-relay': {
            desc: "Hub di connessione unificato per sync del grafo e storage.",
            bullets: ["Backbone WebSocket", "Gateway IPFS", "Persistenza SQLite"]
        },
        'https://shogun-relay.scobrudot.dev': {
            desc: "Infrastruttura di nodo pubblico per la rete Shogun.",
            bullets: ["Disponibilità 24/7", "Accesso aperto", "Alte prestazioni"]
        },
        'https://github.com/scobru/shogun-contracts': {
            desc: "Smart contracts core che alimentano l'ecosistema.",
            bullets: ["Basati su Solidity", "Verificati per sicurezza", "Ottimizzati per il gas"]
        },
        'https://github.com/scobru/shogun-ipfs': {
            desc: "Wrapper di archiviazione e utility di pinning.",
            bullets: ["Integrazione IPFS", "API semplice", "Pinning automatizzato"]
        }
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
        
        // Remove existing dropdowns on language change to force regeneration
        document.querySelectorAll('.dropdown-content').forEach(d => d.remove());
    };

    updateLanguage();

    langBtn.addEventListener('click', () => {
        lang = lang === 'en' ? 'it' : 'en';
        localStorage.setItem('lang', lang);
        updateLanguage();
    });

    // Dropdown Logic
    const cards = document.querySelectorAll('.link-card');
    cards.forEach(card => {
        const href = card.getAttribute('href');
        if (!projectDetails.en[href]) return;

        card.addEventListener('click', (e) => {
            if (e.target.closest('.visit-btn')) return;

            e.preventDefault();

            let dropdown = card.nextElementSibling;
            if (dropdown && dropdown.classList.contains('dropdown-content')) {
                dropdown.classList.toggle('is-open');
                return;
            }

            dropdown = document.createElement('div');
            dropdown.classList.add('dropdown-content');

            const data = projectDetails[lang][href];
            let bulletsHtml = '';
            if (data.bullets) {
                bulletsHtml = `<ul>${data.bullets.map(b => `<li><i class="fas fa-check"></i> ${b}</li>`).join('')}</ul>`;
            }

            const visitText = lang === 'en' ? 'Visit Site' : 'Visita il Sito';

            dropdown.innerHTML = `
                <div class="dropdown-inner">
                    <p>${data.desc}</p>
                    ${bulletsHtml}
                    <a href="${href}" target="_blank" class="visit-btn">${visitText} <i class="fas fa-arrow-right"></i></a>
                </div>
            `;

            // Close others
            document.querySelectorAll('.dropdown-content.is-open').forEach(openDropdown => {
                if (openDropdown !== dropdown) {
                    openDropdown.classList.remove('is-open');
                }
            });

            card.parentNode.insertBefore(dropdown, card.nextSibling);
            
            // Force reflow
            dropdown.offsetHeight;
            dropdown.classList.add('is-open');
        });
    });
});
