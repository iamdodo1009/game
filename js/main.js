var isStoryFinish = false;
var mainPersonNm = "서미연";
function goIndex(){
	location.href = "../html/index.html";
}

function fetchOtherHtml(fileName, targetId){ 
  fetch(fileName)
    .then(response => response.text())
    .then(html => {
      document.getElementById(targetId).innerHTML = html;
    });
}

function printPlayerNm(){
	$("#titleDiv").html(localStorage.getItem('player')+"");
}
// 로딩시 최초 호출 함수 
function onloadFn(pageNm){
	printPlayerNm();
	fetchOtherHtml('commonLayer.html', 'layerContainer');	
	fetchOtherHtml('commonFooter.html', 'commonFooter');	
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



function showAtag(isAll, isShow, checkClassNm){
	var links = document.querySelectorAll('#layerContainer a');
	if(isAll){
		links.forEach(link => {
			link.style.display = isShow?'block':'none';
		});		
	}else{
		links.forEach(link => {
			if( $(link).hasClass(checkClassNm) ){
				link.style.display = isShow?'block':'none';
			}else{
				link.style.display = isShow?'none':'block';
			}
		});		
	}
}


function showMap(){
	document.getElementById('dim').style.display = 'block';
	showAtag(false, true, 'map_basement');
	$("#map_0_all_Img").css("display","block");
	$("#closeIconImg").css("display","block");
	$("#layerContainer").css("display","block");	
}
function showInventory(){
	document.getElementById('dim').style.display = 'block';
	$("#inventory_Img").css("display","block");
	$("#closeIconImg").css("display","block");
	$("#layerContainer").css("display","block");			
	for (let i = 1; i <= 10; i++) {
	  if( localStorage.getItem('inventory_item_'+i) == 'Y' ){
		$("#inventory_item_"+i).css("display","block");
	  }
	}	
	showAtag(true, false, '');		
}
var inventoryTxtList = ["서랍 속 쪽지", "키"];
function showInventoryDetail(idx, srcTxt){
	document.getElementById('dim_small_layer').style.display = 'block';
	$("#inventory_detail_show").attr("src", "/image/"+srcTxt);
	$("#inventoryBoxTitle").html(inventoryTxtList[idx-1]);
	setTimeout(function(){
		$("#inventory_detail_show").css("display","block");  
		$("#inventoryDeatilcloseImg").css("display","block");
		$("#inventoryBox").css("display","block");
	}, 350);
}
function closeInventoryDeatil(){
	document.getElementById('dim_small_layer').style.display = 'none';
	$("#inventory_detail_show").css("display","none");  
	$("#inventoryDeatilcloseImg").css("display","none");
	$("#inventoryBox").css("display","none");
}

function closeLayer(){
	if( $("#map_0_food").css("display") == "block" 
		|| $("#map_0_playground").css("display") == "block" 
		|| $("#map_1_floor").css("display") == "block"
		|| $("#map_2_floor").css("display") == "block" 
		|| $("#map_3_floor").css("display") == "block" 
		|| $("#map_4_floor").css("display") == "block" 			
		|| $("#map_5_floor").css("display") == "block" 				
	  ){
		$("#map_0_food").css("display","none");
		$("#map_0_playground").css("display","none");
		$("#map_1_floor").css("display","none");
		$("#map_2_floor").css("display","none");
		$("#map_3_floor").css("display","none");
		$("#map_4_floor").css("display","none");
		$("#map_5_floor").css("display","none");		
		$("#map_0_all_Img").css("display","block"); // 기본 map 으로 돌아가기 
		showAtag(false, true, 'map_basement');	
	}else{
		// 전체 map 또는 inventory 닫기
		showAtag(true, false, '');			
		$("#map_0_all_Img").css("display","none");
		$("#map_0_food").css("display","none");
		$("#map_0_playground").css("display","none");
		$("#map_1_floor").css("display","none");	
		
		$("#inventory_Img").css("display","none");
		$("#closeIconImg").css("display","none");
		$("#inventory_detail_show").css("display","none");	
		document.getElementById('dim').style.display = 'none';	
		
		var images = document.querySelectorAll('#layerContainer img');
		images.forEach(img => {
		  if (img.id.startsWith('inventory_item_')) {
			img.style.display = 'none';
		  }
		});	
	}
}

function showMapDetail(id){
	$("#map_0_all_Img").css("display","none");
	$("#map_0_food").css("display","none");
	$("#map_0_playground").css("display","none");
	$("#map_1_floor").css("display","none");
	$("#"+id).css("display","block");
	if('map_1_floor' == id){
		showMapFloor(1);
	}else{
		showAtag(true, false, '');		
	}
}
function showMapFloor(floor){
	for(var i=1; i<=5; i++){
		if(floor == i){
			$("#mapFloor"+i).addClass("selected");
			$("#map_"+i+"_floor").css("display","block");
		}else{
			$("#mapFloor"+i).removeClass("selected");
			$("#map_"+i+"_floor").css("display","none");
		}
	}
	showAtag(false, true, 'map');				
}
