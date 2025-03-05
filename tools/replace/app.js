function addRule(find = '', replace = '') {
    // 添加新的查找和替换规则
    const ruleContainer = document.getElementById('ruleContainer');
    const newRule = document.createElement('div');
    newRule.innerHTML = `查找: <input type="text" class="findText" value="${find}"> 替换为: <input type="text" class="replaceText" value="${replace}">`;
    ruleContainer.appendChild(newRule);
}

function loadPresetRules() {
    console.log("加载预设规则..."); // 调试日志
    const ruleContainer = document.getElementById('ruleContainer');
    if (!ruleContainer) {
        console.error("未找到 ruleContainer 元素！");
        return;
    }
    ruleContainer.innerHTML = ''; // 清空默认的静态规则

    // 预设一些常用规则
    const presetRules = [
        { find: '+', replace: '&"+"&' },
        { find: '-', replace: '&"-"&' },
        { find: '*', replace: '&"×"&' },
        { find: '/', replace: '&"÷"&' },
        { find: '=', replace: '&"="&' },
        { find: '(', replace: '&"("&' },
        { find: ')', replace: '&")"&' },
        { find: '[', replace: '&"["&' },
        { find: ']', replace: '&"]"&' },
        { find: '^', replace: '&"^"&' }
    ];
    
    // 添加预设规则
    presetRules.forEach(rule => {
        console.log(`添加规则: ${rule.find} -> ${rule.replace}`); // 调试日志
        addRule(rule.find, rule.replace);
    });
}

function escapeRegExp(string) {
    // 转义正则表达式特殊字符
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceText() {
    const inputText = document.getElementById('inputText').value;
    const caseSensitive = document.getElementById('caseSensitive').checked;
    const multiReplace = document.getElementById('multiReplace').checked;

    // 获取所有查找和替换规则
    const findTexts = document.querySelectorAll('.findText');
    const replaceTexts = document.querySelectorAll('.replaceText');
    
    let outputText = inputText;

    // 根据选项执行替换
    for (let i = 0; i < findTexts.length; i++) {
        let findValue = findTexts[i].value;
        let replaceValue = replaceTexts[i].value;

        if (!findValue) continue; // 如果查找内容为空，跳过

        // 转义用户输入的正则表达式特殊字符
        findValue = escapeRegExp(findValue);

        // 创建正则表达式，根据是否区分大小写生成不同的匹配规则
        const flags = caseSensitive ? 'g' : 'gi';
        const regex = new RegExp(findValue, flags);

        // 如果多内容替换被选中，则进行全局替换，否则只替换第一个匹配项
        if (multiReplace) {
            outputText = outputText.replace(regex, replaceValue);
        } else {
            outputText = outputText.replace(regex, replaceValue);
        }
    }

    // 输出替换后的文本
    document.getElementById('outputText').value = outputText;
}

// 在 DOM 加载完成后添加预设规则
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM 加载完成，开始初始化...");
    loadPresetRules();
});
