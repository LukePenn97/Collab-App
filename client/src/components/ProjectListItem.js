import React from "react";
import { findUserById } from "../helpers/selectors"
// const classnames = require('classnames');

import GoogleFontLoader from 'react-google-font-loader';
import NoSsr from '@material-ui/core/NoSsr';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoSubtitle, InfoTitle } from '@mui-treasury/components/info';
import { useApexInfoStyles } from '@mui-treasury/styles/info/apex';
import { useGraphicBtnStyles } from '@mui-treasury/styles/button/graphic';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    transition: '0.3s',
    position: 'relative',
    '&:before': {
      transition: '0.2s',
      position: 'absolute',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      backgroundColor: '#d9daf1',
      borderRadius: '1rem',
      zIndex: 0,
      bottom: 0,
    },
    '&:hover': {
      '&:before': {
        bottom: -6,
      },
      '& $card': {
        boxShadow: '-12px 12px 64px 0 #bcc3d6',
      },
    },
  },
  card: {
    zIndex: 1,
    position: 'relative',
    borderRadius: '1rem',
    boxShadow: '0 6px 20px 0 #dbdbe8',
    backgroundColor: '#fff',
    transition: '0.4s',
    height: '100%',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: '0.75rem',
  },
  avatar: {
    fontFamily: 'Ubuntu',
    fontSize: '0.875rem',
    backgroundColor: '#6d7efc',
  },
  join: {
    background: 'linear-gradient(to top, #638ef0, #82e7fe)',
    '& > *': {
      textTransform: 'none !important',
    },
  },
}));

const CustomCard = ({
  thumbnail,
  title,
  titleAction,
  creator,
  subtitle,
  description,
  users,
  joined = false,
}) => {
  const styles = useStyles();
  const btnStyles = useGraphicBtnStyles();
  return (
    <div className={styles.root}>
      <Column className={styles.card}>
        <Row p={2} gap={2}>
          <Avatar className={styles.logo} variant={'rounded'} src={thumbnail} />
          <Info position={'middle'} useStyles={useApexInfoStyles}>
            <InfoTitle><h2>{title}</h2></InfoTitle>
            <InfoSubtitle onClick={subtitle}><h5 color="purple[500]"> Created by: {creator}</h5></InfoSubtitle>
          </Info>
        </Row>
        <Box
          pb={1}
          px={2}
          color={'grey.600'}
          fontSize={'0.875rem'}
          fontFamily={'Ubuntu'}
        >
          <h5>{description}</h5>
        </Box>
        <Row p={2} gap={2} position={'bottom'}>
          <Item>
            <AvatarGroup max={4} classes={{ avatar: styles.avatar }}>
              {users.map((user, index) => (
                <Avatar
                  key={index}
                  src={user.photo}
                />
              ))}
            </AvatarGroup>
          </Item>
          <Item position={'middle-right'}>
            <Button
              className={styles.join}
              classes={btnStyles}
              variant={'contained'}
              color={'primary'}
              disableRipple
            >
              {joined ? 'Leave group' : 'Join group'}
            </Button>
          </Item>
          <Item position={'middle-right'}>
            <Button
              className={styles.join}
              classes={btnStyles}
              variant={'contained'}
              color={'primary'}
              disableRipple
              onClick={titleAction}
              >
                Learn More
            </Button>
          </Item>
        </Row>
      </Column>
    </div>
  );
};
export default function ProjectListItem(props) {
  // const itemClass = classnames("day-list__item", {
  //   "day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0
  // })


  const projectLead = findUserById(props.projectLeadId, props.users);
  // console.log(projectLead)

  const skills = [];
  props.project_skills.map(skill => skills.push(skill.name))


  return (
    <>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: 'Ubuntu', weights: [800, 700] }]} />
      </NoSsr>
      <Grid container spacing={4}>
        <Grid item xs={12} md={10} lg={4}>
          <CustomCard
            thumbnail={props.imgUrl}
            title={props.name}
            titleAction={() => props.pickAProject(props)}
            creator={`${projectLead.firstName} ${projectLead.lastName}`}
            subtitle={() => props.pickAUser(props.projectLeadId)}
            description={props.description}
            users={props.project_users}
          />
        </Grid>
      </Grid>
    </>
  );
};


