// youtube_playlist.js
// YouTube動画のシーンの再生をプレイリストで制御するJS

// TODO: YouTubeの埋め込みプレイヤーの実装どうするか、それもここに書くか？

// Videoクラス
// クラスの必要は無いかもしれない
class Video {
  constructor() {
  }
}

// VideoListクラスはVideoIdをキーとするハッシュ
// 動画情報を引っ張ってくるために使う
class VideoList {
  constructor() {
    this.videos = {};
  }
  getVideo(id) {
    return videos[id];
  }
}


class Scene {
  constructor() {
  }
}

// SceneListクラスは、SceneIdをキーとするハッシュ
// シーン情報を引っ張ってくるために使う
class SceneList {
  constructor() {
    this.songs = {};
  }
  getScene(id) {
    return songs[id];
  }
}

// PlayListは順序を保ったSceneの配列を持つ
// 再生済みのシーン管理はどうする？
// 再生済みリストを別途作るのではなく、シーンに再生済みフラグを付けるという実装もあり
class PlayList {
  constructor() {
  }
}

// Controllerは再生を制御するクラス
// ランダム再生は再生済みリストを管理する必要がある、どうやって実装する？ TODO
// コントローラは常に一つのプレイリストを持つ、でいいのかな
// プレイリストを交換するメソッドを実装、再生済みリストをクリアする
class Controller {
  constructor() {
  }
  play() {
  }
  pause() {
  }
}
