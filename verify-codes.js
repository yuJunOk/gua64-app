// 验证脚本：检查64卦码是否唯一
const fs = require('fs');

// 读取实际的data.ts文件内容
const dataContent = fs.readFileSync('./src/data.ts', 'utf-8');

// 提取所有卦码
const codeMatches = dataContent.match(/code:\s*'[01]{6}'/g);
const hexagrams = [];

if (codeMatches) {
    // 同时提取name和code
    const entryMatches = dataContent.match(/\{[\s\S]*?id:\s*\d+,[\s\S]*?name:\s*'[^']+',[\s\S]*?code:\s*'[01]{6}'[\s\S]*?\}/g);
    if (entryMatches) {
        entryMatches.forEach(entry => {
            const idMatch = entry.match(/id:\s*(\d+)/);
            const nameMatch = entry.match(/name:\s*'([^']+)'/);
            const codeMatch = entry.match(/code:\s*'([01]{6})'/);
            if (idMatch && nameMatch && codeMatch) {
                hexagrams.push({
                    id: parseInt(idMatch[1]),
                    name: nameMatch[1],
                    code: codeMatch[1]
                });
            }
        });
    }
}

// 检查重复
const codeMap = new Map();
const duplicates = [];

hexagrams.forEach(h => {
    if (codeMap.has(h.code)) {
        duplicates.push({
            code: h.code,
            first: codeMap.get(h.code),
            second: { id: h.id, name: h.name }
        });
    } else {
        codeMap.set(h.code, { id: h.id, name: h.name });
    }
});

console.log('=== 64卦码唯一性验证结果 ===\n');
console.log(`总卦数: ${hexagrams.length}`);
console.log(`唯一卦码数: ${codeMap.size}`);

if (duplicates.length === 0) {
    console.log('\n✅ 所有卦码都是唯一的！');
} else {
    console.log(`\n❌ 发现 ${duplicates.length} 个重复卦码:`);
    duplicates.forEach(d => {
        console.log(`  卦码 ${d.code}: ${d.first.name}(id:${d.first.id}) 和 ${d.second.name}(id:${d.second.id})`);
    });
}

// 显示所有卦码
console.log('\n=== 所有卦码列表 ===');
hexagrams.sort((a, b) => a.id - b.id).forEach(h => {
    console.log(`${h.id.toString().padStart(2)}. ${h.name.padEnd(3)} - ${h.code}`);
});
