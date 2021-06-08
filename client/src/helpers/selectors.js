
const findUserById = (userId, usersArr) =>{
  return usersArr.find((ele) => ele.id === userId);
}

//find all projects belongs to a given userId
const findAllById = (id, objArr) => {
  return objArr.filter( ele => ele.projectLeadId === id)
}

// const findMemberByProject = (project) =>{
//   return 
// }

module.exports = { findUserById, findAllById }
