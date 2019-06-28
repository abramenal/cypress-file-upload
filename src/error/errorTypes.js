export default {
  MISSING_FILENAME: {
    message: 'Error: "fileName" is empty.',
    tip: 'You should provide valid "fileName" string for parsing',
  },
  MISSING_ENCODING: {
    message: 'Error: file encoding could not be determined automatically.',
    tip: 'You should either recheck "filename" for any typos or provide the "encoding" for such file type manually.',
  },
  INVALID_SUBJECT_TYPE: {
    message: 'Error: "subjectType" is not valid',
    tip: 'Please look into docs to find supported "subjectType"',
  },
  INVALID_SUBJECT_NATURE: {
    message: 'Error: "subjectNature" is not valid',
    tip: 'Please look into docs to find supported "subjectNature"',
  },
};
