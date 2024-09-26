const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// 提供静态文件服务
app.use(express.static('public'));

// 获取 note 文件夹中的所有文件
app.get('../notes', (req, res) => {
    const notesDir = path.join(__dirname, 'public/note');
    
    // 读取 note 文件夹中的文件名
    fs.readdir(notesDir, (err, files) => {
        if (err) {
            console.error('Error reading note directory:', err);
            return res.status(500).send('Server error');
        }
        
        // 只返回 .html 文件
        const htmlFiles = files.filter(file => path.extname(file) === '.html');
        
        res.json(htmlFiles);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
