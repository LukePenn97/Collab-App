
const findUserById = (userId, usersArr) =>{
  return usersArr.find((ele) => ele.id === userId);
}

//find all projects belongs to a given userId
const findAllById = (id, objArr) => {
  return objArr.filter( ele => ele.projectLeadId === id)
}

const filterProjectsBySkills = (skills, projects) => {
  console.log("skills in filter:", skills)
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

// const findMemberByProject = (project) =>{
//   return 
// }

module.exports = { findUserById, findAllById, filterProjectsBySkills }
