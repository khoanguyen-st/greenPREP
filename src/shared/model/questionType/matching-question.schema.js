import * as yup from 'yup'

const matchingQuestionSchema = yup.object().shape({
  leftItems: yup.array().of(yup.string()).min(1, 'Left items cannot be empty').required('Left items are required'),
  rightItems: yup.array().of(yup.string()).min(1, 'Right items cannot be empty').required('Right items are required'),
  userAnswer: yup.array().of(
    yup.object().shape({
      left: yup.string().required(),
      right: yup.string().required()
    })
  ),
  disabled: yup.boolean(),
  className: yup.string()
})

export { matchingQuestionSchema }
