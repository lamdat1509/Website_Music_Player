const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'MUSIC_Player'

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: "Cứ Chill Thôi",
            singer: ["Chillies", "Suni Hạ Linh", "Rhymastic"],
            path: "./assets/music/listSong1/song1.mp3",
            image: './assets/img/listSong1/song1.jpg'
        },
        {
            name: "Crush",
            singer: ["WN", "Vani", "An An"],
            path: "./assets/music/listSong1/song2.mp3",
            image: "./assets/img/listSong1/song2.jpg"
        },
        {
            name: "Vô Tình",
            singer: ["Xesi", "Hoaprox"],
            path: "./assets/music/listSong1/song3.mp3",
            image: "./assets/img/listSong1/song3.jpg"
        },
        {
            name: "Because I'm Stupid",
            singer: ["SS501"],
            path: "./assets/music/listSong1/song4.flac",
            image: "./assets/img/listSong1/song4.jpg"
        },
        {
            name: "Mama Boy",
            singer: ["AMEE"],
            path: "./assets/music/listSong1/song5.mp3",
            image: "./assets/img/listSong1/song5.jpg"
        },
        {
            name: "Cửu Vĩ Hồ",
            singer: ["Yun", "Dr A"],
            path: "./assets/music/listSong1/song6.mp3",
            image: "./assets/img/listSong1/song6.jpg"
        },
        {
            name: "Anh Đã Quen Với Cô Đơn",
            singer: ["Soobin Hoàng Sơn"],
            path: "./assets/music/listSong1/song7.mp3",
            image: "./assets/img/listSong1/song7.jpg"
        },
        {
            name: "Túy Âm",
            singer: ["Xesi", "Masew", "Nhật Nguyễn"],
            path: "./assets/music/listSong1/song8.mp3",
            image: "./assets/img/listSong1/song8.jpg"
        },
        {
            name: "Kém Duyên",
            singer: ["Rum", "NIT", "Masew"],
            path: "./assets/music/listSong1/song9.mp3",
            image: "./assets/img/listSong1/song9.jpg"
        },
        {
            name: "Tình Bạn Diệu Kì",
            singer: ["AMEE", "Ricky Star", "Lăng LD"],
            path: "./assets/music/listSong1/song10.flac",
            image: "./assets/img/listSong1/song10.jpg"
        },
        {
            name: "Em Có Nghe",
            singer: ["Kha"],
            path: "./assets/music/listSong1/song11.mp3",
            image: "./assets/img/listSong1/song11.jpg"
        },
        {
            name: "Lạc Trôi",
            singer: ["Sơn Tùng M-TP"],
            path: "./assets/music/listSong1/song12.mp3",
            image: "./assets/img/listSong1/song12.jpg"
        },
        {
            name: "Một Năm Mới Bình An",
            singer: ["Sơn Tùng MTP"],
            path: "./assets/music/listSong1/song13.mp3",
            image: "./assets/img/listSong1/song13.jpg"
        },
        {
            name: "Hongkong1 (Official Version)",
            singer: ["Nguyễn Trọng Tài", "San Ji", "Double X"],
            path: "./assets/music/listSong1/song14.mp3",
            image: "./assets/img/listSong1/song14.jpg"
        },
        {
            name: "Gác Lại Âu Lo",
            singer: ["Da LAB", "Miu Lê"],
            path: "./assets/music/listSong1/song15.mp3",
            image: "./assets/img/listSong1/song15.jpg"
        },
        {
            name: "Chạy Ngay Đi",
            singer: ["Sơn Tùng MTP"],
            path: "./assets/music/listSong1/song16.mp3",
            image: "./assets/img/listSong1/song16.jpg"
        },
        {
            name: "Cùng Anh",
            singer: ["Ngọc Dolil", "Hagi", "STee"],
            path: "./assets/music/listSong1/song17.mp3",
            image: "./assets/img/listSong1/song17.jpg"
        },
        {
            name: "Hãy Trao Cho Anh",
            singer: ["Sơn Tùng MTP"],
            path: "./assets/music/listSong1/song18.mp3",
            image: "./assets/img/listSong1/song18.jpg"
        },
        {
            name: "Tộc Ca",
            singer: ["Phúc Du", "SONBEAT"],
            path: "./assets/music/listSong1/song19.mp3",
            image: "./assets/img/listSong1/song19.jpg"
        },
        {
            name: "Thiên Lý Ơi",
            singer: ["Jack", "Bikay"],
            path: "./assets/music/listSong1/song20.mp3",
            image: "./assets/img/listSong1/song20.jpg"
        },
        {
            name: "Phố Đã Lên Đèn",
            singer: ["Phố Đã Lên Đèn"],
            path: './assets/music/listSong1/song21.mp3',
            image: './assets/img/listSong1/song21.jpg'
        },
    ],
    setConfig: function (key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    // map dùng thay đổi chỉnh sữa array
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" 
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEnvents: function () {
        const _this = this
        const cdWidth = cd.offsetWidth

        // cd quay và dừng
        const cdThumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000, // 10s
            iterations: Infinity
        })

        cdThumbAnimate.pause()

        // xử lý phóng to thu nhỏ cd
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // xử lý khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // khi bài hát dc play
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        // khi song notset play
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // song tempo changes
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        //  xử lý khi tua song
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        // khi next song
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // khi prev song
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
        }

        // khi random được bật / tắc ramdom song
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // xử lý lặp lại một song
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // xử lý next bài hát khi audio ended
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // lắng nghe hành vi playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            const songOption = e.target.closest('.option')

            if (songNode || songOption) {
                // xử lý khi click vào song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }

                // xử lý khi click vào song option
                if (songOption) {

                }
            }
        }
    },

    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 300)
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path

        console.log(heading, cdThumb, audio)
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },

    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    start: function () {
        // gáng cấu hình từ config vào ứng dụng
        this.loadConfig()

        // DN các thuộc tính object
        this.defineProperties()

        // nghe / xử lý các sự kiện
        this.handleEnvents()

        // tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        // render playlist
        this.render()

        // hiển thị trạng thái ban đầu của repeat & random
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    }
}

app.start()
