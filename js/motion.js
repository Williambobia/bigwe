(function () {
  "use strict";

  var root = document.querySelector("[data-motion]");
  var audio = document.querySelector("[data-voice]");
  var play = document.querySelector("[data-motion-play]");
  var scenes = Array.prototype.slice.call(document.querySelectorAll("[data-scene]"));
  if (!root || !audio || !play || !scenes.length) return;

  var cues = [0, 3.1, 8.6, 13.6, 16.6];

  function showAt(time) {
    var active = 0;
    cues.forEach(function (mark, index) {
      if (time >= mark) active = index;
    });
    scenes.forEach(function (scene, index) {
      var on = index === active;
      scene.hidden = !on;
      scene.classList.toggle("is-on", on);
    });
  }

  function reset() {
    showAt(0);
  }

  reset();

  play.addEventListener("click", function () {
    if (!audio.paused) {
      audio.pause();
      play.textContent = "Reprendre";
      return;
    }
    root.classList.add("is-playing");
    if (audio.ended) {
      audio.currentTime = 0;
      reset();
    }
    var started = audio.play();
    if (started && started.catch) {
      started.catch(function () {
        play.textContent = "Lancer la voix";
      });
    }
    play.textContent = "Pause";
  });

  audio.addEventListener("timeupdate", function () {
    showAt(audio.currentTime);
  });

  audio.addEventListener("ended", function () {
    showAt(audio.duration || 99);
    play.textContent = "Revoir";
  });
})();
