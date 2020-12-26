/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Tooltip } from 'react-bootstrap';

const RenderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    After update u must login
  </Tooltip>
);

export default RenderTooltip;
