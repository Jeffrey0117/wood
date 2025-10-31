/**
 * 開發中功能測試腳本
 * 測試運費試算和成本試算的彈窗功能
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🧪 開發中功能測試腳本啟動...');
    
    setTimeout(() => {
        // 測試：找出運費試算和成本試算的選單項目
        const menuItems = document.querySelectorAll('.kt-menu-title');
        let developingCount = 0;
        
        menuItems.forEach((item) => {
            const text = item.textContent.trim().replace('⭣', '');
            
            if (text === '運費試算' || text === '成本試算') {
                developingCount++;
                console.log(`🚧 找到開發中功能: ${text}`);
                
                // 添加測試樣式
                item.style.border = '2px dashed orange';
                item.style.padding = '2px';
                item.style.backgroundColor = 'rgba(255, 165, 0, 0.1)';
                
                // 檢查是否已經設定了正確的樣式和事件
                if (item.style.opacity === '0.7') {
                    console.log(`✅ ${text} - 樣式設定正確`);
                } else {
                    console.log(`⚠️ ${text} - 樣式可能未正確設定`);
                }
                
                if (item.title === '功能開發中，敬請期待') {
                    console.log(`✅ ${text} - Title設定正確`);
                } else {
                    console.log(`⚠️ ${text} - Title可能未正確設定`);
                }
            }
        });
        
        console.log(`✅ 開發中功能測試完成，共找到 ${developingCount} 個開發中功能`);
        
        // 測試 Footer 中的連結
        const footerLinks = document.querySelectorAll('footer a');
        let footerDevelopingCount = 0;
        
        footerLinks.forEach(link => {
            const text = link.textContent.trim();
            if (text === '運費試算' || text === '成本試算') {
                footerDevelopingCount++;
                console.log(`🚧 Footer找到開發中功能: ${text}`);
                
                link.style.border = '2px dashed orange';
                link.style.padding = '2px';
                link.style.backgroundColor = 'rgba(255, 165, 0, 0.1)';
            }
        });
        
        console.log(`✅ Footer開發中功能測試完成，共找到 ${footerDevelopingCount} 個`);
        
    }, 1000);
});