import React, {useState} from "react";
import { findMentors, getUserSkillsArray } from "../../helpers/selectors";
import styles from './mentor.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SkillList from "../SkillList";

export default function MentorRequest(props) {

  // const [state, setState] = useState({});
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [skills, setSkills] = useState([]);
  // const skills = [];
  const [mentors, setMentors] = useState(findMentors(props.users, skills));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const sendMentorRequest = () => {

  }

  const handleMentorSkills = (skill) => {
    const newSkills = skills
    if (skills.includes(skill)) {
      const index = newSkills.indexOf(skill);
      newSkills.splice(index, 1);
      console.log("removed skill", skill)
    } else {
      newSkills.push(skill)
      console.log("pushed skill", skill)
    }
    console.log("setting mentors with skills", skills)
    setSkills(newSkills);
    setMentors(findMentors(props.users, skills));
    // setState(prev => ({...prev, skills: newSkills, mentors: findMentors(props.users, skills)}))
  }

  const mentorList = (mentors.map((mentor)=>{

    return(
      <div onClick={()=>console.log("mentor:", mentor)}>
          <img src={mentor.photo} />
          <p className="legend">
            {mentor.firstName} {mentor.lastName}<br></br>{mentor.user_skills[0].name}
          </p>
      </div>
    
    // <div className="box">
    //   <div>{mentor.firstName} {mentor.lastName}</div>
    //   <img src={mentor.photo}></img>
    //   {getUserSkillsArray(mentor.user_skills).map((skill)=>{
    //     return (<h2>{skill}</h2>)
    //   })}
    //   </div>
      
      )
  }))
  return (
    <>
    <Button variant="info" onClick={handleShow}>
      View Available Mentors
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header >
        <Modal.Title>Modal title</Modal.Title>
        
      </Modal.Header>

      <Modal.Body>
      <p>Choose the skills you need:</p>
      <SkillList

        pickASkill={handleMentorSkills}
      />
      <br></br>
        <div>
          <div className="form-group">
            <label for="description">Write a description of your problem</label>
            <input name="description" className="form-control" type="text"></input>
          </div>
          <br></br>
          <div className="wrap">
            <Carousel showIndicators={false}>
              {mentorList}
            </Carousel>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={()=>{handleClose()}}>Close</Button>
        <Button variant="primary" onClick={()=>{alert("mentor request sent")}}>Send Mentor Request</Button>
      </Modal.Footer>
    </Modal>

    </>

  );
}

{/* <div>
<h1>Mentor Request</h1>
<div className="wrap">
  {mentors}
</div>
</div> */}