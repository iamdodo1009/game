var isStoryFinish = false;
var mainPersonNm = "서미연";
function goIndex(){
	location.href = "../html/index.html";
}
function getPlayerNm(){
  return localStorage.getItem('player');
}
function printPlayerNm(){
	$("#titleDiv").html(getPlayerNm()+"");
}
function goBack(){
  window.history.back();
}

function showCustomAlert(title, message) {
  document.getElementById('alertTitle').innerText = title;
  document.getElementById('alertMessage').innerText = message;
  document.getElementById('dim').style.display = 'block';
  document.getElementById('alertBox').style.display = 'block';
}

function closeCustomAlert() {
  document.getElementById('dim').style.display = 'none';
  document.getElementById('alertBox').style.display = 'none';
}

function displayNoneCommonDiv(isShowNextBtn){
	$("#titleDiv").css("display","none");				
	$("#gameSummaryDiv").css("display","none");				
	$("#nextIconImg").css("display",(isShowNextBtn?"block":"none"));				
}

var isSolvedQuize = false;
function goNext(htmlNm){
	if(isStoryFinish){
		if(htmlNm == 'game3'){
			if(isSolvedQuize){
				location.href = "./"+htmlNm+".html";
			}else{
				$("#hintDiv_1").css("display","block");
				$("#hintDiv_2").css("display","block");
				$("#hintDiv_3").css("display","block");
				$("#hintDiv_4").css("display","block");				
				displayNoneCommonDiv(false);
				//alert('키를 찾아야지 다음 화면으로 이동 가능합니다!');
			}
		}else{
			location.href = "./"+htmlNm+".html";
		}
	}else{
		showCustomAlert('경고','스토리를 모두 읽어야 다음 스텝이 가능합니다.');
	}

}

let tempText = '';
let index = 0;
function typing(pageNo) {
	if (index >= gameSummaryStr.length){
		isStoryFinish = true;
		/*
		if(pageNo == '2'){
			$("#hintDiv_1").css("display","block");
			$("#hintDiv_2").css("display","block");
			$("#hintDiv_3").css("display","block");
			$("#hintDiv_4").css("display","block");
		}
		*/		
		return;
	}
	const nextChar = gameSummaryStr[index];
	if (nextChar === '<') {
		// HTML 태그 시작 → 태그 끝까지 한꺼번에 추가
		const tagEnd = gameSummaryStr.indexOf('>', index);
		if (tagEnd !== -1) {
			const tag = gameSummaryStr.substring(index, tagEnd + 1);
			tempText += tag;
			index = tagEnd + 1;
		}
	} else {
		// 일반 글자
		tempText += nextChar;
		index++;
	}
	//console.log(tempText);
	$("#gameSummaryDiv").html(tempText);
}
