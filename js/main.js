var playerNm = "기본";
function goIndex(){
	location.href = "../html/index.html";
}
function getPlayerNm(){
  return localStorage.getItem('player');
}
function goBack(){
  window.history.back();
}
