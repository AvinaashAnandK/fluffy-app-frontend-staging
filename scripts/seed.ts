const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();


async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: "Audio", searchfield: "audio" },
                { name: "Coding", searchfield: "coding" },
                { name: "Databases", searchfield: "db" },
                { name: "Gaming", searchfield: "gaming" },
                { name: "Graphs / Network", searchfield: "graphs" },
                { name: "Healthcare", searchfield: "healthcare" },
                { name: "Image Analysis", searchfield: "image" },
                { name: "NLP", searchfield: "nlp" },
                { name: "Robotics", searchfield: "robotics" },
                { name: "Security", searchfield: "security" },
                { name: "Speech", searchfield: "speech" },
                { name: "Time Series", searchfield: "timeseries" }, 
                { name: "Others", searchfield: "others" }, 
            ]
        })

    } catch (error) {
        console.error("Error seeding default categories", error)
    } finally {
        await db.$disconnect();
    }  
};

main();