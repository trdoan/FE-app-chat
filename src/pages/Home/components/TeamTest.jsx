import React from "react";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(2),
  },
}));

export default function TeamTest(props) {
  const classes = useStyles();

  const content = {
    "header-p2": "THÀNH VIÊN",
    "01_image": "/tan.jpg",
    "01_name": "Công Tân",
    "01_job": "Designer",
    "02_image": "/doan.png",
    "02_name": "Dương Doãn",
    "02_job": "Developer",
    "03_image": "/loc.png",
    "03_name": "Bảo Lưu",
    "03_job": "Designer",
    ...props.content,
  };

  return (
    <section>
      <Container maxWidth="lg">
        <Box pt={8} pb={12} textAlign="center">
          <Box mb={9}>
            <Container maxWidth="sm">
              <Typography
                variant="overline"
                color="textSecondary"
                paragraph={true}
              >
                {content["badge"]}
              </Typography>
              <Typography variant="h3" component="h2" gutterBottom={true}>
                <Typography variant="h3" component="span" color="primary">
                  {content["header-p1"]}{" "}
                </Typography>
                <Typography variant="h3" component="span">
                  {content["header-p2"]}
                </Typography>
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                paragraph={true}
              >
                {content["description"]}
              </Typography>
            </Container>
          </Box>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={4} md={4}>
              <Avatar
                alt=""
                src={content["01_image"]}
                className={classes.avatar}
              />
              <Typography variant="h6" component="h6" gutterBottom={true}>
                {content["01_name"]}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                component="span"
              >
                {content["01_job"]}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Avatar
                alt=""
                src={content["02_image"]}
                className={classes.avatar}
              />
              <Typography variant="h6" component="h6" gutterBottom={true}>
                {content["02_name"]}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                component="span"
              >
                {content["02_job"]}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Avatar
                alt=""
                src={content["03_image"]}
                className={classes.avatar}
              />
              <Typography variant="h6" component="h6" gutterBottom={true}>
                {content["03_name"]}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                component="span"
              >
                {content["03_job"]}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}
