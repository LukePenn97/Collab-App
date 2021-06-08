const findTheLead = (leadId, usersArr) => {
  return usersArr.find((ele) => ele.id === leadId);
};

const findUserById = (userId, usersArr) =>{
  return usersArr.find((ele) => ele.id === userId);
}


module.exports = { findTheLead, findUserById }
