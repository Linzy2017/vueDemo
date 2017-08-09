<template>
  <div class="music_player">
    <div class="music_hd">
      <ul>
        <li class="icon">
          <i class="fa fa-bars"></i>
        </li>
        <router-link to="/music_player/music_mine" tag="li">我的</router-link>
        <router-link to="/music_player/music_hall" tag="li">音乐馆</router-link>
        <router-link to="/music_player/music_discover" tag="li">发现</router-link>
        <li class="icon">
          <i class="fa fa-plus"></i>
        </li>
      </ul>
      <div class="search_button" :class="{'isShow': isSearch}" @click.stop="search">
        <router-link to="/music_player/music_search">
          <i class="fa fa-search"></i>发现
        </router-link>
      </div>
    </div>
    <div class="music_content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return{
      isSearch: false
    }
  },
  methods: {
    search: function () {
      this.isSearch = !this.isSearch
    }
  }
}
</script>

<style lang="scss">
.music_player{
  .music_hd{
    width: 100%;
    padding-bottom: .1rem;
    background: #31c27c;
    ul {
      position: relative;
      display: flex;
      height: 7vh;
      align-items: center;
      justify-content: center;
      .icon{
        position: absolute;
        margin: 0;
        font-size: .35rem;
        &:first-child{
          left: .2rem;
        }
        &:last-child{
          right: .2rem;
        }
      }
      li{
        margin-right: .5rem;
        font-size: .25rem;
        color: #ffffff;
        &:nth-child(4){
          margin: 0;
        }
      }
    }
    .search_button{
      width: 95%;
      line-height: .5rem;
      margin: auto;
      font-size: .23rem;
      border-radius: .05rem;
      background: #2bad6e;
      a{
        color: #ffffff;
      }
      i{
        margin-right: .1rem;
      }
    }
  }
}
</style>
