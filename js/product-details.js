document.addEventListener('DOMContentLoaded', function() {
    // Product database - In a real app, this would come from your backend
    const products = {
        // Men's Products (1-2)
        1: {
            id: 1,
            name: 'عطر فلورال فاخر',
            price: 1200,
            originalPrice: 1500,
            discount: 20,
            description: 'عطر نسائي فاخر يجمع بين أناقة الزهور البرية ونضارة الحمضيات. يتميز بعبير فريد يدوم طوال اليوم، مما يجعلك تشعرين بالأناقة والجاذبية في كل الأوقات.',
            images: [
                'images/product-1-1.jpg',
                'images/product-1-2.jpg',
                'images/product-1-3.jpg',
                'images/product-1-4.jpg'
            ],
            scentProfile: ['ياسمين', 'ورد', 'فانيلا', 'برتقال'],
            rating: 4.5,
            reviewCount: 128,
            inStock: true,
            ingredients: 'كحول نقي، عطر، ماء، مواد حافظة',
            howToUse: 'رشي العطر على نقاط النبض: المعصمين، خلف الأذنين، الرقبة، والمرفقين.',
            reviews: [
                {
                    id: 1,
                    userName: 'سارة محمد',
                    rating: 5,
                    date: '2023-09-10',
                    text: 'الرائحة رائعة وتدوم طويلاً. أنصح به بشدة!'
                },
                {
                    id: 2,
                    userName: 'أحمد خالد',
                    rating: 4,
                    date: '2023-09-05',
                    text: 'جيد جداً ولكن السعر مرتفع قليلاً.'
                }
            ],
            ratingDistribution: [5, 4, 3, 2, 1]
        },
        2: {
            id: 2,
            name: 'عطر رجالي فاخر',
            price: 1600,
            originalPrice: 2100,
            discount: 24,
            description: 'عطر رجالي قوي وأنيق يجمع بين روائح الخشب والتوابل. مثالي للاستخدام اليومي والمناسبات الخاصة.',
            images: [
                'images/fresh 1.webp',
                'images/fresh3.webp',
                'images/VERSACE-EROS-EDT-FOR-MEN-668x1024.png'
            ],
            scentProfile: ['خشب الصندل', 'فانيليا', 'فلفل أسود', 'ليمون'],
            rating: 4.2,
            reviewCount: 89,
            inStock: true,
            ingredients: 'كحول نقي، عطر، ماء، مواد حافظة',
            howToUse: 'رش العطر على نقاط النبض: المعصمين، خلف الأذنين، والرقبة.',
            reviews: [
                {
                    id: 3,
                    userName: 'محمد علي',
                    rating: 5,
                    date: '2023-09-12',
                    text: 'رائحة رائعة وتدوم طويلاً. أنصح به بشدة!'
                },
                {
                    id: 4,
                    userName: 'أحمد سعيد',
                    rating: 4,
                    date: '2023-09-08',
                    text: 'جيد جداً ورائحته مميزة.'
                }
            ],
            ratingDistribution: [3, 4, 2, 1, 0]
        },
        
        // Women's Products (3-5)
        3: {
            id: 3,
            name: 'Vibes Parfum Women',
            price: 3000,
            originalPrice: 4100,
            discount: 27,
            description: 'عطر نسائي فاخر يجمع بين الفخامة والأناقة. يتميز برائحة زهرية فريدة تدوم طوال اليوم.',
            images: [
                'https://fimgs.net/mdimg/perfume/o.111377.jpg',
                'https://beautikashop.com/cdn/shop/files/vibe_intense_lady.jpg',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHPPN6pqtc_tHsUf7j_cucnzoIVHuYAt2TA&s'
            ],
            scentProfile: ['ياسمين', 'فانيلا', 'برغموت', 'مسك'],
            rating: 4.7,
            reviewCount: 156,
            inStock: true,
            ingredients: 'كحول نقي، عطر، ماء، مواد حافظة',
            howToUse: 'رشي العطر على نقاط النبض: المعصمين، خلف الأذنين، الرقبة، والمرفقين.',
            reviews: [
                {
                    id: 5,
                    userName: 'نورا أحمد',
                    rating: 5,
                    date: '2023-10-05',
                    text: 'رائحة ساحرة وتدوم طويلاً. أنصح به بشدة!'
                }
            ],
            ratingDistribution: [4, 5, 3, 1, 0]
        },
        4: {
            id: 4,
            name: 'Fresh Vibe Richard',
            price: 2000,
            originalPrice: 2900,
            discount: 31,
            description: 'عطر منعش يجمع بين الحمضيات والنوتات الخشبية الدافئة. مثالي للاستخدام اليومي.',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHPPN6pqtc_tHsUf7j_cucnzoIVHuYAt2TA&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYySDe9PQXYw1i5wZsbL9vbNHJ58PsdQvf3w&s',
                'images/fresh 5.jpg'
            ],
            scentProfile: ['برتقال', 'ليمون', 'خشب الصندل', 'فانيليا'],
            rating: 4.3,
            reviewCount: 92,
            inStock: true,
            ingredients: 'كحول نقي، عطر، ماء، مواد حافظة',
            howToUse: 'رش العطر على نقاط النبض: المعصمين، خلف الأذنين، والرقبة.',
            reviews: [
                {
                    id: 6,
                    userName: 'ليلى محمد',
                    rating: 4,
                    date: '2023-10-10',
                    text: 'رائحة منعشة وجميلة، أنصح به.'
                }
            ],
            ratingDistribution: [2, 3, 4, 2, 1]
        },
        5: {
            id: 5,
            name: 'Summer Breeze',
            price: 1650,
            originalPrice: 2100,
            discount: 21,
            description: 'عطر صيفي منعش يجمع بين الحمضيات والزهور البيضاء. مثالي لأيام الصيف الحارة.',
            images: [
                'images/summer 5.webp',
                'images/summer 6.webp',
                'images/SUMMER 3.webp'
            ],
            scentProfile: ['برتقال', 'يوسفي', 'ياسمين', 'مسك أبيض'],
            rating: 4.6,
            reviewCount: 78,
            inStock: true,
            ingredients: 'كحول نقي، عطر، ماء، مواد حافظة',
            howToUse: 'رشي العطر على نقاط النبض: المعصمين، خلف الأذنين، الرقبة، والمرفقين.',
            reviews: [
                {
                    id: 7,
                    userName: 'سلمى أحمد',
                    rating: 5,
                    date: '2023-09-25',
                    text: 'رائحة صيفية رائعة، أنصح به للاستخدام اليومي.'
                }
            ],
            ratingDistribution: [3, 4, 2, 1, 0]
        },
        
        // Children's Products (6-7)
        6: {
            id: 6,
            name: 'Kids Fresh',
            price: 3000,
            originalPrice: 4100,
            discount: 27,
            description: 'عطر لطيف ومناسب للأطفال، مصنوع من مكونات آمنة على البشرة الحساسة.',
            images: [
                'https://cdn.salla.sa/VjBwP/uP4iU3yY7nDiCpq6AwaRN2wYSTT3QSq0V4L7TYTv.jpg',
                'https://cdn.salla.sa/QXXNw/84L3FhxjK3ljpHQ2C1vhfLFYlKYcpklRbhp3KpMG.jpg',
                'https://d1aq4ubbxe020v.cloudfront.net/image/product/27849/27720504_1727959345_dc557617066c9bb85dea536097f17e0c-500x500.png'
            ],
            scentProfile: ['تفاح', 'إجاص', 'فانيليا خفيفة'],
            rating: 4.8,
            reviewCount: 64,
            inStock: true,
            ingredients: 'كحول نقي، عطر، ماء، مواد حافظة آمنة للأطفال',
            howToUse: 'رش كمية صغيرة على الملابس أو الجسم من مسافة 20 سم',
            reviews: [
                {
                    id: 8,
                    userName: 'أم محمد',
                    rating: 5,
                    date: '2023-10-15',
                    text: 'رائحة لطيفة جداً وآمنة لطفلي. أنصح به.'
                }
            ],
            ratingDistribution: [5, 4, 3, 2, 1]
        },
        7: {
            id: 7,
            name: 'Little Princess',
            price: 2500,
            originalPrice: 3500,
            discount: 29,
            description: 'عطر لطيف وعصري مصمم خصيصاً للأطفال، برائحة فواكه منعشة.',
            images: [
                'https://cdn.salla.sa/raObG/56392a44-caa9-46bf-b24a-52ed33a31bb2-1000x1000-4UOFqtkt7lF5tg5qXzfzWfvq9aUH8LcNbB4K9kt8.jpg',
                'images/fresh 5.jpg',
                'images/61onRiIyBYL._UF350,350_QL80_.jpg'
            ],
            scentProfile: ['فراولة', 'توت', 'فانيليا'],
            rating: 4.9,
            reviewCount: 87,
            inStock: true,
            ingredients: 'كحول نقي، عطر، ماء، مواد حافظة آمنة للأطفال',
            howToUse: 'رش كمية صغيرة على الملابس أو الجسم من مسافة 20 سم',
            reviews: [
                {
                    id: 9,
                    userName: 'أم علي',
                    rating: 5,
                    date: '2023-10-12',
                    text: 'ابنتي تحبه جداً، ورائحته تدوم طويلاً.'
                }
            ],
            ratingDistribution: [4, 5, 2, 1, 0]
        },
        
        // Special Offers Products (8-13)
        8: {
            id: 8,
            name: 'Luxury Floral',
            price: 49.99,
            originalPrice: 99.99,
            discount: 50,
            description: 'عطر فاخر يجمع بين الزهور النادرة والعنبر. رائحة أنثوية جذابة تدوم طويلاً.',
            images: [
                'https://luxuryperfume.com/cdn/shop/files/1_425x_1_425x_5f6937f6-fce3-4b53-b0a6-5911473cfdd8.jpg',
                'https://i.pinimg.com/736x/f7/d7/6f/f7d76fb14ea168a9d00835fadc058265.jpg'
            ],
            scentProfile: ['ياسمين', 'ورد', 'عنب', 'مسك'],
            rating: 4.8,
            reviewCount: 215,
            inStock: true,
            ingredients: 'كحول نقي، عطر، ماء، مواد حافظة',
            howToUse: 'رشي العطر على نقاط النبض: المعصمين، خلف الأذنين، الرقبة، والمرفقين.',
            reviews: [
                {
                    id: 10,
                    userName: 'هناء سعيد',
                    rating: 5,
                    date: '2023-10-18',
                    text: 'رائحة ساحرة وتدوم طوال اليوم. أنصح به بشدة!'
                }
            ],
            ratingDistribution: [5, 4, 3, 2, 1]
        },
        9: {
            id: 9,
            name: 'Summer Breeze Special',
            price: 59.99,
            originalPrice: 119.99,
            discount: 50,
            description: 'عطر صيفي منعش يجمع بين الحمضيات والزهور البيضاء. مثالي لأيام الصيف الحارة.',
            images: [
                'https://i.pinimg.com/736x/f7/d7/6f/f7d76fb14ea168a9d00835fadc058265.jpg',
                'https://cdn.create.vista.com/downloads/8b07f659-a993-4390-b195-f41095f3dbfa_1024.jpeg'
            ],
            scentProfile: ['برتقال', 'يوسفي', 'ياسمين', 'مسك أبيض'],
            rating: 4.7,
            reviewCount: 189,
            inStock: true,
            ingredients: 'كحول نقي، عطر، ماء، مواد حافظة',
            howToUse: 'رشي العطر على نقاط النبض: المعصمين، خلف الأذنين، الرقبة، والمرفقين.',
            reviews: [
                {
                    id: 11,
                    userName: 'نورا خالد',
                    rating: 5,
                    date: '2023-10-17',
                    text: 'رائحة صيفية رائعة، أنصح به للاستخدام اليومي.'
                }
            ],
            ratingDistribution: [4, 5, 3, 2, 1]
        },
        10: {
            id: 10,
            name: 'Fresh Citrus',
            price: 39.99,
            originalPrice: 79.99,
            discount: 50,
            description: 'عطر منعش يجمع بين الحمضيات والنوتات الخشبية الدافئة. مثالي للاستخدام اليومي.',
            images: [
                'https://cdn.create.vista.com/downloads/8b07f659-a993-4390-b195-f41095f3dbfa_1024.jpeg',
                'https://img.freepik.com/free-vector/perfume-poster-template-vector-sale-promotion_53876-136619.jpg'
            ],
            scentProfile: ['برتقال', 'ليمون', 'جريب فروت', 'خشب الصندل'],
            rating: 4.5,
            reviewCount: 156,
            inStock: true,
            ingredients: 'كحول نقي، عطر، ماء، مواد حافظة',
            howToUse: 'رش العطر على نقاط النبض: المعصمين، خلف الأذنين، والرقبة.',
            reviews: [
                {
                    id: 12,
                    userName: 'أحمد محمد',
                    rating: 4,
                    date: '2023-10-16',
                    text: 'رائحة منعشة وجميلة، أنصح به.'
                }
            ],
            ratingDistribution: [3, 4, 5, 2, 1]
        },
        11: {
            id: 11,
            name: 'Woody Elegance',
            price: 69.99,
            originalPrice: 139.99,
            discount: 50,
            description: 'عطر رجالي أنيق يجمع بين روائح الخشب والتوابل. مثالي للاستخدام اليومي والمناسبات الخاصة.',
            images: [
                'https://img.freepik.com/free-vector/perfume-poster-template-vector-sale-promotion_53876-136619.jpg',
                'https://media.buywow.in/public/22964697-2f73-4d49-b91a-67cdde4ffd91?w=100&q=75&f=webp'
            ],
            scentProfile: ['خشب الصندل', 'فانيليا', 'فلفل أسود', 'ليمون'],
            rating: 4.6,
            reviewCount: 178,
            inStock: true,
            ingredients: 'كحول نقي، عطر، ماء، مواد حافظة',
            howToUse: 'رش العطر على نقاط النبض: المعصمين، خلف الأذنين، والرقبة.',
            reviews: [
                {
                    id: 13,
                    userName: 'خالد أحمد',
                    rating: 5,
                    date: '2023-10-15',
                    text: 'رائحة رائعة وتدوم طويلاً. أنصح به بشدة!'
                }
            ],
            ratingDistribution: [4, 5, 3, 2, 1]
        },
        12: {
            id: 12,
            name: 'Floral Delight',
            price: 44.99,
            originalPrice: 89.99,
            discount: 50,
            description: 'عطر نسائي رائع يجمع بين الزهور البرية والفواكه الحمضية. رائحة أنثوية جذابة تدوم طويلاً.',
            images: [
                'https://media.buywow.in/public/22964697-2f73-4d49-b91a-67cdde4ffd91?w=100&q=75&f=webp',
                'https://media.buywow.in/public/2d49787b-0e52-4b9f-bb10-945709704aed?w=100&q=75&f=webp'
            ],
            scentProfile: ['ياسمين', 'ورد', 'برتقال', 'فانيلا'],
            rating: 4.7,
            reviewCount: 165,
            inStock: true,
            ingredients: 'كحول نقي، عطر، ماء، مواد حافظة',
            howToUse: 'رشي العطر على نقاط النبض: المعصمين، خلف الأذنين، الرقبة، والمرفقين.',
            reviews: [
                {
                    id: 14,
                    userName: 'سارة خالد',
                    rating: 5,
                    date: '2023-10-14',
                    text: 'رائحة ساحرة وتدوم طوال اليوم. أنصح به بشدة!'
                }
            ],
            ratingDistribution: [5, 4, 3, 2, 1]
        },
        13: {
            id: 13,
            name: 'Citrus Splash',
            price: 54.99,
            originalPrice: 109.99,
            discount: 50,
            description: 'عطر منعش يجمع بين الحمضيات والنوتات الخشبية الدافئة. مثالي للاستخدام اليومي.',
            images: [
                'https://media.buywow.in/public/2d49787b-0e52-4b9f-bb10-945709704aed?w=100&q=75&f=webp',
                'https://luxuryperfume.com/cdn/shop/files/1_425x_1_425x_5f6937f6-fce3-4b53-b0a6-5911473cfdd8.jpg'
            ],
            scentProfile: ['برتقال', 'يوسفي', 'جريب فروت', 'خشب الصندل'],
            rating: 4.4,
            reviewCount: 142,
            inStock: true,
            ingredients: 'كحول نقي، عطر، ماء، مواد حافظة',
            howToUse: 'رش العطر على نقاط النبض: المعصمين، خلف الأذنين، والرقبة.',
            reviews: [
                {
                    id: 15,
                    userName: 'محمد علي',
                    rating: 4,
                    date: '2023-10-13',
                    text: 'رائحة منعشة وجميلة، أنصح به.'
                }
            ],
            ratingDistribution: [3, 4, 5, 2, 1]
        }
    };

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product') || 1; // Default to product 1 if no ID provided
    const product = products[productId] || products[1]; // Fallback to first product if ID not found

    // DOM Elements
    const mainImage = document.getElementById('mainProductImage');
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    const productTitle = document.getElementById('productTitle');
    const productPrice = document.getElementById('productPrice');
    const originalPrice = document.getElementById('originalPrice');
    const productDescription = document.getElementById('productDescription');
    const scentTagsContainer = document.getElementById('scentTags');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const quantityInput = document.getElementById('quantity');
    const increaseQtyBtn = document.getElementById('increaseQty');
    const decreaseQtyBtn = document.getElementById('decreaseQty');
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');
    const averageRatingDisplay = document.querySelector('.average-rating-display .display-4');
    const reviewCountElements = document.querySelectorAll('.review-count');
    const ratingBarsContainer = document.querySelector('.rating-bars');

    // Initialize the page with product data
    function initializeProductPage() {
        // Set product details
        productTitle.textContent = product.name;
        productPrice.textContent = `${product.price} ج.م`;
        
        if (product.originalPrice > product.price) {
            originalPrice.textContent = `${product.originalPrice} ج.م`;
        } else {
            originalPrice.style.display = 'none';
        }
        
        productDescription.textContent = product.description;
        
        // Set main image
        if (product.images.length > 0) {
            mainImage.src = product.images[0];
            mainImage.alt = product.name;
            
            // Create thumbnails
            product.images.forEach((image, index) => {
                const thumbnail = document.createElement('div');
                thumbnail.className = 'thumbnail' + (index === 0 ? ' active' : '');
                thumbnail.innerHTML = `<img src="${image}" alt="${product.name} - ${index + 1}">`;
                thumbnail.addEventListener('click', () => {
                    mainImage.src = image;
                    document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
                    thumbnail.classList.add('active');
                });
                thumbnailContainer.appendChild(thumbnail);
            });
        }
        
        // Set scent tags
        product.scentProfile.forEach(scent => {
            const tag = document.createElement('span');
            tag.className = 'scent-tag';
            tag.textContent = `#${scent}`;
            scentTagsContainer.appendChild(tag);
        });
        
        // Set rating
        updateRatingDisplay();
        
        // Set up rating bars
        setupRatingBars();
        
        // Display reviews
        displayReviews();
    }
    
    // Update rating display
    function updateRatingDisplay() {
        const stars = document.querySelectorAll('.stars .fas');
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 >= 0.5;
        
        stars.forEach((star, index) => {
            if (index < fullStars) {
                star.style.color = '#ffd700';
            } else if (index === fullStars && hasHalfStar) {
                star.style.color = '#ffd700';
            } else {
                star.style.color = '#ddd';
            }
        });
        
        document.querySelector('.average-rating').textContent = product.rating.toFixed(1);
        averageRatingDisplay.textContent = product.rating.toFixed(1);
        
        reviewCountElements.forEach(element => {
            element.textContent = product.reviewCount;
        });
    }
    
    // Set up rating bars
    function setupRatingBars() {
        const totalRatings = product.ratingDistribution.reduce((sum, count) => sum + count, 0);
        
        for (let i = 5; i >= 1; i--) {
            const ratingCount = product.ratingDistribution[5 - i] || 0;
            const percentage = totalRatings > 0 ? (ratingCount / totalRatings) * 100 : 0;
            
            const ratingBar = document.createElement('div');
            ratingBar.className = 'rating-bar';
            ratingBar.innerHTML = `
                <div class="rating-label">${i} نجوم</div>
                <div class="rating-progress">
                    <div class="rating-progress-bar" style="width: ${percentage}%"></div>
                </div>
                <div class="rating-count">${ratingCount}</div>
            `;
            
            ratingBarsContainer.appendChild(ratingBar);
        }
    }
    
    // Display reviews
    function displayReviews() {
        reviewsList.innerHTML = '';
        
        product.reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review-card';
            
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= review.rating) {
                    stars += '<i class="fas fa-star text-warning"></i>';
                } else {
                    stars += '<i class="far fa-star text-muted"></i>';
                }
            }
            
            reviewElement.innerHTML = `
                <div class="review-header">
                    <div>
                        <div class="reviewer-name">${review.userName}</div>
                        <div class="review-date">${review.date}</div>
                    </div>
                    <div class="review-stars">
                        ${stars}
                    </div>
                </div>
                <div class="review-text">
                    ${review.text}
                </div>
            `;
            
            reviewsList.appendChild(reviewElement);
        });
    }
    
    // Event Listeners
    increaseQtyBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });
    
    decreaseQtyBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    // Star rating interaction
    const ratingInputs = document.querySelectorAll('.rating-input i');
    let selectedRating = 0;
    
    ratingInputs.forEach(star => {
        star.addEventListener('mouseover', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            highlightStars(rating);
        });
        
        star.addEventListener('mouseout', () => {
            highlightStars(selectedRating || 0);
        });
        
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-rating'));
            document.getElementById('userRating').value = selectedRating;
            highlightStars(selectedRating);
        });
    });
    
    function highlightStars(count) {
        ratingInputs.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= count) {
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    }
    
    // Submit review
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userName = document.getElementById('userName').value;
            const reviewText = document.getElementById('reviewText').value;
            const userRating = document.getElementById('userRating').value;
            
            if (!userName || !reviewText || !userRating) {
                alert('الرجاء إكمال جميع الحقول المطلوبة');
                return;
            }
            
            // Create new review
            const newReview = {
                id: Date.now(),
                userName: userName,
                rating: parseInt(userRating),
                date: new Date().toISOString().split('T')[0],
                text: reviewText
            };
            
            // Add to reviews array
            product.reviews.unshift(newReview);
            
            // Update rating distribution
            product.ratingDistribution[5 - newReview.rating]++;
            
            // Update average rating
            const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
            product.rating = totalRating / product.reviews.length;
            product.reviewCount = product.reviews.length;
            
            // Update display
            updateRatingDisplay();
            displayReviews();
            
            // Reset form
            reviewForm.reset();
            selectedRating = 0;
            highlightStars(0);
            
            // Show success message
            alert('شكراً لتقييمك! تم إضافة تقييمك بنجاح.');
        });
    }
    
    // Add to cart functionality
    addToCartBtn.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: quantity
        };
        
        // In a real app, you would add this to the cart in your state management
        console.log('Added to cart:', cartItem);
        
        // Show success message
        alert(`تمت إضافة ${quantity} من ${product.name} إلى سلة التسوق`);
    });
    
    // Initialize the page
    initializeProductPage();
});
