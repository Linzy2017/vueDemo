<template>
  <scroller lock-x scrollbar-y ref="scroller" :height='scrollerHeight'>
    <div class="scroller_box">
      <div class="music_hall">
        <swiper :aspect-ratio="300/800" auto loop dots-position="center" dots-class="swiper_dots">
          <swiper-item class="swiper_img" v-for="(item, index) in demo04_list" :key="index"><img :src="item"></swiper-item>
        </swiper>
      </div>
    </div>
  </scroller>
</template>

<script type="text/ecmascript-6">
import { Scroller, Swiper, SwiperItem} from 'vux'
export default {
  components: {
    Swiper,
    SwiperItem,
    Scroller
  },
  data() {
    return {
      scrollerHeight: String(-parseInt(htmlFontSize)*2.4),
      demo04_list: [
        require('../../assets/img/music_player/music_hall/swiper1.jpg'),
        require('../../assets/img/music_player/music_hall/swiper2.jpg'),
        require('../../assets/img/music_player/music_hall/swiper3.jpg'),
        require('../../assets/img/music_player/music_hall/swiper4.jpg'),
        require('../../assets/img/music_player/music_hall/swiper5.jpg')
      ]
    }
  },
  created(){
      this.$store.commit('PAGE_INDEX',1)
  }
}
</script>

<style lang="scss">
.music_hall{
  .swiper_img img{
    width: 100%;
    height: 100%;
  }
  .swiper_dots{
    > a{
      i.vux-icon-dot{
        opacity: .5;
        background-color: #ffffff;
      }
      i.vux-icon-dot.active{
        opacity: 1;
        background-color: #ffffff;
      }
    }
  }
}
</style>
