let AipOcrClient = require('baidu-aip-sdk').ocr;
let config = require('./config.js');
let fs = require('fs')

let client = new AipOcrClient(config.APP_ID, config.API_KEY, config.SECRET_KEY);

const options = {
    'language_type': 'CHN_ENG',
    'probability': 'true'
}

async function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 100);
    })
}

async function getText(base64) {
    await sleep(1000);
    // let image = fs.readFileSync("./test.png").toString("base64");

    // 测试
    // base64 = 'data:image/png;base64,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'

    let image = encodeURI(base64.replace(/.*base64,/, ''));
    let result = await client.generalBasic(image, options)
    let obj = result.words_result && result.words_result[0] && result.words_result[0] || {};
    let probability = obj.probability && obj.probability.min || 0;
    console.log(obj);
    return probability > 0.9 ? obj.words : '';
}

let json = fs.readFileSync("./code.json");
let codes = JSON.parse(json.toString())

let dist = {};

async function getAll(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
        console.log(new Date().toLocaleString())
        let text = await getText(arr[i].base64);
        dist[arr[i].code] = text.length === 1 ? text : '';
        // console.log(dist)
    }

    fs.writeFileSync('./result.json', JSON.stringify(dist, null, 4));
}

// 进行识别，成功率不太高，完成后手动检查修改
getAll(codes);
