<template>
  <div class="music_player">
    <div class="music_hd">
      <!--点击搜索进入discover页面掩藏导航栏-->
      <ul :class="{'isSearch_on': isSearch,'isSearch_off': !isSearch&&!firstIn}">
        <li class="icon">
          <i class="fa fa-bars" v-if="!isSearch"></i>
        </li>
        <router-link to="/music_player/music_mine" tag="li" :class="{'active': pageIndex === 0}">我的</router-link>
        <router-link to="/music_player/music_hall" tag="li" :class="{'active': pageIndex === 1}">音乐馆</router-link>
        <router-link to="/music_player/music_discover" tag="li" :class="{'active': pageIndex === 2}">发现</router-link>
        <li class="icon">
          <i class="fa fa-plus" v-if="!isSearch"></i>
        </li>
      </ul>
      <div class="search_button" :class="{ 'search_button_none' :isSearch,'search_button_show' :!isSearch&&!firstIn}" @click.stop="search">
        <router-link v-if="!isSearch" to="/music_player/music_search">
          <span class="goToDiscover" :class="{'a_on': !isSearch&&!firstIn}"><i class="fa fa-search"></i>搜索</span>
        </router-link>
        <input v-if="isSearch" type="text" placeholder="搜索音乐、歌词、歌单"/>
        <i v-if="isSearch" class="fa fa-microphone"></i>
        <span @click.stop="cancel">
          <span v-if="isSearch"  class="search_cancel">取消</span>
        </span>
      </div>
    </div>
    <div class="music_content">
      <!--下拉刷新框-->
      <router-view></router-view>
    </div>
    <div class="player" ref="player">
      <div class="song_img"><img :class="{'pause' : !isPlaying}" :src="songs[playingIndex].songsImg"/></div>
      <div class="song_mes">{{songs[playingIndex].songsName}}</div>
      <div class="btn_control playMusic" @click.stop="playMusic" v-if="!isPlaying"><img :src="controlImgSrc[0]"/></div>
      <div class="btn_control stopMusic" @click.stop="stopMusic" v-if="isPlaying"><img :src=" controlImgSrc[1]"/></div>
      <div class="btn_historyList"><img src="../../assets/img/music_player/public/music_player_more.png"/></div>
    </div>
    <audio :src="songs[playingIndex].mp3Src" ref="musicPlayer" @ended="audioEnd()"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  created() {
  },
  data() {
    return{
      firstIn: true,
      isSearch: false,
      isPlaying:false,
      playingIndex: 0,
      controlImgSrc : [
        require('../../assets/img/music_player/public/icon_play.png'),
        require('../../assets/img/music_player/public/icon_stop.png')
      ],
      songs: [
        {
          songsImg: require('../../assets/img/music_player/music_hall/swiper1.jpg'),
          songsName: '思念是一种病',
          mp3Src: require('../../assets/mp3/music_1.mp3'),
        },
        {
          songsImg: require('../../assets/img/music_player/music_hall/swiper2.jpg'),
          songsName: '当我唱起这首歌',
          mp3Src: require('../../assets/mp3/music_2.mp3'),
        },
        {
          songsImg: require('../../assets/img/music_player/music_hall/swiper3.jpg'),
          songsName: '小幸运',
          mp3Src: require('../../assets/mp3/music_3.mp3'),
        },
        {
          songsImg: require('../../assets/img/music_player/music_hall/swiper4.jpg'),
          songsName: '生活不止眼前的苟且',
          mp3Src: require('../../assets/mp3/music_4.mp3'),
        },
        {
          songsImg: require('../../assets/img/music_player/music_hall/swiper5.jpg'),
          songsName: '认真的雪',
          mp3Src: require('../../assets/mp3/music_5.mp3'),
        },
        {
          songsImg: require('../../assets/img/music_player/music_hall/swiper3.jpg'),
          songsName: '再见',
          mp3Src: require('../../assets/mp3/music_6.mp3'),
        }
      ]
    }
  },
  computed: {
    //根据返回的pageIndex实现分页
    pageIndex: function () {
      return this.$store.state.main_store.page_index
    }
  },
  methods: {
    search: function () {
      this.isSearch = true
      this.firstIn = false
    },
    cancel: function () {
      this.isSearch = false
      history.go(-1);
    },
    playMusic(){
      let audio =this.$refs.musicPlayer;
      if(!this.isPlaying){
        audio.play();
        this.isPlaying = true;
      }
    },
    stopMusic(){
      let audio =this.$refs.musicPlayer;
      if(this.isPlaying){
        audio.pause();
        this.isPlaying = false;
      }
    },
    audioEnd() {
      let audio =this.$refs.musicPlayer;
      let songsLength = this.songs.length;
      this.playingIndex++;
      if(this.playingIndex >= songsLength)
        this.playingIndex = 0;
      audio.play();
    },
  }
}
</script>

<style lang="scss">
@mixin keyframes($animationName) {
  @-webkit-keyframes #{$animationName} {
    @content;
  }
  @-moz-keyframes #{$animationName} {
    @content;
  }
  @-o-keyframes #{$animationName} {
    @content;
  }
  @keyframes #{$animationName} {
    @content;
  }
}
@include keyframes(opacity_change) {
  0% {
   opacity: 0;
  }
  100% {
   opacity: 1;
  }
}
@include keyframes(circle) {
  0%{
    transform:rotate(0deg);
  }
  100%{
    transform:rotate(360deg);
  }
}
.music_player {
  .music_hd {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    padding-bottom: .1rem;
    background: #31c27c;
    ul.isSearch_on{
      animation: ulHeight_on .25s ease-out;
      animation-fill-mode: forwards;
      @include keyframes(ulHeight_on) {
        0% {
          visibility:inherit;
          height: 7vh;
        }
        100% {
          height: 0;
          visibility:hidden;
        }
      }
    }
    ul.isSearch_off{
      animation: ulHeight_off .25s ease-out;
      animation-fill-mode: forwards;
      @include keyframes(ulHeight_off) {
        0% {
          height: 0;
          visibility:hidden;
        }
        100% {
          visibility:inherit;
          height: 7vh;
        }
      }
    }
    ul {
      position: relative;
      display: flex;
      height: 7vh;
      align-items: center;
      justify-content: center;
      .icon {
        position: absolute;
        top: .15rem;
        margin: 0;
        font-size: .35rem;
        &:first-child {
          left: .2rem;
        }
        &:last-child {
          right: .2rem;
        }
      }
      li {
        margin-right: .5rem;
        font-size: .25rem;
        color: #ffffff;
        &:nth-child(4) {
          margin: 0;
        }
      }
      li.active{
        font-size: .27rem;
        font-weight: bold;
      }
    }
    .search_button {
      position: relative;
      width: 94%;
      height: .5rem;
      margin-left: 3%;
      font-size: .23rem;
      border-radius: .05rem;
      color: #ffffff;
      background: #2bad6e;
      .a_on{
        animation: a_on .8s ease-out;
        animation-fill-mode: forwards;
        @include keyframes(a_on) {
          0% {
            left: .15rem;
          }
          100% {
            left: 2.6rem;
          }
        }
      }
      .goToDiscover{
        position: absolute;
        top: .07rem;
        left: 2.6rem;
      }
      a {
        position: relative;
        display: inline-block;
        width: 100%;
        height:100%;
        text-align: center;
        color: #ffffff;
      }
      i {
        font-size: .3rem;
        margin-right: .1rem;
      }
    }
    .search_button_show{
      animation: input_width_off .5s ease-out;
      animation-fill-mode: forwards;
      @include keyframes(input_width_off) {
        0% {
          width: 82%;
        }
        100% {
          width: 94%;
        }
      }
    }
    .search_button_none {
      display: flex;
      align-items: center;
      margin-top: .1rem;
      text-align: end;
      line-height: 4vh;
      animation: input_width_on .5s ease-out;
      animation-fill-mode: forwards;
      @include keyframes(input_width_on) {
        0% {
          width: 94%;
        }
        100% {
          width: 82%;
        }
      }
      .fa-microphone{
        position: absolute;
        top: .13rem;
        right: 0;
        opacity: 0;
        animation: opacity_change .25s ease-out .25s;
        animation-fill-mode: forwards;
      }
      input {
        @mixin input_placeholder_color {
          color: #ffffff;
          opacity: .8;
        }
        position: absolute;
        left: 1.8rem;
        top: .1rem;
        color: #ffffff;
        background: #2bad6e;
        animation: input_left_change .25s ease-out;
        animation-fill-mode: forwards;
        @include keyframes(input_left_change) {
          0% {
            left: 1.8rem
          }
          100% {
            left: .15rem;
          }
        }
        &::-webkit-input-placeholder {
          @include input_placeholder_color;
        }
        &:-moz-placeholder {
          @include input_placeholder_color;
        }
        &::-moz-placeholder {
          @include input_placeholder_color;
        }
        &:-ms-input-placeholder {
          @include input_placeholder_color;
        }
      }
      .search_cancel {
        position: absolute;
        top: .1rem;
        right: -.7rem;
        width: 10%;
      }
    }
  }
  .music_content{
    position: absolute;
    top: 12vh;
    width: 100%;
    background: #dedede;
    overflow: hidden;
  }
  .music_content > div{
  }
  .group{
    background: #ffffff;
    margin-bottom: .04rem;
    &:last-child{
      margin-bottom: 1rem;
    }
  }
  .player{
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.1rem;
    background: #f9f8f9;
    border-top: 1px solid #a9a5a5;
    .song_img .pause {
      animation-play-state: paused;
    }
    .song_img img{
      width: .75rem;
      height: .75rem;
      margin-left: .1rem;
      border-radius: 50%;
      animation:circle 2s infinite linear;
    }
    .song_mes{
      flex-basis: 3.5rem;
      text-align: left;
      font-size: .28rem;
    }
    .btn_control img{
      width: .55rem;
      height: .55rem;
    }
    .btn_historyList img{
      width: .5rem;
      height: .45rem;
      margin-right: .2rem;
    }
  }
}
</style>
