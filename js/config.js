// Protezione contro doppio caricamento
if (typeof window.ORTENSIA_CONFIG_LOADED === 'undefined') {
    window.ORTENSIA_CONFIG_LOADED = true;

    // ===================================
    // CONFIGURAZIONE SUPABASE
    // ===================================

    const SUPABASE_CONFIG = {
        url: 'https://uvpntnqolpuodftjefzk.supabase.co',
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2cG50bnFvbHB1b2RmdGplZnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0NDQ0MDMsImV4cCI6MjA2ODAyMDQwM30.27S9Po4wTjtRk_0Ixm55_g7U0xOIyK_hlErWLQehXg4',
        serviceKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2cG50bnFvbHB1b2RmdGplZnprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjQ0NDQwMywiZXhwIjoyMDY4MDIwNDAzfQ.KdFxkObsUhUxWKX5ElGLuZ5Vbifl1xf4_6DYlVIcgdM'
    };

    // ===================================
    // CONFIGURAZIONE GENERALE SITO
    // ===================================

    const SITE_CONFIG = {
        name: 'Ortensia Group',
        adminEmail: 'admin@ortensiagroup.net',
        description: 'Giardinaggio professionale da oltre 25 anni',
        url: 'https://www.ortensiagroup.net',
        email: 'info@ortensiagroup.net',
        phone: '02 43416807',
        mobile: '347 6764038',
        address: 'Via Fanfulla da Lodi 5, 20090 Trezzano sul Naviglio (MI)',
        
        seo: {
            defaultTitle: 'Ortensia Group - Giardinaggio Professionale Milano',
            defaultDescription: 'Servizi di giardinaggio, potatura, impianti irrigazione e disboscamento. Da oltre 25 anni a Milano e provincia.',
            defaultKeywords: 'giardinaggio, potatura, irrigazione, disboscamento, milano, giardini',
            author: 'Ortensia Group',
            robots: 'index, follow'
        },
        
        social: {
            facebook: 'https://facebook.com/ortensiagroup',
            instagram: 'https://instagram.com/ortensiagroup',
            linkedin: 'https://linkedin.com/company/ortensiagroup'
        }
    };

    // ===================================
    // CONFIGURAZIONE BLOG
    // ===================================

    const BLOG_CONFIG = {
        articlesPerPage: 6,
        categories: [
            'Consigli Giardinaggio',
            'Stagionalità',
            'Piante e Fiori',
            'Manutenzione',
            'Irrigazione'
        ],
        defaultCategory: 'Consigli Giardinaggio',
        enableComments: false,
        enableSharing: true
    };

    // ===================================
    // CONFIGURAZIONE PORTFOLIO
    // ===================================

    const PORTFOLIO_CONFIG = {
        projectsPerPage: 9,
        categories: [
            'Giardini Privati',
            'Spazi Commerciali',
            'Impianti Irrigazione',
            'Potatura e Cura',
            'Disboscamento'
        ],
        defaultCategory: 'Tutti',
        enableFilters: true,
        enableSearch: true,
        imageFormats: ['jpg', 'jpeg', 'png', 'webp'],
        maxImageSize: 2048000
    };

    // ===================================
    // CONFIGURAZIONE FORM CONTATTI
    // ===================================

    const CONTACT_CONFIG = {
        validationRules: {
            name: { required: true, minLength: 2, maxLength: 50 },
            email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            phone: { required: false, pattern: /^[\d\s\-\+\(\)]+$/ },
            message: { required: true, minLength: 10, maxLength: 1000 }
        }
    };

    // ===================================
    // CONFIGURAZIONE GOOGLE ANALYTICS
    // ===================================

    const GA_CONFIG = {
        measurementId: 'G-XXXXXXXXXX',
        cookieConsent: false
    };

    // ===================================
    // CONFIGURAZIONE PRIVACY
    // ===================================

    const PRIVACY_CONFIG = {
        cookieConsent: {
            enabled: true,
            categories: {
                necessary: {
                    enabled: true,
                    readonly: true,
                    title: 'Cookie Necessari',
                    description: 'Essenziali per il funzionamento del sito'
                },
                analytics: {
                    enabled: false,
                    readonly: false,
                    title: 'Cookie Analitici',
                    description: 'Ci aiutano a migliorare il sito'
                },
                marketing: {
                    enabled: false,
                    readonly: false,
                    title: 'Cookie Marketing',
                    description: 'Personalizzano i contenuti'
                }
            }
        },
        gdprCompliance: true,
        privacyPolicyUrl: '/privacy.html',
        cookiePolicyUrl: '/cookie.html'
    };

    // ===================================
    // UTILITY FUNCTIONS
    // ===================================

    function validateConfig() {
        const required = ['url', 'anonKey'];
        for (const key of required) {
            if (!SUPABASE_CONFIG[key]) {
                console.warn(`⚠️ Configurazione mancante: ${key}`);
                return false;
            }
        }
        return true;
    }

    function initAnalytics() {
        if (GA_CONFIG.measurementId && GA_CONFIG.measurementId !== 'G-XXXXXXXXXX') {
            if (typeof gtag !== 'undefined') {
                gtag('config', GA_CONFIG.measurementId, {
                    anonymize_ip: true,
                    cookie_consent: GA_CONFIG.cookieConsent
                });
            }
        }
    }

    function initializeSupabase() {
        if (typeof supabase !== 'undefined' && supabase.createClient) {
            return supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        } else {
            console.error('Supabase library not loaded');
            return null;
        }
    }

    // ===================================
    // EXPORT GLOBALI
    // ===================================

    window.CONFIG = {
        SUPABASE: SUPABASE_CONFIG,
        SITE: SITE_CONFIG,
        BLOG: BLOG_CONFIG,
        PORTFOLIO: PORTFOLIO_CONFIG,
        CONTACT: CONTACT_CONFIG,
        PRIVACY: PRIVACY_CONFIG,
        GA: GA_CONFIG
    };

    window.validateConfig = validateConfig;
    window.initAnalytics = initAnalytics;
    window.initializeSupabase = initializeSupabase;

    // Inizializzazione automatica
    if (typeof window !== 'undefined') {
        document.addEventListener('DOMContentLoaded', function() {
            if (validateConfig()) {
                console.log('✅ Configurazione valida');
                initAnalytics();
            } else {
                console.error('❌ Configurazione non valida');
            }
        });
    }

    console.log('✅ Config loaded successfully');
}
