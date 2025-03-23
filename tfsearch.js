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
		"Mixi2":["Mixi2","みくし","mixi.social"],
		"Misskey":["Misskey","みすきー","ミスキー"],
		"Server-1":["misskey.io","nijimiss.moe","misskey.art","にじみす","Mivatter","みべったー"],
		"Mastodon":["Mastodon","ますとどん","マストドン"],
		"Server-2":["mastodon.social","Pawoo","ぱうー","パウー","pawoo.net","mstdn.jp"],
		"Fedibird":["Fedibird","ふぇでぃば","フェディバード"],
		"Taittsu":["taittsu","たいっつー","タイッツー","タイツ"],
		"Threads":["Threads","すれっず","スレッズ"],
		"Crepu":["Crepu","クルップ","くるっぷ"],
		"Bluesky":["Bluesky","ぶるーすかい","ブルースカイ","ブルスカ","ブルスコ","ぶるすか","🦋","青空","bsky.app"],
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
},
methods: {
  addRandomItems() {
	// 全アイテムをフラット化して重複を除去
	const allItems = Array.from(new Set(Object.values(this.lists).flat()));
	// 現在選択されていないアイテムをフィルタリング
	const availableItems = allItems.filter(item => !this.selected.includes(item));
	
	while (this.queryLength < 650 && availableItems.length > 0) {
	  // ランダムなインデックスを生成
	  const randomIndex = Math.floor(Math.random() * availableItems.length);
	  // アイテムを選択に追加
	  this.selected.push(availableItems[randomIndex]);
	  // 使用したアイテムを削除
	  availableItems.splice(randomIndex, 1);
	}
  },
	removeRandomItems() {
		while (this.queryLength >= 688 && this.selected.length > 0) {
			// 選択されているアイテムのインデックスを取得
			const selectedIndices = this.selected.map(item => this.selected.indexOf(item));
			// 選択されているアイテムの中からランダムに1つを選択
			const randomIndex = Math.floor(Math.random() * selectedIndices.length);
			const randomItemIndex = selectedIndices[randomIndex];
			// 選択されているアイテムの中からランダムに1つを削除
			this.selected.splice(randomItemIndex, 1);
		}
	}},
computed: {
  searchUrl() {
	const baseUrl = 'https://twitter.com/search?q=';
	const searchTerms = `(${this.selected.concat(this.otherSnsArr).join('%20｜%20')})`;
	const additionalTerms = this.selected2.join('%20');
	const excludedTerms = this.excludedUsersArr.join('%20');
	const followeeFilter = this.filterfollowee ? '&pf=on' : '';
	
	return `${baseUrl}${searchTerms} ${additionalTerms} ${excludedTerms}&src=typed_query&f=live${followeeFilter}`;
  },
  queryLength() {
    const query = `(${this.selected.concat(this.otherSnsArr).join('%20｜%20')}) ${this.selected2.join('%20')} ${this.excludedUsersArr.join('%20')}`;
    return query.length;
	// return new TextEncoder().encode(query).length;
  }
}
})

app.mount('#app')