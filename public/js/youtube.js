var player;

let script = document.createElement("script");
script.src = "https://www.youtube.com/iframe_api";
let existingScript = document.querySelector("script");
existingScript.parentNode.insertBefore(script,existingScript);


function onYouTubeIframeAPIReady(){
    player = new YT.Player("youtubeVideo",{
        height: "1280",
        width: "720",
        videoId: "pk9PWUGkz7o",
        playerVars:{
            playlist: "pk9PWUGkz7o",
            autoplay: 1,
            autohide: 1,
            disablekb: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            loop: 1,
            fs: 0,
            autohide: 0,
            rel: 0,
            enablejsapi: 1,
            vmode: "opaque",
            start:8,
            end:260,
            iv_load_policy: 3
        },
        events: {
            "onReady": (event) => {
                event.target.mute();
                event.target.playVideo();
            },
            "onStateChange": (event) => {
                console.log(event.data);
                if (event.data = 1) {
                    console.log("PLAYING!!!");
                    let videoPlayer = document.querySelector("#youtubeVideo");
                    // videoPlayer.classList.add("visible");
                    videoPlayer.setAttribute("opacity",0.4);
                    console.log(videoPlayer);
                }
            }
        }
    })
}