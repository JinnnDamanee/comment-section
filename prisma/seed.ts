import { prisma } from "../data/prisma";
import { User, Comment } from "@prisma/client";

const seedData = async () => {


    await prisma.comment.deleteMany({})
    await prisma.user.deleteMany({})

    const juliusomo: User = await prisma.user.create({
        data: {
            username: 'juliusomo',
            imageUrl: 'https://raw.githubusercontent.com/JinDamanee2544/comment-section/main/images/avatars/image-juliusomo.webp'
        }
    })

    const ramsesmiron: User = await prisma.user.create({
        data: {
            username: 'ramsesmiron',
            imageUrl: 'https://raw.githubusercontent.com/JinDamanee2544/comment-section/main/images/avatars/image-ramsesmiron.webp'
        }
    })

    const maxblagun: User = await prisma.user.create({
        data: {
            username: 'maxblagun',
            imageUrl: 'https://raw.githubusercontent.com/JinDamanee2544/comment-section/main/images/avatars/image-maxblagun.webp'
        }
    })

    const amyrobson: User = await prisma.user.create({
        data: {
            username: 'amyrobson',
            imageUrl: 'https://raw.githubusercontent.com/JinDamanee2544/comment-section/main/images/avatars/image-amyrobson.webp'
        }
    })
    // ------------------------------
    const comment1: Comment = await prisma.comment.create({
        data: {
            content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            score: 12,
            author: {
                connect: {
                    userId: amyrobson.userId
                }
            }
        }
    })

    const comment2: Comment = await prisma.comment.create({
        data: {
            content: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            score: 8,
            author: {
                connect: {
                    userId: maxblagun.userId
                }
            },
            replys: {
                create: {
                    content: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                    score: 4,
                    author: {
                        connect: {
                            userId: ramsesmiron.userId
                        }
                    }
                }
            }
        }
    })
}


seedData()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })