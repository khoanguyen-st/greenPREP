import * as yup from 'yup'

const uuidSchema = yup.string().uuid('Invalid UUID format').required()

const keySchema = yup.string().required()

const optionSchema = yup.object({
  key: keySchema,
  value: yup
    .array()
    .of(yup.string().required('Each option must be a string'))
    .min(2, 'Each question must have at least two options')
    .required()
})

const correctAnswerSchema = yup.object({
  key: keySchema,
  value: yup.string().required('Correct answer is required')
})

export const answerContentSchema = yup.lazy(value => {
  if (value.options) {
    return fillInTheBlankSchema
  } else if (value.leftItems && value.rightItems) {
    return matchingSchema
  }
  return yup.mixed().test('invalid-structure', 'Invalid AnswerContent structure', () => false)
})

const matchingSchema = yup.object({
  content: yup.string().required('Content is required inside AnswerContent'),
  leftItems: yup.array().of(yup.string().required()).min(1, 'leftItems cannot be empty'),
  rightItems: yup.array().of(yup.string().required()).min(1, 'rightItems cannot be empty'),
  correctAnswer: yup.array().of(correctAnswerSchema).min(1, 'Correct answer required')
})

const fillInTheBlankSchema = yup.object({
  content: yup.string().required('Content is required inside AnswerContent'),
  options: yup.array().of(optionSchema).min(1, 'Options cannot be empty'),
  correctAnswer: yup.array().of(correctAnswerSchema).min(1, 'Correct answer required')
})

export const dropdownQuestionSchema = yup.object({
  ID: uuidSchema,
  Type: yup.string().oneOf(['dropdown-list'], 'Invalid Type').required(),
  AudioKeys: yup.mixed().nullable(),
  ImageKeys: yup.mixed().nullable(),
  SkillID: uuidSchema,
  PartID: uuidSchema,
  Content: yup.string().required('Content is required'),
  SubContent: yup.mixed().nullable(),
  AnswerContent: answerContentSchema
})
