let app = new Vue({
    el: "#player",
    data: {
        // 搜索关键字
        query: "",
        // 歌单列表
        musicList: [],
        // 歌曲地址
        musicUrl: "",
        // 歌曲封面
        musicCover: "",
        // 歌曲评论
        musicComment: [],
        // 动画播放状态
        isPlaying: false,
        // 遮罩层显示
        isShow: false,
        // mv地址
        mvUrl: ""
    },
    methods: {
        // 歌曲搜索
        searchMusic: function() {
            axios.get('https://autumnfish.cn/search?keywords=' + this.query)
                .then(response => {
                    // console.log(response.data.result.songs);
                    this.musicList = response.data.result.songs
                })
                .catch(err => {})
        },
        // 歌曲的播放
        playMusic: function(musicId) {

            // 歌曲地址
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
                .then(response => {
                    // console.log(response);
                    //console.log(response.data.data[0].url);
                    this.musicUrl = response.data.data[0].url;
                })
                .catch(err => {});

            // 歌曲封面
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
                .then(response => {
                    // console.log(response);
                    // console.log(response.data.songs[0].al.picUrl);
                    this.musicCover = response.data.songs[0].al.picUrl
                })
                .catch(err => {});

            // 歌曲评论
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
                .then(response => {
                    // console.log(response);
                    // console.log(response.data.hotComments);
                    this.musicComment = response.data.hotComments
                })
        },
        // 歌曲播放
        play: function() {
            this.isPlaying = true
        },
        // 歌曲暂停
        pause: function() {
            this.isPlaying = false
        },
        // mv的播放
        playMV: function(mvid) {
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
                .then(response => {
                    // console.log(response);
                    // console.log(response.data.data.url);
                    this.musicUrl = "";
                    this.isPlaying = false;
                    this.isShow = true;
                    this.mvUrl = response.data.data.url
                })
                .catch(err => {})
        },
        // 遮罩层隐藏
        hide: function() {
            this.isShow = false;
            this.mvUrl = ""
        }
    }

})

// 1、遮罩层隐藏后mv没有关（解决）
// 2、歌曲播放和mv播放有冲突（解决）
// 3、解决2后发现动画播放有bug：把地址改为空，但是并没有让它停止播放，所以动画并没有停止（解决）