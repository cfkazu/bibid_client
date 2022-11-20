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
    ],
    host: "http://localhost:8000",
    // host: "https://bibid-api.tokyo",

}