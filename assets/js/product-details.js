/**
 * 商品詳情頁互動功能
 * Product Details Interactive Features
 */

(function() {
  'use strict';

  // 初始化商品詳情功能
  function initProductDetails() {
    const drawer = document.getElementById('drawers_shop_product_details');
    if (!drawer) return;

    // 1. 縮圖輪播切換功能
    initThumbnailCarousel(drawer);

    // 2. 顏色選擇功能
    initColorSelector(drawer);

    // 3. 規格選擇功能
    initSizeSelector(drawer);

    // 4. 商品數量控制
    initQuantityControls(drawer);

    // 5. 加入最愛按鈕
    initFavoriteButton(drawer);
  }

  /**
   * 縮圖輪播切換功能
   */
  function initThumbnailCarousel(drawer) {
    const mainImage = drawer.querySelector('.main-image');
    const thumbnails = drawer.querySelectorAll('.thumbnail-item');
    
    if (!mainImage || !thumbnails.length) return;

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', function() {
        // 移除所有縮圖的 active 類別
        thumbnails.forEach(t => {
          t.classList.remove('active');
          t.classList.remove('border-primary');
          t.classList.add('border-gray-400');
        });

        // 添加 active 類別到當前縮圖
        this.classList.add('active');
        this.classList.remove('border-gray-400', 'hover:border-gray-600');
        this.classList.add('border-primary');

        // 切換主圖
        const thumbnailImg = this.querySelector('img');
        if (thumbnailImg) {
          mainImage.src = thumbnailImg.src;
          mainImage.alt = thumbnailImg.alt;
          
          // 添加淡入動畫
          mainImage.style.opacity = '0';
          setTimeout(() => {
            mainImage.style.transition = 'opacity 0.3s ease';
            mainImage.style.opacity = '1';
          }, 10);
        }
      });
    });

    // 左右箭頭導航
    const prevBtn = drawer.querySelector('.carousel-prev');
    const nextBtn = drawer.querySelector('.carousel-next');
    let currentIndex = 0;

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        thumbnails[currentIndex].click();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        thumbnails[currentIndex].click();
      });
    }
  }

  /**
   * 顏色選擇功能
   */
  function initColorSelector(drawer) {
    const colorButtons = drawer.querySelectorAll('.color-btn');
    
    if (!colorButtons.length) return;

    colorButtons.forEach(button => {
      button.addEventListener('click', function() {
        // 移除所有按鈕的選中狀態並恢復 hover 效果
        colorButtons.forEach(btn => {
          btn.classList.remove('bg-primary', 'text-white', 'border-primary');
          btn.classList.add('bg-white', 'border-gray-300', 'hover:bg-gray-100');
        });

        // 添加選中狀態到當前按鈕並移除 hover 效果
        this.classList.remove('bg-white', 'border-gray-300', 'hover:bg-gray-100');
        this.classList.add('bg-primary', 'text-white', 'border-primary');
      });
    });
  }

  /**
   * 規格選擇功能
   */
  function initSizeSelector(drawer) {
    const sizeButtons = drawer.querySelectorAll('.size-btn');
    
    if (!sizeButtons.length) return;

    sizeButtons.forEach(button => {
      button.addEventListener('click', function() {
        // 移除所有按鈕的選中狀態和 hover 效果
        sizeButtons.forEach(btn => {
          btn.classList.remove('bg-primary', 'text-white', 'border-primary');
          btn.classList.add('bg-white', 'border-gray-300', 'hover:bg-gray-100');
        });

        // 添加選中狀態到當前按鈕並移除 hover 效果
        this.classList.remove('bg-white', 'border-gray-300', 'hover:bg-gray-100');
        this.classList.add('bg-primary', 'text-white', 'border-primary');
      });
    });
  }

  /**
   * 商品數量控制
   */
  function initQuantityControls(drawer) {
    const quantitySection = drawer.querySelector('.inline-flex.items-center.gap-4');
    if (!quantitySection) return;

    const quantityDisplay = quantitySection.querySelector('span.w-10');
    const decreaseBtn = quantitySection.querySelector('button[aria-label="減少"]');
    const increaseBtn = quantitySection.querySelector('button[aria-label="增加"]');

    if (!quantityDisplay || !decreaseBtn || !increaseBtn) return;

    let quantity = 1;

    // 減少數量
    decreaseBtn.addEventListener('click', function() {
      if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
        
        // 如果數量等於1,禁用減少按鈕的視覺效果
        if (quantity === 1) {
          this.classList.add('opacity-50', 'cursor-not-allowed');
        }
      }
    });

    // 增加數量
    increaseBtn.addEventListener('click', function() {
      quantity++;
      quantityDisplay.textContent = quantity;
      
      // 確保減少按鈕可用
      decreaseBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    });

    // 初始化減少按鈕狀態
    decreaseBtn.classList.add('opacity-50', 'cursor-not-allowed');
  }

  /**
   * 加入最愛按鈕
   */
  function initFavoriteButton(drawer) {
    const favoriteBtn = drawer.querySelector('button[type="button"]:has(svg path[d*="12.1 8.64"])');
    
    if (!favoriteBtn) return;

    let isFavorite = false;

    favoriteBtn.addEventListener('click', function() {
      isFavorite = !isFavorite;

      const svg = this.querySelector('svg');
      const path = svg ? svg.querySelector('path') : null;

      if (isFavorite) {
        // 已加入最愛狀態
        this.classList.remove('bg-white', 'border-gray-300');
        this.classList.add('bg-red-50', 'border-red-500', 'text-red-600');
        
        if (path) {
          path.setAttribute('fill', 'currentColor');
          path.setAttribute('stroke', 'none');
        }

        // 更新按鈕文字
        const textNode = Array.from(this.childNodes).find(node => 
          node.nodeType === Node.TEXT_NODE && node.textContent.includes('加入最愛')
        );
        if (textNode) {
          textNode.textContent = '已加入最愛';
        }
      } else {
        // 未加入最愛狀態
        this.classList.remove('bg-red-50', 'border-red-500', 'text-red-600');
        this.classList.add('bg-white', 'border-gray-300');
        
        if (path) {
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke', 'currentColor');
        }

        // 更新按鈕文字
        const textNode = Array.from(this.childNodes).find(node => 
          node.nodeType === Node.TEXT_NODE && node.textContent.includes('已加入最愛')
        );
        if (textNode) {
          textNode.textContent = '加入最愛';
        }
      }
    });
  }

  // 當抽屜打開時初始化功能
  document.addEventListener('DOMContentLoaded', function() {
    // 監聽所有觸發商品詳情抽屜的按鈕
    const triggers = document.querySelectorAll('[data-kt-drawer-toggle="#drawers_shop_product_details"]');
    
    triggers.forEach(trigger => {
      trigger.addEventListener('click', function() {
        // 延遲初始化以確保抽屜已經打開
        setTimeout(initProductDetails, 100);
      });
    });
  });

})();