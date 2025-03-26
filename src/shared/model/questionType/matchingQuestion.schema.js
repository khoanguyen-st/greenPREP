import * as yup from 'yup'

const itemSchema = yup.object().shape({
  id: yup.string().required('Item must have an ID'),
  label: yup.string().required('Item must have a label')
})

const matchingQuestionSchema = yup.object().shape({
  leftItems: yup.array().of(itemSchema).min(1, 'Left items cannot be empty').required('Left items are required'),
  rightItems: yup.array().of(itemSchema).min(1, 'Right items cannot be empty').required('Right items are required'),
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
