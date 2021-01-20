import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

export default function TitleComponent(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

TitleComponent.propTypes = {
  children: PropTypes.node
};
