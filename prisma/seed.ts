import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const list = [
  "Mop the floor",
  "Wash the car",
  "Walk the dog",
  "Grocery shopping",
  "Renew car insurance",
  "Wipe down stovetop",
  "Clean inside of microwave.",
  "Clean inside and around sink",
  "Sweep floor",
  "Wipe down cabinet fronts",
  "Make bed",
  "Vacuum hard floor surfaces",
  "Scrub sink",
  "Water indoor plants",
  "Water outdoor plants"

];

async function main() {
  //drop previous items
  await prisma.todo.deleteMany()
  await prisma.person.deleteMany()


  const persons = ['Moe', 'Larry', 'Curly'];
  await Promise.all(persons.map(
    (name) => {
      return prisma.person.create({ data: { name } })
    }
  ));

  const moe = await prisma.person.findFirst();

  //all tasks assigned to moe
  await Promise.all(list.map(
    (title, index) => {
      return prisma.todo.create(
        { data: { title, person:{connect:{id:moe?.id}} } }
      )
    }
  ));
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })