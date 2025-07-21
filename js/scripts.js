// Protezione contro doppio caricamento
if (typeof window.ORTENSIA_SCRIPTS_LOADED === 'undefined') {
    window.ORTENSIA_SCRIPTS_LOADED = true;

    // ===================================
    // INIZIALIZZAZIONE SUPABASE
    // ===================================

    let supabaseClient = null;

    function initSupabase() {
        if (typeof supabase !== 'undefined' && supabase.createClient && window.CONFIG && window.CONFIG.SUPABASE) {
            supabaseClient = supabase.createClient(window.CONFIG.SUPABASE.url, window.CONFIG.SUPABASE.anonKey);
            console.log('✅ Supabase initialized successfully');
            return true;
        } else {
            console.error('❌ Supabase library or config not available');
            return false;
        }
    }

    // ===================================
    // FUNZIONI BLOG
    // ===================================

    async function loadBlogPosts(limit = 6, offset = 0, categoryId = null) {
        if (!supabaseClient) return { data: [], count: 0 };
        
        try {
            let query = supabaseClient
                .from('articles')
                .select('*, categories(name, slug)', { count: 'exact' })
                .eq('status', 'published')
                .order('published_at', { ascending: false });
            
            if (categoryId) {
                query = query.eq('category_id', categoryId);
            }
            
            const { data, error, count } = await query.range(offset, offset + limit - 1);
            
            if (error) throw error;
            return { data: data || [], count: count || 0 };
        } catch (error) {
            console.error('Error loading blog posts:', error);
            return { data: [], count: 0 };
        }
    }

    async function loadSingleArticle(slug) {
        if (!supabaseClient) return null;
        
        try {
            const { data, error } = await supabaseClient
                .from('articles')
                .select('*, categories(name, slug)')
                .eq('slug', slug)
                .eq('status', 'published')
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error loading article:', error);
            return null;
        }
    }

    async function loadAllArticles() {
        if (!supabaseClient) return [];
        
        try {
            const { data, error } = await supabaseClient
                .from('articles')
                .select('*, categories(name, slug)')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error loading all articles:', error);
            return [];
        }
    }

    async function createArticle(articleData) {
        if (!supabaseClient) return { success: false, error: 'Database non disponibile' };
        
        try {
            const { data, error } = await supabaseClient
                .from('articles')
                .insert([{
                    ...articleData,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }])
                .select();
            
            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Error creating article:', error);
            return { success: false, error: error.message };
        }
    }

    async function updateArticle(id, articleData) {
        if (!supabaseClient) return { success: false, error: 'Database non disponibile' };
        
        try {
            const { data, error } = await supabaseClient
                .from('articles')
                .update({
                    ...articleData,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id)
                .select();
            
            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Error updating article:', error);
            return { success: false, error: error.message };
        }
    }

    async function deleteArticle(id) {
        if (!supabaseClient) return { success: false, error: 'Database non disponibile' };
        
        try {
            const { error } = await supabaseClient
                .from('articles')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Error deleting article:', error);
            return { success: false, error: error.message };
        }
    }

    // ===================================
    // FUNZIONI PORTFOLIO
    // ===================================

    async function loadProjects(limit = 9, offset = 0, categoryId = null) {
        if (!supabaseClient) return { data: [], count: 0 };
        
        try {
            let query = supabaseClient
                .from('projects')
                .select(`
                    *,
                    categories(name, slug),
                    project_images(*)
                `, { count: 'exact' })
                .eq('status', 'published')
                .order('created_at', { ascending: false });
            
            if (categoryId) {
                query = query.eq('category_id', categoryId);
            }
            
            const { data, error, count } = await query.range(offset, offset + limit - 1);
            
            if (error) throw error;
            return { data: data || [], count: count || 0 };
        } catch (error) {
            console.error('Error loading projects:', error);
            return { data: [], count: 0 };
        }
    }

    async function loadSingleProject(id) {
        if (!supabaseClient) return null;
        
        try {
            const { data, error } = await supabaseClient
                .from('projects')
                .select(`
                    *,
                    categories(name, slug),
                    project_images(*)
                `)
                .eq('id', id)
                .eq('status', 'published')
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error loading project:', error);
            return null;
        }
    }

    async function loadAllProjects() {
        if (!supabaseClient) return [];
        
        try {
            const { data, error } = await supabaseClient
                .from('projects')
                .select(`
                    *,
                    categories(name, slug),
                    project_images(*)
                `)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error loading all projects:', error);
            return [];
        }
    }

    async function createProject(projectData) {
        if (!supabaseClient) return { success: false, error: 'Database non disponibile' };
        
        try {
            const { data, error } = await supabaseClient
                .from('projects')
                .insert([{
                    ...projectData,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }])
                .select();
            
            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Error creating project:', error);
            return { success: false, error: error.message };
        }
    }

    async function updateProject(id, projectData) {
        if (!supabaseClient) return { success: false, error: 'Database non disponibile' };
        
        try {
            const { data, error } = await supabaseClient
                .from('projects')
                .update({
                    ...projectData,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id)
                .select();
            
            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Error updating project:', error);
            return { success: false, error: error.message };
        }
    }

    async function deleteProject(id) {
        if (!supabaseClient) return { success: false, error: 'Database non disponibile' };
        
        try {
            // Prima elimina le immagini associate
            await supabaseClient
                .from('project_images')
                .delete()
                .eq('project_id', id);
            
            // Poi elimina il progetto
            const { error } = await supabaseClient
                .from('projects')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Error deleting project:', error);
            return { success: false, error: error.message };
        }
    }

    async function addProjectImages(projectId, images) {
        if (!supabaseClient) return { success: false, error: 'Database non disponibile' };
        
        try {
            const imageData = images.map(img => ({
                project_id: projectId,
                image_url: img.url,
                type: img.type,
                alt_text: img.alt || '',
                order_number: img.order || 0
            }));
            
            const { data, error } = await supabaseClient
                .from('project_images')
                .insert(imageData);
            
            if (error) throw error;
            return { success: true, data: data };
        } catch (error) {
            console.error('Error adding project images:', error);
            return { success: false, error: error.message };
        }
    }

    // ===================================
    // FUNZIONI CATEGORIE
    // ===================================

    async function loadCategories(type = 'all') {
        if (!supabaseClient) return [];
        
        try {
            let query = supabaseClient.from('categories').select('*');
            
            if (type !== 'all') {
                query = query.eq('type', type);
            }
            
            const { data, error } = await query.order('name');
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error loading categories:', error);
            return [];
        }
    }

    // ===================================
    // FUNZIONI CONTATTI
    // ===================================

    async function submitContact(formData) {
        if (!supabaseClient) return { success: false, error: 'Database non disponibile' };
        
        try {
            const validation = validateContactData(formData);
            if (!validation.isValid) {
                return { success: false, error: validation.error };
            }
            
            const { data, error } = await supabaseClient
                .from('contacts')
                .insert([{
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || null,
                    subject: formData.subject || 'Richiesta informazioni',
                    message: formData.message,
                    status: 'new'
                }]);
            
            if (error) throw error;
            return { success: true, data: data };
        } catch (error) {
            console.error('Error submitting contact:', error);
            return { success: false, error: 'Errore durante l\'invio del messaggio' };
        }
    }

    function validateContactData(data) {
        const rules = window.CONFIG?.CONTACT?.validationRules || {
            name: { required: true, minLength: 2, maxLength: 50 },
            email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            phone: { required: false, pattern: /^[\d\s\-\+\(\)]+$/ },
            message: { required: true, minLength: 10, maxLength: 1000 }
        };
        
        if (!data.name || data.name.length < rules.name.minLength || data.name.length > rules.name.maxLength) {
            return { isValid: false, error: 'Nome non valido' };
        }
        
        if (!data.email || !rules.email.pattern.test(data.email)) {
            return { isValid: false, error: 'Email non valida' };
        }
        
        if (data.phone && !rules.phone.pattern.test(data.phone)) {
            return { isValid: false, error: 'Numero di telefono non valido' };
        }
        
        if (!data.message || data.message.length < rules.message.minLength || data.message.length > rules.message.maxLength) {
            return { isValid: false, error: 'Messaggio non valido' };
        }
        
        return { isValid: true };
    }

    async function loadContacts() {
        if (!supabaseClient) return [];
        
        try {
            const { data, error } = await supabaseClient
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error loading contacts:', error);
            return [];
        }
    }

    // ===================================
    // UTILITY FUNCTIONS
    // ===================================

    function generateSlug(text) {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[àáâãäå]/g, 'a')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/[òóôõö]/g, 'o')
            .replace(/[ùúûü]/g, 'u')
            .replace(/[ç]/g, 'c')
            .replace(/[ñ]/g, 'n')
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '')
            .substring(0, 200);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('it-IT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function truncateText(text, maxLength) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    function compressImageDataURL(dataURL, maxWidth = 800, quality = 0.8) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Calcola nuove dimensioni
                let { width, height } = img;
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                // Disegna immagine ridimensionata
                ctx.drawImage(img, 0, 0, width, height);
                
                // Converti in dataURL compresso
                const compressedDataURL = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedDataURL);
            };
            img.src = dataURL;
        });
    }

    // ===================================
    // GESTIONE FORM
    // ===================================

    async function handleContactForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Invio in corso...';
        
        try {
            const result = await submitContact(data);
            
            if (result.success) {
                showNotification('Messaggio inviato con successo!', 'success');
                form.reset();
            } else {
                showNotification(result.error, 'error');
            }
        } catch (error) {
            showNotification('Errore durante l\'invio del messaggio', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            'bg-blue-500'
        } text-white`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'} mr-2"></i>
                ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // ===================================
    // INIZIALIZZAZIONE
    // ===================================

    function initializeScripts() {
        if (typeof window.CONFIG === 'undefined') {
            setTimeout(initializeScripts, 100);
            return;
        }

        if (typeof supabase !== 'undefined') {
            initSupabase();
        } else {
            setTimeout(() => {
                if (typeof supabase !== 'undefined') {
                    initSupabase();
                } else {
                    console.error('❌ Supabase library failed to load');
                }
            }, 1000);
        }

        // Event listeners
        document.addEventListener('submit', function(e) {
            if (e.target.id === 'contact-form') {
                e.preventDefault();
                handleContactForm(e.target);
            }
        });
    }

    // ===================================
    // EXPORT GLOBALI
    // ===================================

    window.OrtensiaAPI = {
        // Blog
        loadBlogPosts,
        loadSingleArticle,
        loadAllArticles,
        createArticle,
        updateArticle,
        deleteArticle,
        
        // Portfolio
        loadProjects,
        loadSingleProject,
        loadAllProjects,
        createProject,
        updateProject,
        deleteProject,
        addProjectImages,
        
        // Categorie
        loadCategories,
        
        // Contatti
        submitContact,
        loadContacts,
        
        // Utility
        generateSlug,
        formatDate,
        truncateText,
        showNotification,
        compressImageDataURL,
        
        // Internal
        initSupabase,
        getSupabaseClient: () => supabaseClient
    };

    // Inizializzazione
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeScripts);
    } else {
        initializeScripts();
    }

    console.log('✅ Ortensia Scripts loaded successfully');
}
