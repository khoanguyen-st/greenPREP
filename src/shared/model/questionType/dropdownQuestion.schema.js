import * as yup from "yup";

const uuidSchema = yup.string().uuid("Invalid UUID format").required();

const keySchema = yup
  .string()
  .matches(/^\d+$/, "Key must be a number as string")
  .required();

const optionSchema = yup.object({
  key: keySchema,
  value: yup
    .array()
    .of(yup.string().required("Each option must be a string"))
    .min(2, "Each question must have at least two options")
    .required(),
});

const correctAnswerSchema = yup.object({
  key: keySchema,
  value: yup.string().required("Correct answer is required"),
});

export const answerContentSchema = yup.object({
  content: yup.string().required("Content is required inside AnswerContent"),
  options: yup
    .array()
    .of(optionSchema)
    .min(1, "Options cannot be empty")
    .required(),
  correctAnswer: yup
    .array()
    .of(correctAnswerSchema)
    .min(1, "At least one correct answer is required")
    .required(),
  partID: uuidSchema,
  type: yup
    .string()
    .oneOf(["dropdown-list"], "Invalid type inside AnswerContent")
    .required(),
});

export const dropdownQuestionSchema = yup.object({
  ID: uuidSchema,
  Type: yup.string().oneOf(["dropdown-list"], "Invalid Type").required(),
  AudioKeys: yup.mixed().nullable(),
  ImageKeys: yup.mixed().nullable(),
  SkillID: uuidSchema,
  PartID: uuidSchema,
  Content: yup.string().required("Content is required"),
  SubContent: yup.mixed().nullable(),
  AnswerContent: yup.string().required("AnswerContent is required"),
});
