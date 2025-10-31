/**
 * 彈窗單次測試腳本
 * 測試運費試算和成本試算是否只彈窗一次
 */

console.log('🔧 彈窗單次測試開始...');

// 攔截showDevelopingAlert函數
let alertCallCount = 0;
const originalShowDevelopingAlert = window.NavigationHelper?.showDevelopingAlert;

if (originalShowDevelopingAlert) {
    window.NavigationHelper.showDevelopingAlert = function(featureName) {
        alertCallCount++;
        console.log(`🚨 showDevelopingAlert 被調用 #${alertCallCount} - 功能: ${featureName}`);
        
        if (alertCallCount > 1) {
            console.error('❌ 檢測到重複調用showDevelopingAlert！');
        }
        
        // 調用原始函數
        return originalShowDevelopingAlert.apply(this, arguments);
    };
}

// 監控原生alert調用
let nativeAlertCount = 0;
const originalAlert = window.alert;

window.alert = function(message) {
    nativeAlertCount++;
    console.log(`🚨 原生 alert 被調用 #${nativeAlertCount}:`, message);
    
    if (nativeAlertCount > 1) {
        console.error('❌ 檢測到重複的原生alert調用！');
    }
    
    return originalAlert.apply(this, arguments);
};

// 5秒後重置計數器，為下一次測試做準備
setInterval(() => {
    if (alertCallCount > 0 || nativeAlertCount > 0) {
        console.log(`📊 重置計數器 - showDevelopingAlert: ${alertCallCount}, 原生alert: ${nativeAlertCount}`);
        alertCallCount = 0;
        nativeAlertCount = 0;
    }
}, 5000);

console.log('✅ 彈窗單次測試腳本已載入，請點擊運費試算或成本試算進行測試');