"use strict";

import _ from "lodash";

const pickData = ({ fields = [], object = {} }) => {
  if (fields.length === 0) {
    return object;
  }

  return _.pick(object, fields);
};

export { pickData };
