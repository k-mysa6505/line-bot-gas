// チャネルアクセストークン
const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN');
// LINEのURL
const LINE_URL = 'https://api.line.me/v2/bot/message/reply';

function doPost(e) {
  // 送られてきたデータの取り出し
  const json = JSON.parse(e.postData.contents);
  const data = json.events[0];

  // const message = createReplyMessage(data.message.text);
  const message = getTenki();

  // 返信メッセージの構築
  const option = {
    'headers': {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': data.replyToken,
      'messages': [{
        "type": "text",
        "text": message
      }],
    }),
  }

  UrlFetchApp.fetch(LINE_URL, option);
}

// 返信
function createReplyMessage(receivedMessage) {
  if (receivedMessage === 'おはよう') {
    return 'おはよう！今日も1日頑張ろう！';
  }
  if (receivedMessage === 'おやすみ') {
    return 'おやすみ．いい夢みてね．';
  }
  return receivedMessage;
}

// あしたの長野県の天気
function getTenki() {
  const result = UrlFetchApp.fetch('https://www.jma.go.jp/bosai/forecast/data/forecast/200000.json'); // 長野=200000，東京=130000
  const tenkiJson = JSON.parse(result);
  const tenki = tenkiJson[0].timeSeries[0].areas[0].weathers[1];
  return tenki;
}
