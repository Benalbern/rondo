document.addEventListener('DOMContentLoaded', () => {
    // Set current year for the footer
    document.getElementById('current-year-all-projects').textContent = new Date().getFullYear();

    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const loadingMessage = document.querySelector('.loading-message');
    // const backToHomeBtnContainer = document.getElementById('backToHomeBtn'); // Tidak perlu lagi jika selalu terlihat

    const projectsBasePath = 'projects/';

    const categoryFiles = {
        'website': 'website.html',
        'ui-ux': 'ui-ux.html',
        'graphic-design': 'graphic-design.html',
        'game': 'game.html',
        'app': 'app.html'
    };

    const loadProjects = async (category) => {
        portfolioGrid.innerHTML = '';
        if (loadingMessage) {
            loadingMessage.style.display = 'block';
            portfolioGrid.appendChild(loadingMessage);
        } else {
            portfolioGrid.innerHTML = '<p class="loading-message" style="text-align: center; color: var(--medium-gray);">Memuat proyek...</p>';
            loadingMessage = document.querySelector('.loading-message');
        }

        const filePath = projectsBasePath + categoryFiles[category];

        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const htmlContent = await response.text();
            
            if (loadingMessage) {
                loadingMessage.style.display = 'none';
            }
            portfolioGrid.innerHTML = htmlContent;
            
        } catch (error) {
            console.error('Error loading projects:', error);
            if (loadingMessage) {
                loadingMessage.style.display = 'block';
                loadingMessage.textContent = 'Gagal memuat proyek. Silakan coba lagi nanti.';
            } else {
                portfolioGrid.innerHTML = '<p class="loading-message" style="text-align: center; color: var(--medium-gray);">Gagal memuat proyek. Silakan coba lagi nanti.</p>';
            }
        }
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.getAttribute('data-category');
            loadProjects(selectedCategory);
        });
    });

    // Panggil fungsi ini saat halaman dimuat
    loadProjects('website');

    // Hapus logika untuk menampilkan/menyembunyikan tombol saat scroll
    // window.addEventListener('scroll', () => {
    //     if (window.scrollY > 200) {
    //         backToHomeBtnContainer.classList.add('show');
    //     } else {
    //         backToHomeBtnContainer.classList.remove('show');
    //     }
    // });
    // window.dispatchEvent(new Event('scroll'));
});