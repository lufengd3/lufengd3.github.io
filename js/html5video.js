var video = document.getElementById("video"),
    camera = document.getElementById("camera"),
    snap = document.getElementById("snap"),
    canvas = document.getElementById("canvas").getContext("2d");
var media = {video: true};
var stream;
var callTime = 0;
navigator.getUserMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia
                          );

function startCamera() {
    if (callTime == 1) {
        alert("Click 'allow' to turn on the camera.");
    }
    camera.innerHTML = "Turn off camera";
    if (navigator.getUserMedia) {
        navigator.getUserMedia(media,
            function(videoStream) {
                stream = videoStream;
                video.src = window.URL.createObjectURL(videoStream);
                video.play();
            },
            function(err) {
                alert('Error...');
            }
        );
    } else {
        alert("Sorry, your broswer doesn't support web camera.")
    }
}

function stopCamera() {
    camera.innerHTML = "Turn on camera";
    video.src = '';
    video.pause();
    stream.stop();  // works on firefox
}

function toggle() {
    callTime += 1;
    var args = arguments.length;

    if (args != 0) {
        var left = callTime % args;
        left == 0 ? arguments[args - 1]() : arguments[left - 1]();
    }
}

snap.addEventListener("click", function() {
    canvas.drawImage(video, 0, 0, 500, 374);
});

camera.addEventListener("click", function() {
    toggle(startCamera, stopCamera);
});
