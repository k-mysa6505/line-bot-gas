# line-bot-gas

LINE Bot × Google Apps Script（GAS）で作る天気予報アプリ．

## 備忘録：初期設定など

### 1. LINE Developers

[LINE Developers](https://developers.line.biz/ja/)：LINE Botを作成するためのプラットフォーム．

1. LINEアカウントでログインし，LINE Developersコンソールにアクセス．
2. プロバイダー（Botを公開する開発者名/組織名）を作成．
3. 作成したプロバイダー内で「新規チャネル作成」をクリックし，「Messaging API」を選択．
4. 必要な情報（チャネル名，業種など）を入力し，チャネルを作成．
5. 作成したチャネルの「Messaging API設定」タブに移動．
6. 「チャネルアクセストークン」で，トークンを発行し，コピーする（GASからLINE APIにアクセスするために使用）．

### 2. Google Apps Script（GAS）

[Google Apps Script（GAS）](https://script.google.com/home?hl=ja)：Googleが提供するクラウドベースのプラットフォーム．

※複数のGoogleアカウントにログインしたままデプロイするとエラー？になるらしいので，すべてのアカウントでログアウトしてから，ひとつのアカウントでログインして行う．

1. GASの「新しいプロジェクト」をクリック．
2. LINEのアクセストークンをGASのスクリプトプロパティに保存．
    1. 「プロジェクトの設定」を選択．
    2. 「スクリプトプロパティ」で「スクリプトプロパティを追加」をクリック．
    3. プロパティにACCESS_TOKEN，値に1-3でコピーしたチャネルアクセストークンを設定，保存する．
3. Code.gsを作成．

```JavaScript
// GASコード内での取得方法
const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN');
```

### 3. デプロイ

GASのコードを外部（LINE）からアクセス可能なWebサービスとして公開する．

1. GASエディタの右上にある「デプロイ」→「新しいデプロイ」をクリック
2. 「種別の選択」で「ウェブアプリ」を選択．
3. 「アクセスできるユーザー」を全員に設定．
4. 「デプロイ」ボタンをクリック．
5. 「ウェブアプリのURL」をコピー．
6. LINE Developersコンソールの「Messaging API設定」に移動．
7. 「Webhook URL」の項目にURLを貼り付け，「検証」をクリック．
8. 「Webhookの利用」をオンにする．
9. 「応答設定」の項目で，「応答メッセージ」を無効にする．

※2回目以降のデプロイは，GASで「デプロイ」→「デプロイを管理」に移り，
右上の鉛筆マークを押して，バージョンを新バージョンに選択．
説明には変更内容を入力し，「デプロイ」をクリックする．
こうすることで，URLを変えずにプログラムを変更することができる．
5以降の順はいらない．
