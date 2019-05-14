import { CHANGE_CHOOSE_TOPIC } from '../action/actionType';
const defaultState = {
    allTopic: [
        {
            id: 0,
            nameTopic: "Tất cả tin",
            color: "red",
            link: "",
            onClick: true
        },
        {
            id: 2,
            nameTopic: "Pháp luật",
            color: "#FFFF00",
            link: "https://vietnamnet.vn/vn/phap-luat/trang",
            onClick: false
        },
        {
            id: 3,
            nameTopic: "Công nghệ",
            color: "#BDBDBD",
            link: "https://vietnamnet.vn/vn/cong-nghe/trang",
            onClick: false
        },
        // {
        //     id: 4,
        //     nameTopic: "Kinh doanh",
        //     color: "#FA58AC",
        //     link: "https://vietnamnet.vn/vn/kinh-doanh/trang",
        //     onClick: false
        // },
        {
            id: 5,
            nameTopic: "Giáo dục",
            color: "#00BFFF",
            link: "https://vietnamnet.vn/vn/giao-duc/trang",
            onClick: false
        },
        {
            id: 6,
            nameTopic: "Thời sự",
            color: "#F3F781",
            link: "https://vietnamnet.vn/vn/thoi-su/trang",
            onClick: false
        },
        // {
        //     id: 7,
        //     nameTopic: "Giải trí",
        //     color: "#FA58D0",
        //     link: "https://vietnamnet.vn/vn/giai-tri/trang",
        //     onClick: false
        // },
        {
            id: 8,
            nameTopic: "Sức khỏe",
            color: "#2EFE2E",
            link: "https://vietnamnet.vn/vn/suc-khoe/trang",
            onClick: false
        },
        // {
        //     id: 9,
        //     nameTopic: "Thể thao",
        //     color: "#0040FF",
        //     link: "https://vietnamnet.vn/vn/the-thao/trang",
        //     onClick: false
        // },
        {
            id: 10,
            nameTopic: "Thế giới",
            color: "#F7BE81",
            link: "https://vietnamnet.vn/vn/the-gioi/trang",
            onClick: false
        },
        {
            id: 11,
            nameTopic: "Bất động sản",
            color: "#FF00FF",
            link: "https://vietnamnet.vn/vn/bat-dong-san/trang",
            onClick: false
        },
        {
            id: 12,
            nameTopic: "Bạn đọc",
            color: "#F4FA58",
            link: "https://vietnamnet.vn/vn/ban-doc/trang",
            onClick: false
        },
        {
            id: 1,
            nameTopic: "Tuần Việt Nam",
            color: "#0404B4",
            link: "https://vietnamnet.vn/vn/tuanvietnam/trang",
            onClick: false
        },

    ],
    choosedTopic: {}
}

const categoriesNewsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_CHOOSE_TOPIC:
            return {
                 allTopic: state.allTopic.map(e => {
                    if (e.id == action.id) {
                        return { ...e, onClick: true }
                    } else {
                        return { ...e, onClick: false }
                    }
                }),
                choosedTopic: state.allTopic.filter(e => {
                    if (e.id == action.id) {
                        return e
                    }
                }),
            }


        default:
            return {
                allTopic: state.allTopic,
                choosedTopic: state.allTopic.filter(e => {
                    if (e.onClick == true) {
                        return e
                    }
                })
            };
    }
}

export default categoriesNewsReducer;