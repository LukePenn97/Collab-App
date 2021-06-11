import React, {useState} from "react";
import axios from 'axios'

export default function SearchBar(props) {
  
  const [keyword, setKeyword] = useState([])

  const submitKeyword = () => {
    let skills = props.skills
    console.log("keyword:",keyword)
    const url = `http://localhost:5000/projects/search`
    return axios.post(url, {"keyword": keyword})
      .then((body) => {
        console.log("BODYODYODYODY:", body.data)
        props.setProjects(body.data)
        console.log("SKILLS:", props.skills())
        let filteredProjects = props.filterProjectsBySkills(props.skills(), body.data)
        props.setMatchedProjects(filteredProjects)
      })
  }

  const onKeywordChanged = () => {
    //console.log("e is:",e)
    // if (!e[e.length -1]) {
    //   return;
    // }
    const _keyword = document.getElementById("searchbar");
    //console.log(_search.value)
    setKeyword(_keyword.value)
    //console.log(search)
  }

  return (
    <div>
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="searchbar" onChange={onKeywordChanged}></input>
      <button class="btn btn-outline-success" onClick={submitKeyword}>Search</button>
    </div>
  )

}
