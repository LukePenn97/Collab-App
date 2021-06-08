const findTheLead = (leadId, usersArr) => {
  return usersArr.find((ele) => ele.id === leadId);
};




module.exports = { findTheLead }
