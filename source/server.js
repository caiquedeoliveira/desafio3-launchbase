const express = require('express')

const nunjucks = require('nunjucks')

const server = express()
const courses = require("./data")
const videos = require("./data-1")

server.use(express.static('open'))

server.set("view engine", "njk")

nunjucks.configure("src/views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", (req, res) => {
    return res.render("index.njk", {items: videos})
})

server.get("/video", (req, res) => {
    const id = req.query.id
    const video = videos.find(video => {
        return video.id == id
    })
    if (!video){
        return res.render("not-found.njk")
    }

    return res.render("video", {item: video})
})

server.get("/courses", (req, res) => {
    return res.render("courses.njk", {items: courses})
})

server.get("/courses/:id", (req, res) => {
    const id = req.params.id;
    
    const course = courses.find(course => {
        return course.id == id
    })

    if(!course){
        return res.render("not-found.njk")
    }

    return res.render("course", {item: course})
  });


server.get("/about", (req, res) => {
    const about = {
        title: "Rocketseat",
        image: "rocketseat",
        links: [
            {name:"Facebook", url:"https://www.facebook.com/rocketseat/", image:"fb"},
            {name:"Instagram", url: "https://www.instagram.com/rocketseat_oficial/?hl=pt-br", image:"insta"},
            {name: "Github", url: "https://github.com/Rocketseat", image:"github"}
        ],
        text_1: "Acelere a sua evolução!", 
        text_2: "As melhores tecnologias em programação, direto ao ponto e do jeito certo.",
        text_3: "No meio de tanta informação e da quantidade de ferramentas que surgem todos os dias, você precisa de alguém que te leve na direção certa.",
        techs: [
            {name: "Javascript", image: "js"},
            {name: "NodeJS", image: "node"},
            {name: "ReactJS", image: "react"},
            {name: "React Native", image: "rn"},
        ]

    }

    return res.render("about.njk", { about })
})

server.use((req, res) => {
    res.status(404).render("not-found.njk")
})

server.listen(3000, () => {
    console.log("server is running")
})