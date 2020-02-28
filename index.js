        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        var player;

        function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
                height: '360',
                width: '640',
                //videoId: '_bTXGvnQOxs',
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        // 4. The API will call this function when the video player is ready.
        function onPlayerReady(event) {
            event.target.setPlaybackRate(1.0);
            //event.target.playVideo();
            player.cueVideoById({videoId: 'vWYOKFi8pd8'});
            //player.cueVideoById({videoId: '_bTXGvnQOxs'});

        }

        // 5. The API calls this function when the player's state changes.
        //    The function indicates that when playing a video (state=1),
        //    the player should play for six seconds and then stop.
        var done = false;

        function onPlayerStateChange(event) {
            /*if (event.data == YT.PlayerState.PLAYING && !done) {
              setTimeout(stopVideo, 6000);
              done = true;
            }*/
        }

        function stopVideo() {
            player.stopVideo();
        }


        //スピードコントロール
        var speedSelect = document.getElementById("speed");
        speedSelect.onchange = function (e) {
            player.setPlaybackRate(Number(e.target.value));
        };


        /**
         * drawer
         */

       const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
       const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));
       topAppBar.setScrollTarget(document.getElementById('main-content'));
       topAppBar.listen('MDCTopAppBar:nav', () => {
         drawer.open = !drawer.open;
       });


       /*
       * drawer リストクリックイベント
       */
      var playlist=document.querySelectorAll(".mdc-list-item");
      for (var i=0; i<playlist.length; i++){
        setPlayEvent(playlist[i]);
      }
      function setPlayEvent(el){
          el.addEventListener("click",function(){
              var movieId=el.querySelector(".mdc-list-item__text").dataset.movieid;
              player.cueVideoById({videoId: movieId});
              drawer.open = !drawer.open;
          });
      }
       




