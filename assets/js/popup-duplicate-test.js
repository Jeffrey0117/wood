/**
 * 彈窗重複問題測試腳本
 * 測試是否還會出現多次彈窗的問題
 */

console.log('🔧 彈窗重複問題測試開始...');

// 計算彈窗次數
let alertCount = 0;
const originalAlert = window.alert;
const originalConfirm = window.confirm;

// 攔截 alert 和 confirm
window.alert = function(message) {
    alertCount++;
    console.log(`🚨 Alert #${alertCount}:`, message);
    
    if (alertCount > 3) {
        console.error('❌ 檢測到過多彈窗！可能存在重複綁定問題');
        return;
    }
    
    return originalAlert(message);
};

window.confirm = function(message) {
    alertCount++;
    console.log(`🚨 Confirm #${alertCount}:`, message);
    
    if (alertCount > 3) {
        console.error('❌ 檢測到過多彈窗！可能存在重複綁定問題');
        return false;
    }
    
    return originalConfirm(message);
};

// 監控事件監聽器的添加
let eventListenerCount = 0;
const originalAddEventListener = EventTarget.prototype.addEventListener;

EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (type === 'click' && (
        this.textContent?.includes('運費試算') || 
        this.textContent?.includes('成本試算')
    )) {
        eventListenerCount++;
        console.log(`🎯 為開發中功能添加事件監聽器 #${eventListenerCount}:`, this.textContent.trim(), type);
        
        if (eventListenerCount > 10) {
            console.error('❌ 檢測到過多事件監聽器！可能存在重複綁定');
        }
    }
    
    return originalAddEventListener.call(this, type, listener, options);
};

// 5秒後報告結果
setTimeout(() => {
    console.log(`📊 測試結果 - 彈窗次數: ${alertCount}, 事件監聽器: ${eventListenerCount}`);
    
    if (alertCount === 0 && eventListenerCount <= 4) {
        console.log('✅ 測試通過！沒有檢測到重複彈窗問題');
    } else if (alertCount > 3 || eventListenerCount > 10) {
        console.error('❌ 測試失敗！仍存在重複彈窗或事件綁定問題');
    } else {
        console.log('⚠️ 測試部分通過，請手動測試確認');
    }
}, 5000);