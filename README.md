<!doctype html>
<html lang="it" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>README - Ortensia Group</title>
    <style>
      body {
        max-width: 880px;
        margin: 0 auto;
        padding: 32px 80px;
        position: relative;
        box-sizing: border-box;
        font-family: 'Times New Roman', serif;
        line-height: 1.6;
        color: #000;
        background: #fff;
      }

      h1 {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 32px;
        border-bottom: 2px solid #000;
        padding-bottom: 8px;
      }

      h2 {
        font-size: 18px;
        font-weight: bold;
        margin-top: 32px;
        margin-bottom: 16px;
        color: #000;
      }

      h3 {
        font-size: 16px;
        font-weight: bold;
        margin-top: 24px;
        margin-bottom: 12px;
        color: #000;
      }

      p {
        margin-bottom: 12px;
        text-align: justify;
      }

      ul,
      ol {
        margin-bottom: 16px;
        padding-left: 32px;
      }

      li {
        margin-bottom: 8px;
      }

      code {
        font-family: 'Courier New', monospace;
        font-size: 14px;
        background-color: #f5f5f5;
        padding: 2px 4px;
        border: 1px solid #ddd;
      }

      pre {
        font-family: 'Courier New', monospace;
        font-size: 12px;
        background-color: #f5f5f5;
        padding: 12px;
        border: 1px solid #ddd;
        margin: 16px 0;
        white-space: pre-wrap;
      }

      .file-tree {
        font-family: 'Courier New', monospace;
        font-size: 14px;
        background-color: #f8f8f8;
        padding: 16px;
        border: 1px solid #ccc;
        margin: 16px 0;
      }

      .important {
        background-color: #ffffcc;
        border: 1px solid #ffcc00;
        padding: 8px;
        margin: 16px 0;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
      }

      th,
      td {
        border: 1px solid #000;
        padding: 8px;
        text-align: left;
      }

      th {
        background-color: #f0f0f0;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <h1>ORTENSIA GROUP - DOCUMENTAZIONE COMPLETA</h1>

    <h2>1. INTRODUZIONE</h2>
    <p>
      Questo documento fornisce tutte le informazioni necessarie per il setup, la configurazione e il deployment del
      sito web Ortensia Group. Il sito è stato sviluppato utilizzando tecnologie moderne e include un sistema di
      gestione completo per blog, portfolio lavori e funzionalità amministrative.
    </p>

    <h2>2. STRUTTURA DEL PROGETTO</h2>
    <p>Il progetto è organizzato secondo la seguente struttura:</p>

    <div class="file-tree">
      ortensia_group_completo/ ├── index.html # Homepage principale ├── blog.html # Pagina blog con lista articoli ├──
      lavori.html # Portfolio completo lavori ├── articolo.html # Template singolo articolo ├── privacy.html # Privacy
      Policy ├── cookie.html # Cookie Policy ├── database_setup.sql # Query SQL per setup database ├── README.md #
      Questa documentazione │ ├── css/ │ └── styles.css # Stili CSS principali │ ├── js/ │ └── scripts.js # JavaScript
      funzionalità │ └── admin/ ├── login.html # Login amministratore └── dashboard.html # Dashboard gestione contenuti
    </div>

    <h2>3. TECNOLOGIE UTILIZZATE</h2>
    <h3>3.1 Frontend</h3>
    <ul>
      <li>HTML5 semantico per struttura</li>
      <li>CSS3 moderno con Flexbox e Grid</li>
      <li>JavaScript vanilla per interattività</li>
      <li>Tailwind CSS per utility styling</li>
      <li>Font Awesome per iconografia</li>
      <li>Google Fonts (Poppins) per tipografia</li>
    </ul>

    <h3>3.2 Backend</h3>
    <ul>
      <li>Supabase come Backend-as-a-Service</li>
      <li>PostgreSQL come database</li>
      <li>Storage Supabase per gestione immagini</li>
      <li>API REST per comunicazione dati</li>
      <li>Autenticazione JWT integrata</li>
    </ul>

    <h3>3.3 Hosting e Deploy</h3>
    <ul>
      <li>Netlify per hosting frontend</li>
      <li>Supabase per backend e database</li>
      <li>CDN automatico per performance</li>
      <li>SSL certificato incluso</li>
    </ul>

    <h2>4. SETUP SUPABASE</h2>
    <h3>4.1 Creazione Progetto</h3>
    <ol>
      <li>Visita <code>https://supabase.com</code> e crea un account</li>
      <li>Clicca su "New Project" e compila i dettagli</li>
      <li>Seleziona la regione più vicina (Europe West per l'Italia)</li>
      <li>Attendi la creazione del progetto (2-3 minuti)</li>
    </ol>

    <h3>4.2 Configurazione Database</h3>
    <ol>
      <li>Accedi al progetto Supabase</li>
      <li>Vai su "Table Editor" nel menu laterale</li>
      <li>Clicca su "SQL Editor"</li>
      <li>Esegui il file <code>database_setup.sql</code> incluso nel progetto</li>
      <li>Verifica che tutte le tabelle siano state create correttamente</li>
    </ol>

    <h3>4.3 Configurazione Politiche RLS</h3>
    <p>Il Row Level Security (RLS) garantisce la sicurezza dei dati. Esegui le seguenti query:</p>

    <pre>
-- Abilita RLS per tutte le tabelle
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Politiche lettura pubblica per contenuti pubblicati
CREATE POLICY "Public read published articles" ON articles 
FOR SELECT USING (status = 'published');

CREATE POLICY "Public read published projects" ON projects 
FOR SELECT USING (status = 'published');

-- Accesso completo per admin autenticati
CREATE POLICY "Admin full access articles" ON articles 
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access projects" ON projects 
FOR ALL USING (auth.role() = 'authenticated');
    </pre>

    <h3>4.4 Configurazione Storage</h3>
    <ol>
      <li>Vai su "Storage" nel menu Supabase</li>
      <li>Crea un bucket chiamato "images"</li>
      <li>
        Imposta le politiche di accesso:
        <ul>
          <li>Lettura pubblica per tutti</li>
          <li>Scrittura solo per utenti autenticati</li>
        </ul>
      </li>
    </ol>

    <h2>5. CONFIGURAZIONE FRONTEND</h2>
    <h3>5.1 Credenziali Supabase</h3>
    <p>Nel file <code>js/scripts.js</code>, sostituisci le credenziali con quelle del tuo progetto:</p>

    <pre>
const SUPABASE_URL = 'https://tuo-progetto-id.supabase.co'
const SUPABASE_ANON_KEY = 'tua-chiave-anonima'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    </pre>

    <h3>5.2 Google Analytics</h3>
    <p>Per attivare Google Analytics, sostituisci l'ID nei file HTML:</p>

    <pre>
gtag('config', 'G-XXXXXXXXXX'); // Sostituisci con il tuo Measurement ID
    </pre>

    <h3>5.3 Configurazione Email</h3>
    <p>Per il form contatti, configura un servizio email (EmailJS raccomandato):</p>

    <pre>
emailjs.init("tuo-user-id");
emailjs.send("tuo-service-id", "tuo-template-id", formData);
    </pre>

    <h2>6. DEPLOYMENT</h2>
    <h3>6.1 Deploy su Netlify</h3>
    <ol>
      <li>Crea un account su <code>https://netlify.com</code></li>
      <li>Collega il repository GitHub (se utilizzato) o carica i file direttamente</li>
      <li>
        Configura le impostazioni di build:
        <ul>
          <li>Build command: <code>npm run build</code> (se presente)</li>
          <li>Publish directory: <code>./</code></li>
        </ul>
      </li>
      <li>
        Configura le variabili d'ambiente:
        <ul>
          <li><code>SUPABASE_URL</code></li>
          <li><code>SUPABASE_ANON_KEY</code></li>
          <li><code>GOOGLE_ANALYTICS_ID</code></li>
        </ul>
      </li>
      <li>Abilita HTTPS e configurazione dominio personalizzato</li>
    </ol>

    <h3>6.2 Configurazione Redirect</h3>
    <p>Crea un file <code>_redirects</code> nella root per gestire le rotte:</p>

    <pre>
/admin/*  /admin/login.html  401
/blog/*   /blog.html
/lavori/* /lavori.html
/*        /index.html   200
    </pre>

    <h2>7. GESTIONE CONTENUTI</h2>
    <h3>7.1 Accesso Admin</h3>
    <p>L'area amministrativa è accessibile tramite <code>/admin/login.html</code>. Le credenziali di default sono:</p>

    <div class="important">
      <strong>IMPORTANTE:</strong> Cambia immediatamente le credenziali di accesso per sicurezza!
    </div>

    <h3>7.2 Gestione Articoli Blog</h3>
    <p>Dalla dashboard admin è possibile:</p>
    <ul>
      <li>Creare nuovi articoli con editor WYSIWYG</li>
      <li>Modificare articoli esistenti</li>
      <li>Gestire categorie e tag</li>
      <li>Programmare pubblicazione</li>
      <li>Ottimizzare SEO per ogni articolo</li>
    </ul>

    <h3>7.3 Gestione Portfolio Lavori</h3>
    <p>Per ogni progetto è possibile:</p>
    <ul>
      <li>Aggiungere immagini prima/durante/dopo</li>
      <li>Inserire descrizione dettagliata</li>
      <li>Categorizzare il tipo di lavoro</li>
      <li>Specificare dettagli tecnici</li>
      <li>Pubblicare o mantenere in bozza</li>
    </ul>

    <h2>8. FUNZIONALITÀ AVANZATE</h2>
    <h3>8.1 SEO Ottimizzazione</h3>
    <p>Il sito include funzionalità SEO avanzate:</p>
    <ul>
      <li>Meta tags dinamici per ogni pagina</li>
      <li>Open Graph per social media</li>
      <li>Schema.org markup per Rich Snippets</li>
      <li>Sitemap XML automatica</li>
      <li>URL SEO-friendly</li>
      <li>Breadcrumbs per navigazione</li>
    </ul>

    <h3>8.2 Compliance GDPR</h3>
    <p>Il sito è completamente conforme al GDPR 2025:</p>
    <ul>
      <li>Cookie banner con consenso granulare</li>
      <li>Privacy Policy completa</li>
      <li>Cookie Policy dettagliata</li>
      <li>Gestione preferenze utente</li>
      <li>Right to be forgotten</li>
    </ul>

    <h3>8.3 Performance</h3>
    <p>Ottimizzazioni implementate:</p>
    <ul>
      <li>Lazy loading per immagini</li>
      <li>Compressione automatica</li>
      <li>CDN per risorse statiche</li>
      <li>Caching ottimizzato</li>
      <li>Minificazione CSS/JS</li>
    </ul>

    <h2>9. MANUTENZIONE</h2>
    <h3>9.1 Backup Database</h3>
    <p>Supabase fornisce backup automatici, ma è consigliato:</p>
    <ul>
      <li>Backup settimanali manuali</li>
      <li>Export dati critici</li>
      <li>Versioning del database</li>
      <li>Testing backup restore</li>
    </ul>

    <h3>9.2 Monitoraggio</h3>
    <p>Strumenti raccomandati per il monitoraggio:</p>
    <ul>
      <li>Google Analytics per traffico</li>
      <li>Google Search Console per SEO</li>
      <li>Uptime Robot per availability</li>
      <li>Supabase Dashboard per database</li>
    </ul>

    <h3>9.3 Aggiornamenti</h3>
    <p>Pianifica aggiornamenti regolari:</p>
    <ul>
      <li>Sicurezza Supabase</li>
      <li>Librerie JavaScript</li>
      <li>Contenuti SEO</li>
      <li>Performance optimization</li>
    </ul>

    <h2>10. TROUBLESHOOTING</h2>
    <h3>10.1 Problemi Comuni</h3>
    <table>
      <tr>
        <th>Problema</th>
        <th>Soluzione</th>
      </tr>
      <tr>
        <td>Errore connessione Supabase</td>
        <td>Verifica URL e chiave API</td>
      </tr>
      <tr>
        <td>Immagini non caricate</td>
        <td>Controlla politiche Storage</td>
      </tr>
      <tr>
        <td>Form contatti non funziona</td>
        <td>Verifica configurazione email</td>
      </tr>
      <tr>
        <td>Admin non accessibile</td>
        <td>Controlla autenticazione</td>
      </tr>
    </table>

    <h3>10.2 Log e Debug</h3>
    <p>Per diagnosticare problemi:</p>
    <ul>
      <li>Console browser per errori JavaScript</li>
      <li>Network tab per chiamate API</li>
      <li>Supabase logs per errori backend</li>
      <li>Netlify logs per errori deploy</li>
    </ul>

    <h2>11. SUPPORTO</h2>
    <p>Per assistenza tecnica:</p>
    <ul>
      <li>Documentazione Supabase: <code>https://supabase.com/docs</code></li>
      <li>Documentazione Netlify: <code>https://docs.netlify.com</code></li>
      <li>Community Forum: <code>https://github.com/supabase/supabase/discussions</code></li>
    </ul>

    <div class="important">
      <strong>NOTA FINALE:</strong> Questo documento deve essere aggiornato ad ogni modifica significativa del progetto.
      Mantieni sempre una copia di backup di tutti i file e configurazioni.
    </div>
  </body>
</html>

    <script id="html_badge_script1">
        window.__genspark_remove_badge_link = "https://www.genspark.ai/api/html_badge/" +
            "remove_badge?token=To%2FBnjzloZ3UfQdcSaYfDtAz%2Bx%2Bpw6x%2BqXFSrz3OlY277uphVCdkV5IRtwQQkpqAm3%2BeUts5bLQCqwUb%2Fl9VJg%2BhPm1x%2B2hEuuFqxPF%2B4HsrYxUxmB4WknudibxO5Shiebm8rJQUpBxNTPCLJpe26t7XNYDG4WOYfNaksyrWjcwKz0k%2BK6edeeZOBomBe%2FJyKUB8D35d1ewhbieVMa7iox%2F5v84xgbTfh0fjo9%2FgSxVNyjGLdQecNKAoM0XTMljJEP7ogCHCMmttCCie%2BMEeecmn9kjLqXlqaUgnqlOF8xLvU%2B26IjrUXVC0dsjgQFUp2jBemvHs67%2BvKGs2XRdAETEyV0T4VRtIwJQS%2BnEGL%2FC3QgvIbGt%2F3zSWiKgpZxsp%2FD4MGfmeVbMNzqVY6sNidneP84UwiOAVwePAQdIAbZ5JQqaUqZ8CEjzX81iHrrmBtbGm%2F7q2YEtmYzuKho8x2T4bwCpzXyAhrgIBQe4L9%2BmY30HDZTgNAiHLx85ejhSxmndFN1QidBjnFqn7ilAqaA%3D%3D";
        window.__genspark_locale = "it-IT";
        window.__genspark_token = "To/BnjzloZ3UfQdcSaYfDtAz+x+pw6x+qXFSrz3OlY277uphVCdkV5IRtwQQkpqAm3+eUts5bLQCqwUb/l9VJg+hPm1x+2hEuuFqxPF+4HsrYxUxmB4WknudibxO5Shiebm8rJQUpBxNTPCLJpe26t7XNYDG4WOYfNaksyrWjcwKz0k+K6edeeZOBomBe/JyKUB8D35d1ewhbieVMa7iox/5v84xgbTfh0fjo9/gSxVNyjGLdQecNKAoM0XTMljJEP7ogCHCMmttCCie+MEeecmn9kjLqXlqaUgnqlOF8xLvU+26IjrUXVC0dsjgQFUp2jBemvHs67+vKGs2XRdAETEyV0T4VRtIwJQS+nEGL/C3QgvIbGt/3zSWiKgpZxsp/D4MGfmeVbMNzqVY6sNidneP84UwiOAVwePAQdIAbZ5JQqaUqZ8CEjzX81iHrrmBtbGm/7q2YEtmYzuKho8x2T4bwCpzXyAhrgIBQe4L9+mY30HDZTgNAiHLx85ejhSxmndFN1QidBjnFqn7ilAqaA==";
    </script>
    
    <script id="html_notice_dialog_script" src="https://www.genspark.ai/notice_dialog.js"></script>
    