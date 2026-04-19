# kindaidouga-dl

- KUSSO認証が必要な場合: browser.js を開発者ツールに貼っつけて使ってください
  - `.mp2t`ファイルは[VLC](https://www.videolan.org/vlc/index.ja.html)で閲覧できます
  - `.mp2t`ファイルは[ffmpeg](https://ffmpeg.org)を使ってmp4に変換することができます(再圧縮もできるはずだけど未確認)
  - `Blob`を使ってるから雑魚PCだとメモリが足らんくなるかも
- そうでない場合: [yt-dlpプラグイン](https://github.com/yt-dlp/yt-dlp#plugins)が使えます
  - Linux/macOSは`make install`でインストールできます
  - Windowsの人は自力で頑張ってください

## todo

KUSSO認証対応
