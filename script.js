const translations = {
    en: {
        bio: "Open Source Developer, Sound Designer & Teacher",
        description: "Building sustainable tools & creating sounds.",
        
        musicTitles: "Music & Art",
        homologoTitle: "HOMOLOGO",
        homologoDesc: "Songwriter, Pop, Electronic",
        fadeTitle: "FADE",
        fadeDesc: "Electronic",
        zimaTitle: "ZIMA BLUE",
        zimaDesc: "Ambient, Experimental",
        audiusTitle: "AUDIUS",
        audiusDesc: "All my music on Audius",
        
        appsTitle: "Apps & Services",
        keepTitle: "ZEN KEEP",
        keepDesc: "End-to-end encrypted vault",
        notesTitle: "ZEN NOTES",
        notesDesc: "Decentralized thoughts & notes",
        bookmarksTitle: "ZEN BOOKMARKS",
        bookmarksDesc: "Decentralized bookmark manager",
        tunecampTitle: "TUNECAMP",
        tunecampDesc: "Decentralized Music Streaming",
        lindaTitle: "LINDA",
        lindaDesc: "Encrypted P2P chat",
        wormholeTitle: "WORMHOLE",
        wormholeDesc: "Secure file transfer",
        
        devTitle: "Dev Tools",
        relayTitle: "DELAY",
        relayDesc: "Network node server",
        contractsTitle: "SMART CONTRACTS",
        contractsDesc: "Solidity infrastructure",
        
        blogTitle: "Blog",
        blogNotesTitle: "NOTES.md",
        blogNotesDesc: "My thoughts",
        blogBookmarksTitle: "BOOKMARKS.md",
        blogBookmarksDesc: "Decentralized bookmarks",
        
        readArticle: "Read article"
    },
    it: {
        bio: "Sviluppatore Open Source, Sound Designer e Insegnante",
        description: "Sviluppo strumenti sostenibili e creo suoni.",
        
        musicTitles: "Musica e Arte",
        homologoTitle: "HOMOLOGO",
        homologoDesc: "Cantautore, Pop, Elettronica",
        fadeTitle: "FADE",
        fadeDesc: "Elettronica",
        zimaTitle: "ZIMA BLUE",
        zimaDesc: "Ambient, Sperimentale",
        audiusTitle: "AUDIUS",
        audiusDesc: "Tutta la mia musica su Audius",
        
        appsTitle: "App e Servizi",
        keepTitle: "ZEN KEEP",
        keepDesc: "Vault crittografato end-to-end",
        notesTitle: "ZEN NOTES",
        notesDesc: "Note e pensieri decentralizzati",
        bookmarksTitle: "ZEN BOOKMARKS",
        bookmarksDesc: "Gestore di segnalibri decentralizzato",
        tunecampTitle: "TUNECAMP",
        tunecampDesc: "Streaming musicale decentralizzato",
        lindaTitle: "LINDA",
        lindaDesc: "Chat crittografata P2P",
        wormholeTitle: "WORMHOLE",
        wormholeDesc: "Trasferimento file sicuro",
        
        devTitle: "Strumenti per Sviluppatori",
        relayTitle: "DELAY",
        relayDesc: "Server nodo di rete",
        contractsTitle: "SMART CONTRACTS",
        contractsDesc: "Infrastruttura Solidity",
        
        blogTitle: "Blog",
        blogNotesTitle: "NOTES.md",
        blogNotesDesc: "I miei pensieri",
        blogBookmarksTitle: "BOOKMARKS.md",
        blogBookmarksDesc: "Segnalibri decentralizzati",
        
        readArticle: "Leggi l'articolo"
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
        'apps/keep.html': {
            desc: "End-to-end encrypted personal vault to store credentials and keys securely.",
            bullets: ["Zero-knowledge encryption", "Self-hosted storage options", "Offline first design"]
        },
        'apps/notes.html': {
            desc: "Decentralized notes manager designed to keep your thoughts private and synced.",
            bullets: ["P2P synchronization", "Markdown editor", "Encrypted storage"]
        },
        'mini_apps/bookmarks.html': {
            desc: "Decentralized bookmark manager for your favorite web resources.",
            bullets: ["Private bookmarking", "Tag organization", "Easy search and export"]
        },
        'mini_apps/notes.html': {
            desc: "Simple and lightweight markdown notes application.",
            bullets: ["Clean reading view", "Quick search", "Local export"]
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
        'https://github.com/scobru/shogun-relay': {
            desc: "Unified Connection Hub for P2P graph sync and storage.",
            bullets: ["WebSocket backbone", "IPFS Gateway", "SQLite persistence"]
        },
        'https://github.com/scobru/shogun-contracts': {
            desc: "Core smart contracts powering the ecosystem.",
            bullets: ["Solidity based", "Security audited", "Gas optimized"]
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
        'apps/keep.html': {
            desc: "Vault personale crittografato end-to-end per memorizzare credenziali e chiavi in sicurezza.",
            bullets: ["Crittografia a conoscenza zero", "Opzioni di archiviazione autonoma", "Design offline first"]
        },
        'apps/notes.html': {
            desc: "Gestore di note decentralizzato progettato per mantenere i tuoi pensieri privati e sincronizzati.",
            bullets: ["Sincronizzazione P2P", "Editor Markdown", "Archiviazione crittografata"]
        },
        'mini_apps/bookmarks.html': {
            desc: "Gestore di segnalibri decentralizzato per le tue risorse web preferite.",
            bullets: ["Segnalibri privati", "Organizzazione con tag", "Ricerca ed esportazione facili"]
        },
        'mini_apps/notes.html': {
            desc: "Applicazione di note in markdown semplice e leggera.",
            bullets: ["Vista di lettura pulita", "Ricerca rapida", "Esportazione locale"]
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
        'https://github.com/scobru/shogun-relay': {
            desc: "Hub di connessione unificato per sync del grafo e storage.",
            bullets: ["Backbone WebSocket", "Gateway IPFS", "Persistenza SQLite"]
        },
        'https://github.com/scobru/shogun-contracts': {
            desc: "Smart contracts core che alimentano l'ecosistema.",
            bullets: ["Basati su Solidity", "Verificati per sicurezza", "Ottimizzati per il gas"]
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
