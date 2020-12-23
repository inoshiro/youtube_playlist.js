// youtube_playlist.js
// YouTube動画のシーンの再生をプレイリストで制御するJS
//
// ToDo
// - プレイヤー側で停止、再生した場合も、コントローラーの再生ステータスを更新する(onStateChange)


// IFrame Player APIのスクリプトを埋め込む
// https://developers.google.com/youtube/iframe_api_reference?hl=ja
var onYouTubeIframeAPIReady;
var player;
var ytp_config;
var controller;
class YouTubePlayerConfig {
  constructor(height, width, video_id, player_tag) {
    ytp_config = {
      height: height,
      width: width,
      video_id: video_id,
      player_tag: player_tag
    }
  }
  player_init(scene_list) {
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    onYouTubeIframeAPIReady = function() {
      player = new YT.Player(ytp_config.player_tag, {
        height: ytp_config.height,
        width: ytp_config.width,
        videoId: ytp_config.video_id,
        events: {
          'onStateChange': onPlayerStateChange
        }
      });
      controller = new Controller();
      controller.setPlayer(player);
      controller.setPlayList(scene_list);
    }
  }
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    controller.changeState(STATE_PLAYING);
    return;
  }
  if (event.data == YT.PlayerState.PAUSED) {
    controller.changeState(STATE_PAUSED);
    return;
  }
}

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
    this.scenes = {};
  }
  getScene(id) {
    return scenes[id];
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
// プレイヤーが複数の場合を考慮するか？
const STATE_PAUSED = 0;
const STATE_PLAYING = 1;
class Controller {
  constructor() {
    this.player = null;
    this.playlist = null;
    this.scenePointer = null;
    this.state = STATE_PAUSED;
  }
  setPlayer(player) {
    this.player = player;
  }
  setPlayList(playlist) {
    this.playlist = playlist;
  }
  changeState(state) {
    this.state = state;
    console.log('change state to ' + state);
  }
  play_or_pause() {
    // 初期状態からは、一曲目を再生
    if (this.scenePointer == null) {
      let scene = this.playlist[0];
      this.player.loadVideoById(scene.video_id, scene.start_at, 'large');
      this.scenePointer = 0;
      return true;
    }
    // 再生済みの場合
    if (this.state == STATE_PLAYING) {
      this.player.pauseVideo();
      return true;
    }
    // 停止中の場合
    if (this.state == STATE_PAUSED) {
      this.player.playVideo();
      return true;
    }
  }
  prev() {
    let playing_scene = this.playlist[this.scenePointer];
    let pointer = this.scenePointer - 1;
    let prev_scene = this.playlist[pointer];
    if (playing_scene.video_id == prev_scene.video_id) {
      this.player.seekTo(prev_scene.start_at, true)
    } else {
      this.player.loadVideoById(prev_scene.video_id, prev_scene.start_at, 'large');
    }
    this.scenePointer = pointer;
  }
  next() {
    let playing_scene = this.playlist[this.scenePointer];
    let pointer = this.scenePointer + 1;
    let next_scene = this.playlist[pointer];
    if (playing_scene.video_id == next_scene.video_id) {
      this.player.seekTo(next_scene.start_at, true)
    } else {
      this.player.loadVideoById(next_scene.video_id, next_scene.start_at, 'large');
    }
    this.scenePointer = pointer;
  }
  getPlayingScene() {
    return this.playingScene;
  }
}
