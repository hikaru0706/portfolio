# Hikaru Miyashita — Portfolio

AI/ML・フルスタックエンジニア 宮下 晃 の経歴サイト（Firebase Hosting）。

## 構成

- `public/index.html` — 1ファイル完結の静的サイト（日本語 / English 切替、ダークモード対応）。「最近の活動」だけ Firestore から読む
- `public/log/` — 活動ログ
  - `index.html`（/log/）: 公開ページ。カテゴリ絞り込み・検索・月ごとの一覧・今月の件数と勉強時間・連続日数
  - `write.html`（/log/write）: 本人専用の書き込みページ。Google ログインで、`hikakin0706@gmail.com` のときだけ保存できる。非公開の記録はここでしか見えない
  - `fb.js` / `log.css`: 共通
- `firestore.rules` / `firestore.indexes.json` — `logs` コレクション（date, cat, title, body, tags, url, minutes, public, createdAt, updatedAt）
- `firebase.json` — Hosting / Firestore 設定

カテゴリは `fb.js` の `CATS` と `firestore.rules` の `validCat` の両方にある。増やすときは両方。

## 初回だけ必要なこと

Firebase コンソール → Authentication → 「始める」→ ログイン方法で **Google** を有効にする（API からは有効化できない）。

## ローカル確認

```sh
npx firebase-tools emulators:start --only hosting
```

## デプロイ

```sh
npx firebase-tools deploy --only hosting            # ページだけ
npx firebase-tools deploy --only hosting,firestore  # ルール・インデックスも
```
