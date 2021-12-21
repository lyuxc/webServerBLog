const fs = require('fs')
const path = require('path')

// 写日志
function writeLog(writeSteam, log) {
    writeSteam.write(log + '\n') // 关键代码
}
// 生成 write Stream
function createWriteSteam(fileName) {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const writeSteam = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeSteam
}

// 写访问日志
const accessWriteStream = createWriteSteam('access.log')
function access(log) {
    // console.log('access------', log)
    writeLog(accessWriteStream, log)
}

module.exports = {
    access
}