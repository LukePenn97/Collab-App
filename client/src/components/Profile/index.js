import React from "react";
// import Button from "../Button";
import ProjectList from "../ProjectList";
import { findUserById, findAllById } from "../../helpers/selectors";
import "./profile.scss";
import Cookies from "universal-cookie";

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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';


const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
const Profile = (props) => {
  //find the data of the user by id
  const projectsToShow = findAllById(props.user, props.projects);

  const currentUser = cookies.get("currentUser");
  console.log(props.users);
  const userToShow = findUserById(props.user, props.users);
  let isMe;
  console.log(props);
  if (userToShow) {
     isMe = (userToShow.id === parseInt(currentUser));
  };


  //find the projects created by the user

  const classes = useStyles();
  return (
    <article className="profile">
      <Card className={"MuiPostCard--01"}>
        <CardMedia
          className={"MuiCardMedia-root"}
          image={
            "https://images.unsplash.com/photo-1552083375-1447ce886485?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          }
        >
          <Avatar className={"MuiAvatar-root"} src={userToShow.photo || "/broken-image.jpg"} />
        </CardMedia>
        <CardContent className={"MuiCardContent-root"}>
          <Typography
            className={"MuiTypography--heading"}
              variant={"h5"}
            gutterBottom
          >
            {`${userToShow.firstName} ${userToShow.lastName}`}
          </Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          ><h4 style={{marginTop: "20px"}}>Skills:</h4></Typography>
          {userToShow.user_skills && userToShow.user_skills.map( skill => (
          <List component="nav" className={classes.root} aria-label="contacts">
            <ListItem>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary={skill.name} />
            </ListItem>
          </List>
          ))}
          {isMe? (
            <ListItemIcon style={{margin: "20px"}}>
              <EditIcon/>
          </ListItemIcon>
          ) : (
            null
            )}
            

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
        
        <div className="projects-list">
        <ProjectList
          users={props.users}
          project={props.project}
          projects={projectsToShow}
          pickAProject={props.pickAProject}
          pickAUser={props.pickAUser}
        />
       </div>
      </Card>
    </article>
  );
};
Profile.getTheme = (muiBaseTheme) => ({
  MuiCard: {
    root: {
      "&.MuiPostCard--01": {
        transition: "0.3s",
        maxWidth: "100%",
        margin: "auto",
        boxShadow: "0 0 20px 0 rgba(0,0,0,0.12)",
        "& .MuiDivider-root": {
          margin: `${muiBaseTheme.spacing.unit * 5}px 0`,
        },
        "& .MuiCardMedia-root": {
          paddingTop: "30.25%",
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
              borderLeft: `16px solid ${muiBaseTheme.palette.secondary.main}`,
            },
            "&:before": {
              top: 0,
              borderBottom: "12px solid transparent",
            },
            "&:after": {
              bottom: 0,
              borderTop: "12px solid transparent",
            },
            "& .MuiTypography-root": {
              fontWeight: "bold",
            },
          },
          "& .MuiAvatar-root": {
            position: "absolute",
            left: "80%",
            bottom: 0,
            transform: "translateY(20%)",
            width: 120,
            height: 120,
            zIndex: 1,
          },
          "&:after": {
            content: '" "',
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            borderBottom: "32px solid #ffffff",
            borderLeft: "400px solid transparent",
          },
        },
        "& .MuiCardContent-root": {
          textAlign: "left",
          padding: muiBaseTheme.spacing.unit * 3,
        },
        "& .MuiTypography--heading": {
          fontWeight: "bold",
        },
        "& .MuiTypography--subheading": {
          lineHeight: 1.8,
        },
        "& .MuiCardActions-root": {
          padding: `0 ${muiBaseTheme.spacing.unit * 3}px ${
            muiBaseTheme.spacing.unit * 3
          }px`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
      },
    },
  },
});
Profile.displayName = "Card";
Profile.metadata = {
  name: "Post Card",
  description: "Personal Post",
};

export default Profile;
