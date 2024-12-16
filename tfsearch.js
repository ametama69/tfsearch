const { createApp, ref } = Vue
const app = Vue.createApp({
data() {
//	let selected = ref([])
	let selected = ref(["Misskey","みすきー","ミスキー","Mastodon","ますとどん","マストドン",])
	let selected2 = ref([])
	let excludedUsers = ref("crepu_kuma onelinkers")
	let excludedUsersArr = ref(["-from:crepu_kuma","-from:onelinkers"])
	let otherSns = ref("")
	let otherSnsArr = ref([]) 
	let filterfollowee = ref(true)
	
	const lists = ref({
		"Mixi2":["Mixi2","みくし"],
		"Misskey":["Misskey","みすきー","ミスキー"],
		"Server-1":["misskey.io","nijimiss.moe","misskey.art","にじみす","Mivatter","みべったー"],
		"Mastodon":["Mastodon","ますとどん","マストドン"],
		"Server-2":["mastodon.social","Pawoo","ぱうー","パウー","pawoo.net","mstdn.jp"],
		"Fedibird":["Fedibird","ふぇでぃば","フェディバード"],
		"Taittsu":["taittsu","たいっつー","タイッツー","タイツ"],
		"Threads":["Threads","すれっず","スレッズ"],
		"Crepu":["Crepu","クルップ","くるっぷ"],
		"Bluesky":["Bluesky","ぶるーすかい","ブルースカイ","ブルスカ","ブルスコ","ぶるすか","🦋","青空"],
		"Profile":["lit.link","リトリン","リットリンク","fedifile","onelinkers","ワンリンカーズ","プロフカード","profcard"],
		"other":["移転","移行"],
	  })
	
	// const lists = ref({
	// 	"Misskey":["Misskey","みすきー","ミスキー"],
	// 	"Mastodon":["Mastodon","ますとどん","マストドン"],
	// 	"Crepu":["Crepu","クルップ","くるっぷ"],
	// 	"Pawoo":["Pawoo","ぱうー","パウー","pawoo.net"],
	// 	"Fedibird":["Fedibird","ふぇでぃば","フェディバード"],
	// 	"Nijimiss":["Nijimiss","にじみす"],
	// 	"Taittsu":["taittsu","たいっつー","タイッツー","タイツ"],
	// 	"Threads":["Threads","すれっず","スレッズ"],
	// 	"Bluesky":["Bluesky","ぶるーすかい","ブルースカイ","ブルスカ","ブルスコ","ぶるすか","ぶるすこ"],
	// 	"Nostr":["Nostr","ノスター","ノストル","ノストラ"],
	// 	"Profile":["lit.link","リトリン","リットリンク","fedifile","フェディファイル","onelinkers","ワンリンカーズ","POTOFU","プロフカード","profcard"],
	// 	"other":["移転","移行","分散","引越し","Fediverse","フェディバース","mstdn.jp"]
	
	// })


	const lists2 = ref({
		// "フォロイー限定":"filter:follows",
		"リンクを含む":"filter:links",
		"リンクを含まない":"-filter:links",
		"画像を含む":"filter:images"
	})

	function minusUser(){
		excludedUsersArr.value = excludedUsers.value.replaceAll("　", " ").split(' ').filter(Boolean).map((word) => '-from:' + word)
	}

	
	function snsText(){
		otherSnsArr.value = otherSns.value.replaceAll("　", " ").split(' ').filter(Boolean)
	}

	function checkgroup(group){
	selected.value = selected.value.concat(lists.value[group])
	selected.value = Array.from(new Set(selected.value))
	}

	function uncheckgroup(group){
	selected.value = selected.value.filter((value) => !lists.value[group].includes(value));
	}
  return {
	selected,
	selected2,
	excludedUsers,
	excludedUsersArr,
	otherSns,
	otherSnsArr,
	lists,
	lists2,
	filterfollowee,
	snsText,
	minusUser,
	checkgroup,
	uncheckgroup
  }
}
})

app.mount('#app')