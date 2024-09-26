function addRule() {
    // 添加新的查找和替换规则
    const ruleContainer = document.getElementById('ruleContainer');
    const newRule = document.createElement('div');
    newRule.innerHTML = `查找: <input type="text" class="findText"> 替换为: <input type="text" class="replaceText">`;
    ruleContainer.appendChild(newRule);
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
