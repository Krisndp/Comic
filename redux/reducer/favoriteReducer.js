const defaultState = [
    {
        id: 1,
        name: 'Sport',
        image: "https://cdn2.iconfinder.com/data/icons/sport-solid-4/64/Sport_42-256.png"
    },
    {
        id: 2,
        name: 'Technology',
        image: 'https://cdn4.iconfinder.com/data/icons/technology-9/128/Technology_network-128.png'
    },
    {
        id: 3,
        name: 'Movie',
        image: 'https://img.icons8.com/pastel-glyph/64/000000/film-reel.png'
    },
    {
        id: 4,
        name: 'All News',
        image: 'https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/news-512.png'
    },
    {
        id: 5,
        name: 'All News',
        image: 'https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/news-512.png'
    },
    {
        id: 6,
        name: 'All News',
        image: 'https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/news-512.png'
    },
    {
        id: 7,
        name: 'All News',
        image: 'https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/news-512.png'
    },
    {
        id: 8,
        name: 'All News',
        image: 'https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/news-512.png'
    },
]

const favoriteReducer = (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default favoriteReducer;