        const productsData = [
            {
                id: 'p1',
                name: 'Velvet Chocolate Truffle Cake',
                category: 'Cakes',
                price: '$28.50',
                img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
                desc: 'Rich 70% dark Belgian chocolate sponge cake layered with silky ganache.',
                ingredients: 'Dark Chocolate, Pure Butter, Heavy Cream, Flour, Sugar, Fresh Eggs, Cocoa Powder.'
            },
            {
                id: 'p2',
                name: 'French Butter Croissant',
                category: 'Pastries',
                price: '$4.25',
                img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
                desc: 'Golden, flaky, 27-layered authentic French croissant baked fresh daily.',
                ingredients: 'Unbleached Flour, Normandy Butter, Yeast, Whole Milk, Sea Salt.'
            },
            {
                id: 'p3',
                name: 'Choco-Chip Macadamia Cookies',
                category: 'Cookies',
                price: '$3.50',
                img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
                desc: 'Soft-baked cookies stuffed with real semisweet chocolate chunks and macadamia nuts.',
                ingredients: 'Unbleached Wheat Flour, Brown Sugar, Butter, Chocolate Chunks, Macadamia Nuts.'
            },
            {
                id: 'p4',
                name: 'Classic Rustic Apple Pie',
                category: 'Pies',
                price: '$19.00',
                img: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=600&q=80',
                desc: 'Spiced crisp Granny Smith apples encased in a flaky, buttery double crust.',
                ingredients: 'Granny Smith Apples, Cinnamon, Butter, Flour, Brown Sugar, Lemon Juice.'
            },
            {
                id: 'p5',
                name: 'Strawberry Shortcake Slice',
                category: 'Cakes',
                price: '$6.50',
                img: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80',
                desc: 'Fluffy vanilla sponge cake layered with organic fresh strawberries and whipped cream.',
                ingredients: 'Fresh Organic Strawberries, Sweetened Cream, Vanilla Bean, Flour, Eggs.'
            },
            {
                id: 'p6',
                name: 'Blueberry Danish Pastry',
                category: 'Pastries',
                price: '$4.75',
                img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80',
                desc: 'Buttery puff pastry centered with rich vanilla custard and sweet blueberries.',
                ingredients: 'Fresh Blueberries, Milk Custard, Butter, Flour, Sugar, Egg Glaze.'
            }
        ];
        const merchData = {
            'm1': { name: 'Signature Ceramic Mug', price: '$14.99', category: 'Merchandise', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80', desc: 'Premium 350ml ceramic coffee mug embossed with Bakerz Bite emblem.', ingredients: 'High-grade Ceramic, Dishwasher & Microwave Safe.' },
            'm2': { name: 'Eco-Friendly Tote Bag', price: '$18.50', category: 'Merchandise', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80', desc: 'Durable 100% organic canvas tote bag, perfect for carrying fresh bakery goods.', ingredients: '100% Organic Cotton Canvas, Reinforced Stitching.' },
            'm3': { name: 'Iced Coffee Glass Tumbler', price: '$16.00', category: 'Merchandise', img: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=80', desc: 'Double-walled glass tumbler with bamboo lid and reusable glass straw.', ingredients: 'Borosilicate Glass, Natural Bamboo Lid.' },
            'm4': { name: 'Handcrafted Wooden Tray', price: '$29.99', category: 'Merchandise', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80', desc: 'Solid acacia wooden tray for serving breakfast or pastries in bed.', ingredients: 'Natural Acacia Wood, Food-Safe Oil Finish.' }
        };
        $(document).ready(function () {
            $('#currentYear').text(new Date().getFullYear());
            let visitorCount = localStorage.getItem('bakerz_visitor_count');
            if (!visitorCount) {
                visitorCount = 1;
            } else {
                visitorCount = parseInt(visitorCount) +1;
            }
            localStorage.setItem('bakerz_visitor_count', visitorCount);
            $('#visitorCount').text(visitorCount.toLocaleString());
            renderProducts(productsData);
            $('#filter-buttons .btn').on('click', function () {
                $('#filter-buttons .btn').removeClass('active');
                $(this).addClass('active');
                const filter = $(this).data('filter');
                filterProducts(filter, $('#productSearch').val());
            });
            $('#productSearch').on('keyup', function () {
                const activeFilter = $('#filter-buttons .btn.active').data('filter');
                filterProducts(activeFilter, $(this).val());
            });
            $(document).on('click', '.view-product-btn', function () {
                const productId = $(this).data('id');
                const product = productsData.find(p => p.id === productId);
                if (product) {
                    $('#modalTitle').text('Product Details');
                    $('#modalName').text(product.name);
                    $('#modalCategory').text(product.category);
                    $('#modalPrice').text(product.price);
                    $('#modalDesc').text(product.desc);
                    $('#modalIngredients').text(product.ingredients);
                    $('#modalImg').attr('src', product.img);
                    $('#productModal').modal('show');
                }
            });
            $('.view-merch-btn').on('click', function () {
                const merchId = $(this).data('id');
                const item = merchData[merchId];
                if (item) {
                    $('#modalTitle').text('Merchandise Item');
                    $('#modalName').text(item.name);
                    $('#modalCategory').text(item.category);
                    $('#modalPrice').text(item.price);
                    $('#modalDesc').text(item.desc);
                    $('#modalIngredients').text(item.ingredients);
                    $('#modalImg').attr('src', item.img);
                    $('#productModal').modal('show');
                }
            });
            $('#starRating i').on('click', function () {
                const rating = $(this).data('rating');
                $('#selectedRating').val(rating);
                $('#starRating i').each(function (index) {
                    if (index < rating) {
                        $(this).addClass('active').removeClass('far').addClass('fas');
                    } else {
                        $(this).removeClass('active');
                    }
                });
            });
            $('#feedbackForm').on('submit', function (e) {
                e.preventDefault();
                const name = $('#userName').val();
                const comment = $('#userComment').val();
                const rating = $('#selectedRating').val();
                let starsHtml = '';
                for (let i = 0; i < 5; i++) {
                    starsHtml += i < rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
                }
                const newReview = `
                    <div class="review-card" style="display: none;">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <h6 class="fw-bold mb-0">${escapeHtml(name)}</h6>
                            <div class="text-warning small">${starsHtml}</div>
                        </div>
                        <small class="text-muted d-block mb-2">Just now</small>
                        <p class="mb-0 text-secondary">"${escapeHtml(comment)}"</p>
                    </div>
                `;
                $('#reviewsList').prepend(newReview);
                $('#reviewsList .review-card').first().fadeIn(600);
                this.reset();
                $('#selectedRating').val(5);
                $('#starRating i').addClass('active');
                showToast('Thank you! Your feedback has been submitted successfully.');
            });
            $('#contactForm').on('submit', function (e) {
                e.preventDefault();
                showToast('Thank you for contacting us! We will respond shortly.');
                this.reset();
            });
            $(window).on('scroll', function () {
                let scrollPos = $(document).scrollTop() + 100;
                $('.navbar-nav a.nav-link').each(function () {
                    let currLink = $(this);
                    let refElement = $(currLink.attr('href'));
                    if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                        $('.navbar-nav a.nav-link').removeClass('active');
                        currLink.addClass('active');
                    }
                });
            });
            startLiveClock();
            initGeolocation();

            // Scroll To Top Button
$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('#scrollTopBtn').fadeIn();
        } else {
            $('#scrollTopBtn').fadeOut();
        }
    });

    $('#scrollTopBtn').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

});
        });
        function renderProducts(items) {
            const grid = $('#productGrid');
            grid.empty();
            if (items.length === 0) {
                grid.append(`
                    <div class="col-12 text-center py-5">
                        <i class="fas fa-cookie-bite text-muted display-4 mb-3"></i>
                        <h5>No baked delicacies found matching your search.</h5>
                    </div>
                `);
                return;
            }
            items.forEach(item => {
                grid.append(`
                    <div class="col-md-6 col-lg-4 product-item">
                        <div class="product-card">
                            <div class="product-img-wrapper">
                                <span class="badge-category">${item.category}</span>
                                <img src="${item.img}" alt="${item.name}" onerror="this.src='https://placehold.co/400x300/8B4513/FFFFFF?text=Bakery+Item'">
                            </div>
                            <div class="p-4">
                                <h5 class="fw-bold font-heading mb-2">${item.name}</h5>
                                <p class="text-muted small text-truncate-2 mb-3" style="min-height: 40px;">${item.desc}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="price-tag">${item.price}</span>
                                    <button class="btn btn-sm btn-custom view-product-btn" data-id="${item.id}">
                                        View Details <i class="fas fa-chevron-right ms-1 small"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            });
        }
        function filterProducts(category, query) {
            let filtered = productsData;
            if (category && category !== 'all') {
                filtered = filtered.filter(p => p.category === category);
            }
            if (query && query.trim() !== '') {
                const q = query.toLowerCase();
                filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
            }
            renderProducts(filtered);
        }
        function openLightbox(imgSrc, caption) {
            $('#lightboxImg').attr('src', imgSrc);
            $('#lightboxCaption').text(caption);
            $('#lightboxModal').modal('show');
        }
        function showToast(msg) {
            $('#toastMessage').text(msg);
            const toastEl = new bootstrap.Toast(document.getElementById('actionToast'));
            toastEl.show();
        }
        function startLiveClock() {
            function updateClock() {
                const now = new Date();
                const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
                $('#tickerTime').text(now.toLocaleDateString('en-US', options));
            }
            updateClock();
            setInterval(updateClock, 1000);
        }
        function initGeolocation() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        const lat = position.coords.latitude.toFixed(3);
                        const lon = position.coords.longitude.toFixed(3);
                        $('#tickerLocation').text(`Location: Lat ${lat}°, Long ${lon}° (Verified Store Visitor Zone)`);
                    },
                    function (error) {
                        $('#tickerLocation').text("Location: Main Street Café, Sweetland (Geolocation Disabled)");
                    }
                );
            } else {
                $('#tickerLocation').text("Location: Main Street Café, Sweetland");
            }
        }
        function escapeHtml(string) {
            return String(string).replace(/[&<>"']/g, function (s) {
                return {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;'
                }[s];
            });
        }
