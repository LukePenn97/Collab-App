import React from "react";
// import Button from "../Button";
import ProjectList from "../ProjectList";
import { findUserById, findAllById } from "../../helpers/selectors";
import "./profile.scss";

//material-ui
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";

const Profile = (props) => {
  //find the data of the user by id
  const userToShow = findUserById(props.user, props.users);


  //find the projects created by the user
  const projectsToShow = findAllById(props.user, props.projects);

  return (
    <article className="profile">
      <Card className={"MuiPostCard--01"}>
    <CardMedia
      className={"MuiCardMedia-root"}
      image={
        "https://images.unsplash.com/photo-1517147177326-b37599372b73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2229&q=80"
      }
    >
      
      <Avatar
        className={"MuiAvatar-root"}
        src={userToShow.photo}
      />
    </CardMedia>
    <CardContent className={"MuiCardContent-root"}>
      <Typography
        className={"MuiTypography--heading"}
        variant={"h5"}
        gutterBottom
      >
        {`${userToShow.firstName} ${userToShow.lastName}`}
      </Typography>
      <Typography className={"MuiTypography--subheading"} variant={"caption"}>

      </Typography>
    </CardContent>
    <CardActions className={"MuiCardActions-root"}>
      <Typography variant={"caption"}>
        <Link block href={"javascript:;"} underline={"none"}>
         {}
        </Link>
      </Typography>
      <div>
        <IconButton>
          <Icon>share</Icon>
        </IconButton>
        <IconButton>
          <Icon>favorite_border_rounded</Icon>
        </IconButton>
      </div>
    </CardActions>
    <Divider className={"MuiDivider-root"} light />
      <ProjectList
        users={props.users}
        project={props.project}
        projects={projectsToShow}
        pickAProject= {props.pickAProject}
        pickAUser = {props.pickAUser}
      />
  </Card>
    </article>
      
      
  );
}
Profile.getTheme = muiBaseTheme => ({
  MuiCard: {
    root: {
      "&.MuiPostCard--01": {
        transition: "0.3s",
        maxWidth: "100%",
        margin: "auto",
        boxShadow: "0 0 20px 0 rgba(0,0,0,0.12)",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)"
        },
        "& .MuiDivider-root": {
          margin: `${muiBaseTheme.spacing.unit * 5}px 0`,
        },
        "& .MuiCardMedia-root": {
          paddingTop: "56.25%",
          position: "relative",
          "& .MuiTag--ribbon": {
            position: "absolute",
            top: muiBaseTheme.spacing.unit * 2,
            left: muiBaseTheme.spacing.unit * 2,
            backgroundColor: muiBaseTheme.palette.secondary.main,
            color: "#ffffff !important",
            padding: "2px 8px",
            boxShadow: "0 2px 12px 2px rgba(0,0,0,0.5)",
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
            "&:before, &:after": {
              position: "absolute",
              right: -16,
              content: '" "',
              borderLeft: `16px solid ${muiBaseTheme.palette.secondary.main}`
            },
            "&:before": {
              top: 0,
              borderBottom: "12px solid transparent"
            },
            "&:after": {
              bottom: 0,
              borderTop: "12px solid transparent"
            },
            "& .MuiTypography-root": {
              fontWeight: "bold"
            }
          },
          "& .MuiAvatar-root": {
            position: "absolute",
            right: "12%",
            bottom: 0,
            transform: "translateY(20%)",
            width: 120,
            height: 120,
            zIndex: 1
          },
          "&:after": {
            content: '" "',
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            borderBottom: "32px solid #ffffff",
            borderLeft: "400px solid transparent"
          }
        },
        "& .MuiCardContent-root": {
          textAlign: "left",
          padding: muiBaseTheme.spacing.unit * 3
        },
        "& .MuiTypography--heading": {
          fontWeight: "bold"
        },
        "& .MuiTypography--subheading": {
          lineHeight: 1.8
        },
        "& .MuiCardActions-root": {
          padding: `0 ${muiBaseTheme.spacing.unit * 3}px ${muiBaseTheme.spacing
            .unit * 3}px`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }
      }
    }
  }
});
Profile.displayName = "Card";
Profile.metadata = {
  name: "Post Card",
  description: "Personal Post"
};




export default Profile;