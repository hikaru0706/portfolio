# Hikaru Miyashita — Portfolio

AI/ML・フルスタックエンジニア 宮下 晃 の経歴サイト（Firebase Hosting）。

## 構成

- `public/index.html` — 1ファイル完結の静的サイト（日本語 / English 切替、ダークモード対応）
- `firebase.json` — Hosting 設定

## ローカル確認

```sh
npx firebase-tools emulators:start --only hosting
```

## デプロイ

```sh
npx firebase-tools deploy --only hosting
```
