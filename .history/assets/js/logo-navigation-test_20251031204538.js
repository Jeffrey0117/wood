/**
 * Logo 點擊跳轉測試腳本
 * 獨立測試logo點擊功能是否正常工作
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🧪 Logo 導航測試腳本啟動...');
    
    // 等待一小段時間確保DOM完全載入
    setTimeout(() => {
        
        // 測試：找出所有LOGO元素
        const allLogos = document.querySelectorAll('*');
        let logoCount = 0;
        
        allLogos.forEach((element, index) => {
            if (element.textContent.trim() === 'LOGO' && 
                element.tagName !== 'SCRIPT' && 
                element.tagName !== 'STYLE') {
                
                logoCount++;
                console.log(`🎯 找到Logo ${logoCount}:`, {
                    tagName: element.tagName,
                    className: element.className,
                    parent: element.parentElement?.tagName,
                    location: element.closest('header') ? 'Header' : 
                             element.closest('footer') ? 'Footer' : 'Other'
                });
                
                // 移除測試樣式，改為輕微的視覺提示
                // element.style.border = '2px dashed red';
                // element.style.padding = '2px';
                
                // 添加測試點擊事件
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('🖱️ Logo 點擊測試成功！', this.tagName, this.className);
                    
                    // 顯示確認對話框
                    if (confirm('Logo點擊功能正常！要跳轉到首頁嗎？')) {
                        window.location.href = 'home.html';
                    }
                });
            }
        });
        
        console.log(`✅ Logo 測試完成，共找到 ${logoCount} 個Logo元素`);
        
        if (logoCount === 0) {
            console.warn('⚠️ 未找到任何Logo元素！');
        }
        
    }, 500);
});