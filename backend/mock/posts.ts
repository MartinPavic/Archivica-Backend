const posts = [
    {
        id: 1,
        name: 'Stonehenge',
        image: {
            id: 1,
            url: 'https://picsum.photos/960/540'
        },
        location: 'Great Britain',
        period: '1800 AD - 1900 AD',
        author: {
            id: 1,
            name: 'Darko'
        },
        following: true,
        time: new Date(new Date().getTime() - (Math.random() * 1000000000)),
        likes: 111,
        dislikes: 55,
        commentsCount: 15,
        comments: [
            {
                id: 1,
                author: {
                    id: 2,
                    name: 'Miho'
                },
                text: 'Lorem ipsum dolor sit amet, te mea clita tacimates, sit ipsum dolor cu, ei mnesarchum instructior quo.',
                created: new Date(new Date().getTime() - (Math.random() * 1000000000))
            },
            {
                id: 2,
                author: {
                    id: 3,
                    name: 'David'
                },
                text: 'Lorem ipsum dolor sit amet, te mea clita tacimates, sit ipsum dolor cu, ei mnesarchum instructior quo.',
                created: new Date(new Date().getTime() - (Math.random() * 1000000000))
            }
        ],
        likedBy: [
            { id: 1, name: 'Darko' },
            { id: 2, name: 'Miho' },
            { id: 3, name: 'David' },
            { id: 4, name: 'Pero' }
        ]
    },
    {
        id: 2,
        name: 'Stonehenge 2',
        image: {
            id: 1,
            url: 'https://picsum.photos/960/540'
        },
        location: 'Great Britain',
        period: '1800 AD - 1900 AD',
        author: {
            id: 1,
            name: 'Darko'
        },
        following: true,
        time: new Date(new Date().getTime() - (Math.random() * 1000000000)),
        likes: 111,
        dislikes: 55,
        commentsCount: 15,
        comments: [
            {
                id: 1,
                author: {
                    id: 2,
                    name: 'Miho'
                },
                text: 'Lorem ipsum dolor sit amet, te mea clita tacimates, sit ipsum dolor cu, ei mnesarchum instructior quo.',
                created: new Date(new Date().getTime() - (Math.random() * 1000000000))
            },
            {
                id: 2,
                author: {
                    id: 3,
                    name: 'David'
                },
                text: 'Lorem ipsum dolor sit amet, te mea clita tacimates, sit ipsum dolor cu, ei mnesarchum instructior quo.',
                created: new Date(new Date().getTime() - (Math.random() * 1000000000))
            }
        ],
        likedBy: [
            { id: 1, name: 'Darko' },
            { id: 2, name: 'Miho' },
            { id: 3, name: 'David' }
        ]
    },
    {
        id: 3,
        name: 'Stonehenge 3',
        image: {
            id: 1,
            url: 'https://picsum.photos/960/540'
        },
        location: 'Great Britain',
        period: '1800 AD - 1900 AD',
        author: {
            id: 1,
            name: 'Darko'
        },
        following: true,
        time: new Date(new Date().getTime() - (Math.random() * 1000000000)),
        likes: 111,
        dislikes: 55,
        commentsCount: 15,
        comments: [
            {
                id: 1,
                author: {
                    id: 2,
                    name: 'Miho'
                },
                text: 'Lorem ipsum dolor sit amet, te mea clita tacimates, sit ipsum dolor cu, ei mnesarchum instructior quo.',
                created: new Date(new Date().getTime() - (Math.random() * 1000000000))
            },
            {
                id: 2,
                author: {
                    id: 3,
                    name: 'David'
                },
                text: 'Lorem ipsum dolor sit amet, te mea clita tacimates, sit ipsum dolor cu, ei mnesarchum instructior quo.',
                created: new Date(new Date().getTime() - (Math.random() * 1000000000))
            }
        ],
        likedBy: [
            { id: 1, name: 'Darko' },
            { id: 2, name: 'Miho' },
            { id: 3, name: 'David' }
        ]
    },
    {
        id: 4,
        name: 'Stonehenge 4',
        image: {
            id: 1,
            url: 'https://picsum.photos/960/540'
        },
        location: 'Great Britain',
        period: '1800 AD - 1900 AD',
        author: {
            id: 1,
            name: 'Darko'
        },
        following: true,
        time: new Date(new Date().getTime() - (Math.random() * 1000000000)),
        likes: 111,
        dislikes: 55,
        commentsCount: 15,
        comments: [
            {
                id: 1,
                author: {
                    id: 2,
                    name: 'Miho'
                },
                text: 'Lorem ipsum dolor sit amet, te mea clita tacimates, sit ipsum dolor cu, ei mnesarchum instructior quo.',
                created: new Date(new Date().getTime() - (Math.random() * 1000000000))
            },
            {
                id: 2,
                author: {
                    id: 3,
                    name: 'David'
                },
                text: 'Lorem ipsum dolor sit amet, te mea clita tacimates, sit ipsum dolor cu, ei mnesarchum instructior quo.',
                created: new Date(new Date().getTime() - (Math.random() * 1000000000))
            }
        ],
        likedBy: [
            { id: 1, name: 'Darko' },
            { id: 2, name: 'Miho' },
            { id: 3, name: 'David' }
        ]
    },
    {
        id: 5,
        name5: 'Stonehenge 5',
        image: {
            id: 1,
            url: 'https://picsum.photos/960/540'
        },
        location: 'Great Britain',
        period: '1800 AD - 1900 AD',
        author: {
            id: 1,
            name: 'Darko'
        },
        following: true,
        time: new Date(new Date().getTime() - (Math.random() * 1000000000)),
        likes: 111,
        dislikes: 55,
        commentsCount: 15,
        comments: [
            {
                id: 1,
                author: {
                    id: 2,
                    name: 'Miho'
                },
                text: 'Lorem ipsum dolor sit amet, te mea clita tacimates, sit ipsum dolor cu, ei mnesarchum instructior quo.',
                created: new Date(new Date().getTime() - (Math.random() * 1000000000))
            },
            {
                id: 2,
                author: {
                    id: 3,
                    name: 'David'
                },
                text: 'Lorem ipsum dolor sit amet, te mea clita tacimates, sit ipsum dolor cu, ei mnesarchum instructior quo.',
                created: new Date(new Date().getTime() - (Math.random() * 1000000000))
            }
        ],
        likedBy: [
            { id: 1, name: 'Darko' },
            { id: 2, name: 'Miho' },
            { id: 3, name: 'David' },
            { id: 4, name: 'Pero' }
        ]
    },
    {
        id: 6,
        name: 'Stonehenge 6',
        image: {
            id: 1,
            url: 'https://picsum.photos/960/540'
        },
        location: 'Great Britain',
        period: '1800 AD - 1900 AD',
        author: {
            id: 1,
            name: 'Darko'
        },
        following: true,
        time: new Date(new Date().getTime() - (Math.random() * 1000000000)),
        likes: 111,
        dislikes: 55,
        commentsCount: 15,
        comments: [
            {
                id: 1,
                author: {
                    id: 2,
                    name: 'Miho'
                },
                text: 'Lorem ipsum dolor sit amet, te mea clita tacimates, sit ipsum dolor cu, ei mnesarchum instructior quo.',
                created: new Date(new Date().getTime() - (Math.random() * 1000000000))
            },
            {
                id: 2,
                author: {
                    id: 3,
                    name: 'David'
                },
                text: 'Lorem ipsum dolor sit amet, te mea clita tacimates, sit ipsum dolor cu, ei mnesarchum instructior quo.',
                created: new Date(new Date().getTime() - (Math.random() * 1000000000))
            }
        ],
        likedBy: [
            { id: 1, name: 'Darko' },
            { id: 2, name: 'Miho' },
            { id: 3, name: 'David' }
        ]
    },
    {
        id: 7,
        name: 'Stonehenge 7',
        image: {
            id: 1,
            url: 'https://picsum.photos/960/540'
        },
        location: 'Great Britain',
        period: '1800 AD - 1900 AD',
        author: {
            id: 1,
            name: 'Darko'
        },
        following: true,
        time: new Date(new Date().getTime() - (Math.random() * 1000000000)),
        likes: 111,
        dislikes: 55,
        commentsCount: 15,
        comments: [
            {
                id: 1,
                author: {
                    id: 2,
                    name: 'Miho'
                },
                text: 'Lorem ipsum dolor sit amet, te mea clita tacimates, sit ipsum dolor cu, ei mnesarchum instructior quo.',
                created: new Date(new Date().getTime() - (Math.random() * 1000000000))
            },
            {
                id: 2,
                author: {
                    id: 3,
                    name: 'David'
                },
                text: 'Lorem ipsum dolor sit amet, te mea clita tacimates, sit ipsum dolor cu, ei mnesarchum instructior quo.',
                created: new Date(new Date().getTime() - (Math.random() * 1000000000))
            }
        ],
        likedBy: [
            { id: 1, name: 'Darko' },
            { id: 2, name: 'Miho' },
            { id: 3, name: 'David' }
        ]
    },
    {
        id: 8,
        name: 'Stonehenge 8',
        image: {
            id: 1,
            url: 'https://picsum.photos/960/540'
        },
        location: 'Great Britain',
        period: '1800 AD - 1900 AD',
        author: {
            id: 1,
            name: 'Darko'
        },
        following: true,
        time: new Date(new Date().getTime() - (Math.random() * 1000000000)),
        likes: 111,
        dislikes: 55,
        commentsCount: 15,
        comments: [
            {
                id: 1,
                author: {
                    id: 2,
                    name: 'Miho'
                },
                text: 'Lorem ipsum dolor sit amet, te mea clita tacimates, sit ipsum dolor cu, ei mnesarchum instructior quo.',
                created: new Date(new Date().getTime() - (Math.random() * 1000000000))
            },
            {
                id: 2,
                author: {
                    id: 3,
                    name: 'David'
                },
                text: 'Lorem ipsum dolor sit amet, te mea clita tacimates, sit ipsum dolor cu, ei mnesarchum instructior quo.',
                created: new Date(new Date().getTime() - (Math.random() * 1000000000))
            }
        ],
        likedBy: [
            { id: 1, name: 'Darko' },
            { id: 2, name: 'Miho' },
            { id: 3, name: 'David' }
        ]
    }
];

export default posts;
