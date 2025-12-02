/**
* Template Name: TravelTime
* Template URL: https://bootstrapmade.com/traveltime-bootstrap-travel-template/
* Updated: Jul 28 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  // Button loading/disabled helper (global)
  // Usage: setButtonLoading(element, true|false)
  window.setButtonLoading = function(btn, loading = true) {
    if (!btn) return;
    try {
      btn.disabled = !!loading;
      if (loading) {
        btn.classList.add('btn-loading');
        if (!btn.dataset._label) btn.dataset._label = btn.innerHTML;
        // Optionally show a spinner: developers can change innerHTML if desired
      } else {
        btn.classList.remove('btn-loading');
        if (btn.dataset._label) { btn.innerHTML = btn.dataset._label; delete btn.dataset._label; }
      }
    } catch (e) { /* silent */ }
  };

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Booking form: price mapping and handlers
   */
  (function bookingForm() {
    // priceMap and packages will be loaded from data/packages.json
    let priceMap = {};
    let packages = [];

    async function loadPackageData() {
      try {
        const resp = await fetch('data/packages.json');
        if (!resp.ok) throw new Error('Failed to fetch packages.json');
        const data = await resp.json();
        priceMap = data.priceMap || {};
        packages = data.packages || [];
        // if there are UI elements already present, update the summary
        updateSummary();
      } catch (err) {
        console.error('Error loading package data:', err);
      }
    }

    const destinationEl = document.getElementById('destination');
    const adultsEl = document.getElementById('adults');
    const childrenEl = document.getElementById('children');
    const checkInEl = document.getElementById('check-in');
    const checkOutEl = document.getElementById('check-out');
    const priceSummary = document.getElementById('price-summary');
    const priceValue = document.getElementById('price-value');
    const searchBtn = document.getElementById('search-btn');

    if (!destinationEl || !adultsEl || !childrenEl || !priceSummary || !priceValue || !searchBtn) return;

    const currency = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

    function calcPrice() {
      const dest = destinationEl.value;
      if (!dest || !priceMap[dest]) return 0;
      const adultCount = Math.max(0, parseInt(adultsEl.value, 10) || 0);
      const childCount = Math.max(0, parseInt(childrenEl.value, 10) || 0);
      const base = priceMap[dest];
      // children pay 25% of adult price (75% discount)
      const total = (adultCount * base) + (childCount * base * 0.25);
      return Math.round(total);
    }

    function updateSummary() {
      const total = calcPrice();
      if (total > 0) {
        priceValue.textContent = currency.format(total);
        priceSummary.style.display = 'block';
      } else {
        priceValue.textContent = currency.format(0);
        priceSummary.style.display = 'none';
      }
    }

    // update when inputs change
    destinationEl.addEventListener('change', updateSummary);
    adultsEl.addEventListener('input', updateSummary);
    childrenEl.addEventListener('input', updateSummary);

    // render search results below travel-hero
    const resultsPanel = document.getElementById('search-results-panel');
    const resultsGrid = document.getElementById('search-results-grid');
    const resultsSection = document.getElementById('search-results');
    const searchSummary = document.getElementById('search-summary');
    const searchEmpty = document.getElementById('search-empty');

    // packages data is loaded via loadPackageData()

    function clearResults() {
      if (resultsGrid) resultsGrid.innerHTML = '';
      if (searchEmpty) searchEmpty.style.display = 'none';
      if (resultsPanel) resultsPanel.style.display = 'none';
    }

    function renderResults(dest, adults, children, checkIn, checkOut) {
      if (!resultsGrid || !resultsPanel) return;
      const filtered = packages.filter(p => p.province === dest);
      resultsGrid.innerHTML = '';

      const totalEst = calcPrice();
      searchSummary.textContent = `${destinationEl.options[destinationEl.selectedIndex].text} • ${adults} Dewasa, ${children} Anak • Est. ${currency.format(totalEst)}`;

      if (filtered.length === 0) {
        if (searchEmpty) searchEmpty.style.display = 'block';
        resultsPanel.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      filtered.forEach(pkg => {
        const div = document.createElement('div');
        div.className = 'result-card';
        div.innerHTML = `
          <img src="${pkg.img}" alt="${pkg.title}">
          <div class="result-title">${pkg.title}</div>
          <div class="result-meta">${pkg.days} • Dari ${currency.format(pkg.price)} / orang</div>
          <div class="result-meta">${pkg.desc}</div>
          <div class="result-actions">
            <button class="btn-select-package btn" data-pkg="${pkg.id}" data-action="select-package">Pilih Paket</button>
            <a class="btn btn-outline" href="paket.html?destination=${dest}">Lihat Paket</a>
          </div>
        `;
        resultsGrid.appendChild(div);
      });

      resultsPanel.style.display = 'block';
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // handle search / booking click -> render results
    searchBtn.addEventListener('click', function() {
      const dest = destinationEl.value;
      const checkIn = checkInEl.value;
      const checkOut = checkOutEl.value;
      const adults = Math.max(1, parseInt(adultsEl.value, 10) || 1);
      const children = Math.max(0, parseInt(childrenEl.value, 10) || 0);

      if (!dest) {
        alert('Silakan pilih provinsi tujuan.');
        destinationEl.focus();
        return;
      }
      if (!checkIn) {
        alert('Silakan pilih tanggal berangkat.');
        checkInEl.focus();
        return;
      }
      if (!checkOut) {
        alert('Silakan pilih tanggal pulang.');
        checkOutEl.focus();
        return;
      }
      if (new Date(checkOut) < new Date(checkIn)) {
        alert('Tanggal pulang tidak boleh sebelum tanggal berangkat.');
        checkOutEl.focus();
        return;
      }

      // provide visual feedback and prevent double clicks
      try { setButtonLoading(searchBtn, true); } catch(e){}
      try {
        renderResults(dest, adults, children, checkIn, checkOut);
      } finally {
        // small delay so users see feedback
        setTimeout(()=>{ try{ setButtonLoading(searchBtn, false); }catch(e){} }, 250);
      }
    });

    // delegated action handler (supports data-action and legacy classes)
    document.addEventListener('click', function(e) {
      const actionEl = e.target.closest && (e.target.closest('[data-action]') || e.target.closest('.btn-select-package'));
      if (!actionEl) return;
      const action = actionEl.getAttribute('data-action') || (actionEl.classList.contains('btn-select-package') ? 'select-package' : null);
      if (!action) return;

      if (action === 'select-package') {
        const btn = actionEl;
        const pkgId = btn.getAttribute('data-pkg');
        const selectedPkg = packages.find(p => p.id === pkgId);
        if (!selectedPkg) {
          alert('Paket tidak ditemukan.');
          return;
        }
        const dest = destinationEl.value;
        const checkIn = checkInEl.value;
        const checkOut = checkOutEl.value;
        const adults = Math.max(1, parseInt(adultsEl.value, 10) || 1);
        const children = Math.max(0, parseInt(childrenEl.value, 10) || 0);
        // Calculate total based on package price (not priceMap)
        const packageTotal = (adults * selectedPkg.price) + (children * selectedPkg.price * 0.25);
        try { setButtonLoading(btn, true); } catch(e){}
        const params = new URLSearchParams({ 
          pkg: pkgId, 
          pkg_title: selectedPkg.title,
          pkg_img: selectedPkg.img,
          pkg_price: selectedPkg.price.toString(),
          pkg_days: selectedPkg.days,
          destination: dest, 
          checkin: checkIn, 
          checkout: checkOut, 
          adults: adults.toString(), 
          children: children.toString(), 
          total: packageTotal.toString() 
        });
        window.location.href = 'booking.html?' + params.toString();
      }
    });

    // keyboard activation for elements with role="button" or data-action attributes
    document.addEventListener('keydown', function(e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const el = document.activeElement;
      if (!el) return;
      const hasAction = el.hasAttribute('data-action') || el.getAttribute('role') === 'button' || el.classList.contains('destination-item');
      if (!hasAction) return;
      // emulate click
      e.preventDefault();
      el.click();
    });

    // load package JSON then update UI
    loadPackageData();

    // Accessibility auto-fixes applied at runtime:
    // - add aria-labels to icon-only anchors (derive from bi-* class)
    // - mark decorative icons as aria-hidden
    // - provide fallback alt text for images with empty alt (use filename)
    function accessibilityAutoFixes() {
      try {
        document.querySelectorAll('a').forEach(a => {
          if (a.hasAttribute('aria-label')) return;
          if (a.children.length === 1 && a.children[0].tagName.toLowerCase() === 'i') {
            const i = a.children[0];
            const classes = Array.from(i.classList || []);
            let label = null;
            classes.forEach(c => {
              if (!label && c.startsWith('bi-')) {
                const name = c.replace('bi-', '').replace(/-/g, ' ');
                label = name.charAt(0).toUpperCase() + name.slice(1);
              }
            });
            if (!label) label = 'Link';
            a.setAttribute('aria-label', label);
            i.setAttribute('aria-hidden', 'true');
          }
        });

        document.querySelectorAll('img').forEach(img => {
          if (img.hasAttribute('alt') && img.getAttribute('alt') !== '') return;
          const src = img.getAttribute('src') || '';
          const basename = src.split('/').pop() || 'image';
          img.setAttribute('alt', basename.replace(/[-_]/g, ' '));
        });
      } catch (e) { console.error('accessibilityAutoFixes error', e); }
    }

    window.addEventListener('load', accessibilityAutoFixes);

  })();

})();