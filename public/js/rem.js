function toRem() {
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
  if (deviceWidth >= 750) {
    deviceWidth = 750;
  } else if (deviceWidth <= 320) {
    deviceWidth = 320;
  }
  document.documentElement.style.fontSize = (deviceWidth/7.5) + 'px';
  document.body.style.fontSize = 0.3 + 'rem'
}
toRem();
window.onresize = function(){
    toRem()
}
