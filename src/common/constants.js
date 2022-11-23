export default {
    headerItems: [
        {
            name: "トップ", url: "/"
        },


        {
            name: "投稿する", url: "/createimg"
        },
        {
            name: "新着作品", url: "/search/?order=new"
        },
        {
            name: "マイページ", url: "/mypage"
        },
        {
            name: "コンテスト", url: "/contest"
        },

    ],
    headerItems_login: [
        {
            name: "トップ", url: "/"
        },


        {
            name: "投稿", url: "/createimg"
        },

    ],
    menuItems: [
        {
            name: "トップ", url: "/"
        },


        {
            name: "投稿する", url: "/createimg"
        },
        {
            name: "新着作品", url: "/search/?order=new"
        },
        {
            name: "マイページ", url: "/mypage"
        },
        {
            name: "コンテスト", url: "/contest"
        },
    ],
    AitoTags: {
        "NovelAI": ["NovelAI", "NovelAIDiffusion"],
        "Waifu Diffusion": ["WaifuDiffusion"],
        "Stable Diffusion": ["StableDiffusion"],
        "TrinArt": ["trinart"],
        "Midjourney": ["midjourney", "midjourneyart"],
        "Dalle-2": ["dalle2"],
        "Erine-ViLG": ["ernievilg", "ERNIEViLG"],
        "Unstable Diffusion": ["UnstableDiffusion"],
        "Hentai Diffusion": ["HentaiDiffusion"],
        "niji・journey": ["nijijourney"],
        "その他": [],
    },
    host: "http://localhost:8000",
    //host: "https://bibid-api.tokyo",

}