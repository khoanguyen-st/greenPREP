import * as yup from 'yup'

export const multipleChoiceAnswerSchema = yup.object().shape({
  title: yup.string().required(),
  options: yup
    .array()
    .of(
      yup.object().shape({
        key: yup.string().required(),
        value: yup.string().required()
      })
    )
    .required()
    .min(1),
  correctAnswer: yup.string().required()
})

export const multipleChoiceQuestionSchema = yup.object().shape({
  ID: yup.string().uuid().required(),
  Type: yup.string().oneOf(['multiple-choice']).required(),
  AudioKeys: yup.array().nullable(),
  ImageKeys: yup.array().nullable(),
  SkillID: yup.string().uuid().required(),
  PartID: yup.string().uuid().required(),
  Content: yup.string().required(),
  SubContent: yup.string().nullable(),
  AnswerContent: yup.string().required()
})
