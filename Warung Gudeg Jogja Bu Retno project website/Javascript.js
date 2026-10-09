// =========================================
// HAMBURGER MENU LOGIC
// =========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Menutup menu jika salah satu link diklik (khusus di mobile)
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// =========================================
// MENU PAGINATION LOGIC
// =========================================
const menuContainer = document.getElementById('menu-container');

if (menuContainer) {
    let currentPage = 1;
    const totalPages = 2; // Karena kita sudah mengatur HTML ke dalam 2 halaman data-page

    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const pageNumBtns = document.querySelectorAll('.page-num');
    const allCards = document.querySelectorAll('.menu-card');

    // Fungsi untuk memperbarui tampilan halaman
    function showPage(page) {
        // Tampilkan/Sembunyikan Card Menu
        allCards.forEach(card => {
            if (parseInt(card.getAttribute('data-page')) === page) {
                card.style.display = 'flex';
                // Animasi halus kecil saat tampil
                card.style.opacity = '0';
                setTimeout(() => { card.style.opacity = '1'; }, 50);
            } else {
                card.style.display = 'none';
            }
        });

        // Update State Tombol Prev & Next
        btnPrev.disabled = (page === 1);
        btnNext.disabled = (page === totalPages);

        // Update State Tombol Angka (1, 2)
        pageNumBtns.forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.getAttribute('data-target')) === page) {
                btn.classList.add('active');
            }
        });

        currentPage = page;
        
        // Scroll kembali ke atas menu dengan halus setiap kali ganti halaman
        menuContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Event Listener untuk Tombol Prev
    btnPrev.addEventListener('click', () => {
        if (currentPage > 1) showPage(currentPage - 1);
    });

    // Event Listener untuk Tombol Next
    btnNext.addEventListener('click', () => {
        if (currentPage < totalPages) showPage(currentPage + 1);
    });

    // Event Listener untuk Tombol Angka
    pageNumBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetPage = parseInt(e.target.getAttribute('data-target'));
            showPage(targetPage);
        });
    });
}