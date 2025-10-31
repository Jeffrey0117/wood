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
        '商品瀏覽': 'products.html',
        '運費試算': 'search-results-grid.html',
        '成本試算': 'search-results-grid.html'
    };

    // 處理主選單點擊事件
    function setupMainNavigation() {
        // 找到所有主選單項目
        const menuItems = document.querySelectorAll('.kt-menu-title');
        
        menuItems.forEach(item => {
            const menuText = item.textContent.trim().replace('⭣', ''); // 移除下拉箭頭符號
            
            if (navigationMapping[menuText]) {
                // 找到父層的連結元素
                const parentLink = item.closest('.kt-menu-item');
                if (parentLink) {
                    parentLink.style.cursor = 'pointer';
                    
                    parentLink.addEventListener('click', function(e) {
                        // 如果點擊的是主選單標題，進行跳轉
                        if (e.target === item || item.contains(e.target)) {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            const targetPage = navigationMapping[menuText];
                            window.location.href = targetPage;
                        }
                    });
                }
            }
        });
    }

    // 處理 Footer 連結
    function setupFooterNavigation() {
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
        setupMainNavigation();
        setupFooterNavigation();
        setupBreadcrumbNavigation();
        
        console.log('導航系統初始化完成');
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

// 頁面切換動畫效果（可選）
function smoothPageTransition(targetUrl) {
    document.body.style.opacity = '0.8';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 150);
}

// 檢查頁面是否存在的函數
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
    checkPageExists
};