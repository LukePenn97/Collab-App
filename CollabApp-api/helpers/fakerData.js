const faker = require('faker');

const randomFirstName = faker.name.firstName();
const randomLastName = faker.name.lastName();
const randomEmail = faker.internet.email();
const randomAvatar = faker.internet.avatar();
const randomRecentDate = faker.date.recent();
const randomSoonDate = faker.date.soon();
const randomSentence = faker.lorem.sentence();
const randomJobDescriptor = faker.name.jobDescriptor();

const fakerData = {
  userData: () => {
    return  {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: "password",
      photo: faker.internet.avatar(),
      bio: faker.lorem.sentence(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },
  projectData: (LeadId) => {
    return  {
      projectLeadId: LeadId,
      name: faker.company.catchPhraseAdjective() + " " + faker.company.catchPhraseNoun(),
      description: faker.company.catchPhrase(),
      imgUrl: faker.image.technics(),
      deadline: faker.date.soon(),
      startDate: faker.date.recent(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },
  goalData: () => {

  },
  messageData: () => {

  },
}

module.exports = fakerData