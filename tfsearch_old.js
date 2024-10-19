//TF search@ametama69
//ツイッターのフォロイーの別荘を探して逃さないツール

//
const items = {
	"mastodon": "Mastodon",
	"mastodon1": "ますとどん",
	"mastodon2": "マストドン",
	
	"misskey": "Misskey",
	"misskey1": "みすきー",
	"misskey2": "ミスキー",
	
	"crepu": "Crepu",
	"crepu1": "くるっぷ",
	"crepu2": "クルップ",
	
	"pawoo": "Pawoo",
	"pawoo1": "ぱうー",
	"pawoo2": "パウー",
	
	"fedibird": "Fedibird",
	"fedibird1": "ふぇでぃば",
	"fedibird2": "フェディバード",
	
	"iten": "移転",
	"bunsan": "分散",
	"hikkosi": "引越し",
};


const checkboxesDiv = document.getElementById("checkboxes");

var i = 0;
for (let key in items) {
	i++;
	let checkbox = document.createElement("input");
	let br = document.createElement("br");
	checkbox.type = "checkbox";
	checkbox.name = key;
	checkbox.id = key;
	checkbox.value = items[key];
	if(i<=9){
		checkbox.checked = true;
	}
	checkbox.addEventListener("change", updateCheckedItems);
	let label = document.createElement("label");
	label.innerHTML = items[key];
	label.htmlFor = key;
	checkboxesDiv.appendChild(checkbox);
	checkboxesDiv.appendChild(label);
	if(i%3==0){
		checkboxesDiv.appendChild(br);
	}
}

// チェックされた項目を配列に格納する関数
function updateCheckedItems() {
	let checkedItems = [];
	let checkboxes = document.querySelectorAll("#checkboxes input[type='checkbox']");
	for (let i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			checkedItems.push(checkboxes[i].value);
		}
	}
	console.log("checked items:", checkedItems);
}

// チェックされた項目を表示する関数
function showCheckedItems() {
	let checkedItems = [];
	let checkboxes = document.querySelectorAll("#checkboxes input[type='checkbox']");
	
	
	let otherSNS = document.getElementById("freeword")
	let otherSnsStr = otherSNS.value;
	let otherSnsList = otherSnsStr.split(/\s+/);
	if (otherSnsStr !=""){
		otherSnsList.unshift("")
	}
	
	
	for (let i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			checkedItems.push(checkboxes[i].value);
		}
	}
	alert("選択された項目:\n" + checkedItems.join("\n") + "\n" +  otherSnsList.join("\n"));
}

function devideTxt(text){
	
}

//URLを生成する関数
function main(){
	let checkedItems = [];
	let checkboxes = document.querySelectorAll("#checkboxes input[type='checkbox']");
	
	let checkedItems2 = [];
	let checkboxes2 = document.querySelectorAll("#checkboxes2 input[type='checkbox']");
	
	for (let i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			checkedItems.push(checkboxes[i].value);
		}
	}
	
	for (let i = 0; i < checkboxes2.length; i++) {
		if (checkboxes2[i].checked) {
			checkedItems2.push(checkboxes2[i].value);
		}
	}
	
	let otherSNS = document.getElementById("freeword")
	let minusId = document.getElementById("minusId")
	
	let otherSnsStr = otherSNS.value;
	let minusIdStr = minusId.value;
	let otherSnsList = otherSnsStr.split(/\s+/);
	let minusIdList = minusIdStr.split(/\s+/);
	
	if (otherSnsStr !=""){
		otherSnsList.unshift("")
	}
	if (minusIdStr !=""){
		minusIdList.unshift("")
	}
	
	let linkUrl = "https://twitter.com/search?q=(" + checkedItems.join("%20｜%20") + otherSnsList.join("%20｜%20") + ") " + checkedItems2.join(" ")+ minusIdList.join(" -from:@") + "&src=typed_query&f=live";
	let link = document.createElement("A");
	link.innerHTML = linkUrl;
	link.href = linkUrl;
	link.target = "_blank";
	outputLinks.appendChild(link);
	
	let br = document.createElement("br");
	outputLinks.appendChild(br);
	
	
}


//チェックボックス
function checkAll() {
  var checkboxes = document.querySelectorAll('#checkboxes input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = true;
  }
}

function uncheckAll() {
  var checkboxes = document.querySelectorAll('#checkboxes input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
}
function invertAll() {
  var checkboxes = document.querySelectorAll('#checkboxes input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = !checkboxes[i].checked;
  }
}

