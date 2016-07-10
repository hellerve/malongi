document.addEventListener("DOMContentLoaded", function() {
  const from = [0xdd, 0xdd, 0xff]
      , to   = [0xaa, 0xff, 0xdd]
      ;
  var   b    = document.body
      , h    = document.documentElement
      , height
      ;

  var onScroll = function() {
    const curY = window.pageYOffset
        , diff = (curY / height) * 2
        ;
    document.body.style.backgroundColor = "rgb(" + from.map(function(el, i){ return Math.round((el * (1 - diff) + to[i] * diff));}).join() + ")";
    document.getElementById("fade-img").style.opacity = diff > 0.6 ? (1-diff) * 2 : diff * 2;
  };

  var onResize = function() {
    height = Math.max(b.scrollHeight, b.offsetHeight, h.clientHeight, h.scrollHeight, h.offsetHeight);
  };

  document.addEventListener("scroll", onScroll);
  document.addEventListener("resize", onResize);

  onResize();
  onScroll();
});
