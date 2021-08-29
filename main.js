const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "MASTER_PLAYER";

const playList = $(".playlist");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const repeatBtn = $(".btn-repeat");
const randomBtn = $(".btn-random");

const app = {
    currentIndex: 0,
    arraySong: [], //Danh sách những bài hát khi random bật đã được chạy qua
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: "Build A Bitch",
            singer: "Bella Poarch",
            path: "https://data.chiasenhac.com/down2/2171/0/2170796-0052e774/128/Build%20A%20Bitch%20-%20Bella%20Poarch.mp3",
            image: "https://data.chiasenhac.com/data/cover/141/140316.jpg",
        },
        {
            name: "Down in Flames",
            singer: "Ella Vos",
            path: "https://data3.chiasenhac.com/downloads/1767/0/1766366-d899388d/128/Down%20in%20Flames%20-%20Ella%20Vos.mp3",
            image: "https://data.chiasenhac.com/data/cover/69/68918.jpg",
        },
        {
            name: "Final Song",
            singer: "MØ",
            path: "https://data05.chiasenhac.com/downloads/1671/0/1670413-0bdd08de/128/Final%20Song%20-%20Mo.mp3",
            image: "https://data.chiasenhac.com/data/cover/58/57861.jpg",
        },
        {
            name: "I Know You Care",
            singer: "Ella Vos",
            path: "https://data37.chiasenhac.com/downloads/1901/0/1900917-af9406db/128/I%20Know%20You%20Care%20-%20Ella%20Vos.mp3",
            image: "https://chiasenhac.vn/imgs/no_cover.jpg",
        },
        {
            name: "Inferno",
            singer: "Sub Urban; Bella Poarch",
            path: "https://data25.chiasenhac.com/download2/2188/0/2187007-e5f7981b/128/Inferno%20-%20Sub%20Urban_%20Bella%20Poarch.mp3",
            image: "https://data.chiasenhac.com/data/cover/145/144688.jpg",
        },
        {
            name: "Nights With You",
            singer: "MØ",
            path: "https://data3.chiasenhac.com/downloads/1783/0/1782779-5287e18c/128/Nights%20With%20You%20-%20MO.mp3",
            image: "https://data.chiasenhac.com/data/cover/71/70937.jpg",
        },
        {
            name: "White Noise",
            singer: "Ella Vos; R3hab",
            path: "https://data3.chiasenhac.com/downloads/1767/0/1766847-4fc0c2f7/128/White%20Noise%20-%20Ella%20Vos_%20R3hab.mp3",
            image: "https://data.chiasenhac.com/data/cover/75/74349.jpg",
        },
        {
            name: "Build A Bitch",
            singer: "Bella Poarch",
            path: "https://data.chiasenhac.com/down2/2171/0/2170796-0052e774/128/Build%20A%20Bitch%20-%20Bella%20Poarch.mp3",
            image: "https://data.chiasenhac.com/data/cover/141/140316.jpg",
        },
        {
            name: "Down in Flames",
            singer: "Ella Vos",
            path: "https://data3.chiasenhac.com/downloads/1767/0/1766366-d899388d/128/Down%20in%20Flames%20-%20Ella%20Vos.mp3",
            image: "https://data.chiasenhac.com/data/cover/69/68918.jpg",
        },
        {
            name: "Final Song",
            singer: "MØ",
            path: "https://data05.chiasenhac.com/downloads/1671/0/1670413-0bdd08de/128/Final%20Song%20-%20Mo.mp3",
            image: "https://data.chiasenhac.com/data/cover/58/57861.jpg",
        },
        {
            name: "I Know You Care",
            singer: "Ella Vos",
            path: "https://data37.chiasenhac.com/downloads/1901/0/1900917-af9406db/128/I%20Know%20You%20Care%20-%20Ella%20Vos.mp3",
            image: "https://chiasenhac.vn/imgs/no_cover.jpg",
        },
        {
            name: "Inferno",
            singer: "Sub Urban; Bella Poarch",
            path: "https://data25.chiasenhac.com/download2/2188/0/2187007-e5f7981b/128/Inferno%20-%20Sub%20Urban_%20Bella%20Poarch.mp3",
            image: "https://data.chiasenhac.com/data/cover/145/144688.jpg",
        },
        {
            name: "Nights With You",
            singer: "MØ",
            path: "https://data3.chiasenhac.com/downloads/1783/0/1782779-5287e18c/128/Nights%20With%20You%20-%20MO.mp3",
            image: "https://data.chiasenhac.com/data/cover/71/70937.jpg",
        },
        {
            name: "White Noise",
            singer: "Ella Vos; R3hab",
            path: "https://data3.chiasenhac.com/downloads/1767/0/1766847-4fc0c2f7/128/White%20Noise%20-%20Ella%20Vos_%20R3hab.mp3",
            image: "https://data.chiasenhac.com/data/cover/75/74349.jpg",
        },
    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    //Render danh sach bai hat
    render: function () {
        const htmls = this.songs.map((song, index) => {
            // ${index === this.currentIndex ? 'active' : ''}
            return `<div class="song" data-index="${index}">
          <div class="thumb" style="background-image: url('${song.image}')" ></div>
          <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
          </div>
          <div class="option">
              <i class="fas fa-ellipsis-h"></i>
          </div>
      </div>`;
        });
        playList.innerHTML = htmls.join("");
        this.activeSong();
    },
    // Định nghĩa ra một thuộc tính mới cho Object gọi phương thức này
    /* Object.defineProperty(phương thức muốn thêm thuộc tính, tên thuộc tính cần thêm, {
    value: Có thể tự định nghĩa value cho thuộc tính
    get: function(){
      return về cái cần lấy,
    }
    set: function(newvalue){
      oldvalue = newvalue
    }
  }) */

    defineProperty: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
        // Khi Object.defineProperty được chạy thì sẽ tạo ra một thuộc tính mới của APP có value là bài hát đầu tiên trong danh sách
    },
    //Quan ly cac su kien trong ung dung như DOM EVENT
    handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        //Xử lý quay/ dừng
        const cdThumbAnimate = cdThumb.animate(
            //animate là 1 web APIs của js https://developer.mozilla.org/en-US/docs/Web/API/Animation
            [
                {
                    transform: "rotate(360deg)",
                },
            ],
            {
                duration: 10000, //transform 1 lần hết 10s
                iterations: Infinity, //Lặp vô cực
            }
        );
        cdThumbAnimate.pause();
        // console.log(cdThumbAnimate)

        // Xử lý phóng to thu nhỏ ảnh album
        document.onscroll = function () {
            //   document.documentElement trả về element là element gốc của html ở đây element gốc là <html></html>
            const scrollTop =
                document.documentElement.scrollTop || window.scrollY;
            const newCDWidth = cdWidth - scrollTop;

            cd.style.width = newCDWidth > 0 ? newCDWidth + "px" : 0;
            cd.style.opacity = newCDWidth / cdWidth;
        };

        // Xử lý chơi nhạc
        playBtn.onclick = function () {
            if (!_this.isPlaying) {
                audio.play();
            } else {
                audio.pause();
            }
        };

        // Khi nhạc được play
        audio.onplay = function () {
            player.classList.add("playing");
            _this.isPlaying = true;
            cdThumbAnimate.play();
        };

        // Khi nhạc bị pause
        audio.onpause = function () {
            player.classList.remove("playing");
            _this.isPlaying = false;
            cdThumbAnimate.pause();
        };

        // Khi tiến độ bài hát thay đổi thì thanh tiến trình thay đổi theo
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                progress.value = progressPercent;
            }
            // console.log(progress.value);
        };

        //Tua bài hát
        progress.oninput = function () {
            // console.log(this.value);
            audio.currentTime = Math.floor((this.value * audio.duration) / 100);
        };

        // Next bài hát
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            // _this.render();
            audio.play();
            _this.activeSong();
            _this.scrollToActiveSong();
        };

        // Lùi bài hát
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            // _this.render();

            audio.play();
            _this.activeSong();
            _this.scrollToActiveSong();
        };

        // Xử lý khi bài hát kết thúc thì chuyển sang bài tiếp theo
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };

        // Xáo trộn bài hát
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            _this.setConfig("isRandom", _this.isRandom);
            this.classList.toggle("active", _this.isRandom);
        };

        // Xử lý lặp lại bài hát
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig("isRepeat", _this.isRepeat);
            this.classList.toggle("active", _this.isRepeat);
        };

        // Lắng nghe hành vi click vào playlist
        playList.onclick = function (e) {
            const songNode = e.target.closest(".song:not(.active)");
            const option = e.target.closest(".option");
            if (songNode || option) {
                // Xử lý khi click vào song
                if (songNode) {
                    // songNode.dataset.index === songNode.getAttribute('data-index');
                    // Khi đã dùng data-* thì dùng dataset.index cho nhanh
                    _this.currentIndex = Number(songNode.dataset.index);
                    console.log(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.activeSong();
                    _this.scrollToActiveSong();
                    audio.play();
                }
                //Xử lý khi click option
                if (option) {
                }
            }
        };
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    loadCurrentSong: function () {
        heading.innerText = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
            // console.log(newIndex, this.currentIndex);
            // console.log("Cu:", this.arraySong);
        } while (
            this.currentIndex === newIndex ||
            this.arraySong.includes(newIndex)
        );
        this.currentIndex = newIndex;
        this.arraySong.push(newIndex);
        if (this.arraySong.length >= this.songs.length) {
            this.arraySong = [];
            this.arraySong.push(newIndex);
        }
        // console.log("Moi:", this.arraySong);

        this.loadCurrentSong();
    },
    // Làm nổi bài hát đang chạy
    activeSong: function () {
        const songIsActive = $(".song.active");
        if (songIsActive) {
            songIsActive.classList.remove("active");
        }
        const song = $$(".song");
        song[this.currentIndex].classList.add("active");
    },
    scrollToActiveSong: function () {
        setTimeout(function () {
            if (app.currentIndex < 2) {
                $(".song.active").scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
            } else {
                $(".song.active").scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }, 500);
    },

    //Khoi chay ung dung
    start: function () {
        // Load Config (Trạng thái repeat và random)
        this.loadConfig();

        // Định nghĩa các thuộc tính cho Object (Ở đây là app)
        this.defineProperty();

        // Lắng nghe, xử lý các sự kiện (DOM event)
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        // Render playlist
        this.render();
        randomBtn.classList.toggle("active", this.isRandom);
        repeatBtn.classList.toggle("active", this.isRepeat);
    },
};

app.start();
