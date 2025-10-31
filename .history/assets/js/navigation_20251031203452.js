/**
 * 導航功能 JavaScript
 * 處理網站主選單的頁面跳轉
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // 導航選單對應關係
    const navigationMapping = {
        '網站規則': 'refund.html',
        '品牌合作': 'brands.html',
        'Q&A': 'faq.html',
        '商品瀏覽': 'search-results-grid.html',
        '運費試算': 'search-results-grid.html',
        '成本試算': 'search-results-grid.html'
    };
    
    console.log('🔧 導航系統初始化開始...', navigationMapping);

    // 處理主選單點擊事件
    function setupMainNavigation() {
        console.log('🔧 設定主選單導航...');
        
        // 方法1: 針對 navbar 中的主選單項目
        const navbarMenuItems = document.querySelectorAll('#mega_menu > .kt-menu-item');
        console.log('找到選單項目數量:', navbarMenuItems.length);
        
        navbarMenuItems.forEach((menuItem, index) => {
            const titleElement = menuItem.querySelector('.kt-menu-title');
            if (!titleElement) return;
            
            const menuText = titleElement.textContent.trim().replace('⭣', ''); // 移除下拉箭頭符號
            console.log(`選單項目 ${index + 1}:`, menuText);
            
            if (navigationMapping[menuText]) {
                console.log('✅ 配置導航:', menuText, '→', navigationMapping[menuText]);
                
                const menuLink = menuItem.querySelector('.kt-menu-link');
                if (menuLink) {
                    // 添加視覺提示
                    menuLink.style.cursor = 'pointer';
                    menuLink.title = `點擊跳轉到${navigationMapping[menuText]}`;
                    
                    // 創建新的點擊事件處理器
                    const clickHandler = function(e) {
                        // 只有點擊主選單標題時才跳轉
                        if (e.target === titleElement || titleElement.contains(e.target)) {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            const targetPage = navigationMapping[menuText];
                            console.log('🔗 執行跳轉:', menuText, '→', targetPage);
                            
                            // 平滑跳轉效果
                            smoothPageTransition(targetPage);
                        }
                    };
                    
                    // 添加事件監聽器
                    menuLink.addEventListener('click', clickHandler);
                    
                    // 也為標題元素單獨添加點擊事件
                    titleElement.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const targetPage = navigationMapping[menuText];
                        console.log('🔗 標題直接點擊跳轉:', menuText, '→', targetPage);
                        smoothPageTransition(targetPage);
                    });
                }
            }
        });
        
        // 方法2: 備用方案 - 直接查找所有包含對應文字的選單項目
        Object.keys(navigationMapping).forEach(menuText => {
            const elements = document.querySelectorAll('.kt-menu-title');
            elements.forEach(element => {
                if (element.textContent.trim().replace('⭣', '') === menuText) {
                    const parentItem = element.closest('.kt-menu-item');
                    if (parentItem && !parentItem.hasAttribute('data-nav-configured')) {
                        parentItem.setAttribute('data-nav-configured', 'true');
                        
                        element.style.cursor = 'pointer';
                        element.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            const targetPage = navigationMapping[menuText];
                            console.log('🔗 備用方案跳轉:', menuText, '→', targetPage);
                            smoothPageTransition(targetPage);
                        });
                    }
                }
            });
        });
    }

    // 處理 Logo 點擊跳轉
    function setupLogoNavigation() {
        console.log('🔧 設定 Logo 導航...');
        
        // 設定 Header 中的 Logo 點擊跳轉
        const headerLogos = document.querySelectorAll('h3:contains("LOGO"), .text-mono:contains("LOGO")');
        headerLogos.forEach(logo => {
            if (logo.textContent.trim() === 'LOGO') {
                logo.style.cursor = 'pointer';
                logo.style.transition = 'all 0.2s ease';
                logo.title = '點擊返回首頁';
                
                // 添加hover效果
                logo.addEventListener('mouseenter', function() {
                    this.style.opacity = '0.7';
                    this.style.transform = 'scale(1.02)';
                });
                
                logo.addEventListener('mouseleave', function() {
                    this.style.opacity = '1';
                    this.style.transform = 'scale(1)';
                });
                
                // 添加點擊事件
                logo.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🏠 Header Logo 點擊，跳轉到首頁');
                    smoothPageTransition('home.html');
                });
                
                console.log('✅ Header Logo 導航設定完成');
            }
        });
        
        // 更通用的方法：查找所有包含 "LOGO" 文字的元素
        const allLogos = document.querySelectorAll('*');
        allLogos.forEach(element => {
            if (element.textContent.trim() === 'LOGO' && 
                element.tagName !== 'SCRIPT' && 
                element.tagName !== 'STYLE' &&
                !element.hasAttribute('data-logo-configured')) {
                
                element.setAttribute('data-logo-configured', 'true');
                element.style.cursor = 'pointer';
                element.style.transition = 'all 0.2s ease';
                element.title = '點擊返回首頁';
                
                // 添加hover效果
                element.addEventListener('mouseenter', function() {
                    this.style.opacity = '0.7';
                    this.style.transform = 'scale(1.02)';
                });
                
                element.addEventListener('mouseleave', function() {
                    this.style.opacity = '1';
                    this.style.transform = 'scale(1)';
                });
                
                // 添加點擊事件
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🏠 Logo 點擊，跳轉到首頁');
                    smoothPageTransition('home.html');
                });
                
                console.log('✅ Logo 導航設定完成:', element.tagName, element.className);
            }
        });
    }

    // 處理 Footer 連結
    function setupFooterNavigation() {
        console.log('🔧 設定 Footer 導航...');
        const footerLinks = document.querySelectorAll('footer a');
        
        footerLinks.forEach(link => {
            const linkText = link.textContent.trim();
            
            switch(linkText) {
                case '網站規則':
                    link.href = 'refund.html';
                    break;
                case '品牌故事':
                    link.href = 'about.html';
                    break;
                case 'Q&A':
                    link.href = 'faq.html';
                    break;
                case '商品瀏覽':
                    link.href = 'products.html';
                    break;
                case '運費試算':
                case '成本試算':
                    link.href = 'search-results-grid.html';
                    break;
                case '品牌合作':
                    link.href = 'brands.html';
                    break;
                case '快速註冊':
                    link.href = '#register';
                    break;
                case '會員登入':
                    link.href = '#login';
                    break;
                case '聯絡我們':
                    link.href = '#contact';
                    break;
            }
        });
    }

    // 處理麵包屑導航
    function setupBreadcrumbNavigation() {
        // 根據當前頁面設定麵包屑
        const currentPage = window.location.pathname.split('/').pop();
        const breadcrumbContainer = document.querySelector('.breadcrumb');
        
        if (breadcrumbContainer) {
            let breadcrumbHTML = '<a href="home.html">首頁</a>';
            
            switch(currentPage) {
                case 'refund.html':
                    breadcrumbHTML += ' > <span>網站規則</span>';
                    break;
                case 'brands.html':
                    breadcrumbHTML += ' > <span>品牌合作</span>';
                    break;
                case 'faq.html':
                    breadcrumbHTML += ' > <span>Q&A</span>';
                    break;
                case 'products.html':
                    breadcrumbHTML += ' > <span>商品瀏覽</span>';
                    break;
                case 'about.html':
                    breadcrumbHTML += ' > <span>關於我們</span>';
                    break;
                case 'search-results-grid.html':
                    breadcrumbHTML += ' > <span>商品搜尋</span>';
                    break;
            }
            
            breadcrumbContainer.innerHTML = breadcrumbHTML;
        }
    }

    // 頁面載入完成後初始化所有導航功能
    function initializeNavigation() {
        setupLogoNavigation();      // 新增：設定Logo導航
        setupMainNavigation();
        setupFooterNavigation();
        setupBreadcrumbNavigation();
        
        console.log('✅ 導航系統初始化完成');
    }

    // 初始化導航
    initializeNavigation();

    // 處理動態載入的內容
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                initializeNavigation();
            }
        });
    });

    // 開始觀察DOM變化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

    // 頁面切換動畫效果
    function smoothPageTransition(targetUrl) {
        console.log('🎨 執行平滑頁面切換:', targetUrl);
        
        // 檢查目標頁面是否存在
        checkPageExists(targetUrl).then(exists => {
            if (exists) {
                document.body.style.opacity = '0.8';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 150);
            } else {
                console.warn('⚠️ 目標頁面不存在:', targetUrl);
                alert(`抱歉，頁面 ${targetUrl} 暫時無法訪問，請稍後再試。`);
            }
        }).catch(() => {
            // 如果檢查失敗，直接跳轉
            console.log('🔗 直接跳轉到:', targetUrl);
            window.location.href = targetUrl;
        });
    }
    
    // 檢查頁面是否存在
    function checkPageExists(url) {
        return fetch(url, { method: 'HEAD' })
            .then(response => response.ok)
            .catch(() => false);
    }

    // 導出函數供其他腳本使用
    window.NavigationHelper = {
        setupMainNavigation,
        setupFooterNavigation,
        setupBreadcrumbNavigation,
        smoothPageTransition,
        checkPageExists,
        navigationMapping
    };
    
    console.log('✅ 導航系統載入完成！可用功能:', Object.keys(window.NavigationHelper));