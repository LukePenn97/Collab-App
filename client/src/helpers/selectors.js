
const findUserById = (userId, usersArr) =>{
  //console.log("in findUserById:", usersArr, userId)
  return usersArr.find((ele) => {
    
    return ele.id === userId
  });
}

//find all projects belongs to a given userId
const findAllById = (id, objArr) => {
  return objArr.filter( ele => ele.projectLeadId === id)
}

const filterProjectsBySkills = (skills, projects) => {
  // console.log("skills in filter:", skills)
  if (skills.length < 1) {
    return projects
  }
  return projects.filter( project => {
    for (const skill of project.project_skills) {
      if (skills.includes(skill.id)) {
        return true;
      }
    }
    return false;
  })
}

const findMentors = (users) => {
  const mentors = []
  for (const user of users) {
    if (user.is_mentor) {
      mentors.push(user)
    }
  }
  return mentors;
}

const getUserSkillsArray = (user_skills) => {
  const skills = []
  for (const skill of user_skills) {
    skills.push(skill.name)
  }
  return skills;
}
// const findMemberByProject = (project) =>{
//   return 
// }

module.exports = { findUserById, findAllById, filterProjectsBySkills, findMentors, getUserSkillsArray }
