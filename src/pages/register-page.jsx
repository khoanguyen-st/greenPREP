import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { EMAIL_REG, PASSWORD_REG, PHONE_REG } from '@shared/lib/constants/reg'
import { useRegister } from '@shared/lib/hooks/useAuthUsers'
import { Form, Input, Button, Typography, Space, Row, Col, message } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import RegisterImg from '../assets/images/register.png'

const { Title, Text } = Typography

const RegisterPage = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    className: '',
    studentCode: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const { mutate: registerUser, isPending } = useRegister({
    onSuccess: response => {
      message.success(response.data.message)
      navigate('/login')
    },
    onError: error => {
      message.error(error.response?.data?.message || 'Registration failed. Please try again.')
    }
  })

  const handleFormChange = changedFields => {
    setFormValues(prevValues => ({
      ...prevValues,
      ...changedFields
    }))

    const fieldName = Object.keys(changedFields)[0]
    form.validateFields([fieldName])
  }

  const onFinish = () => {
    const registerData = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      className: formValues.className,
      studentCode: formValues.studentCode,
      phone: formValues.phone,
      password: formValues.password
    }
    // @ts-ignore - The type is defined in the hook's JSDoc
    registerUser(registerData)
  }

  return (
    <Row className="min-h-screen bg-white">
      <Col xs={24} md={12} className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-[600px] py-8 sm:py-12">
          <Space direction="vertical" size={24} className="w-full">
            <Title level={4} className="!m-0 !text-xl !text-[#003087] sm:!text-2xl">
              GreenPREP
            </Title>

            <Space direction="vertical" size={8}>
              <Title level={2} className="!m-0 !text-xl !font-semibold !text-black sm:!text-2xl">
                Sign up
              </Title>
              <Text className="!text-sm !text-gray-500">
                Let&apos;s get you all set up so you can access your personal account.
              </Text>
            </Space>

            <Form
              form={form}
              name="register"
              layout="vertical"
              onFinish={onFinish}
              onValuesChange={handleFormChange}
              initialValues={formValues}
              autoComplete="off"
              requiredMark={false}
              className="flex flex-col gap-4 sm:gap-5"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={
                      <Text strong className="!text-sm">
                        First Name <span className="text-red-500">*</span>
                      </Text>
                    }
                    name="firstName"
                    rules={[
                      { required: true, message: 'First name is required' },
                      { min: 2, message: 'At least 2 characters' },
                      { max: 50, message: 'Cannot exceed 50 characters' },
                      { pattern: /^[A-Za-z]+$/, message: 'Only alphabetic characters are allowed' }
                    ]}
                    hasFeedback
                    className="!mb-1"
                  >
                    <Input
                      placeholder="First Name"
                      className="!h-11 !rounded-md !border !bg-gray-50 !px-4 !py-2.5 !text-base"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={
                      <Text strong className="!text-sm">
                        Last Name <span className="text-red-500">*</span>
                      </Text>
                    }
                    name="lastName"
                    rules={[
                      { required: true, message: 'Last name is required' },
                      { min: 2, message: 'At least 2 characters' },
                      { max: 50, message: 'Cannot exceed 50 characters' },
                      { pattern: /^[A-Za-z]+$/, message: 'Only alphabetic characters are allowed' }
                    ]}
                    hasFeedback
                    className="!mb-1"
                  >
                    <Input
                      placeholder="Last Name"
                      className="!h-11 !rounded-md !border !bg-gray-50 !px-4 !py-2.5 !text-base"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={
                      <Text strong className="!text-sm">
                        Email <span className="text-red-500">*</span>
                      </Text>
                    }
                    name="email"
                    rules={[
                      { required: true, message: 'Email is required' },
                      { pattern: EMAIL_REG, message: 'Please enter a valid email' }
                    ]}
                    hasFeedback
                    className="!mb-1"
                  >
                    <Input
                      placeholder="Email"
                      className="!h-11 !rounded-md !border !bg-gray-50 !px-4 !py-2.5 !text-base"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={
                      <Text strong className="!text-sm">
                        Class Name <span className="text-red-500">*</span>
                      </Text>
                    }
                    name="className"
                    rules={[
                      { required: true, message: 'Class name is required' },
                      { min: 2, message: 'At least 2 characters' },
                      { max: 100, message: 'Cannot exceed 100 characters' },
                      { pattern: /^[A-Za-z0-9\s]+$/, message: 'Only alphanumeric characters and spaces are allowed' }
                    ]}
                    hasFeedback
                    className="!mb-1"
                  >
                    <Input
                      placeholder="Class Name"
                      className="!h-11 !rounded-md !border !bg-gray-50 !px-4 !py-2.5 !text-base"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={
                      <Text strong className="!text-sm">
                        Student ID <span className="text-red-500">*</span>
                      </Text>
                    }
                    name="studentCode"
                    rules={[
                      { required: true, message: 'Student ID is required' },
                      { pattern: /^TC\d{5}$/, message: 'Student ID must start with TC followed by 5 digits' }
                    ]}
                    hasFeedback
                    className="!mb-1"
                  >
                    <Input
                      placeholder="Student ID"
                      className="!h-11 !rounded-md !border !bg-gray-50 !px-4 !py-2.5 !text-base"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={
                      <Text strong className="!text-sm">
                        Phone Number <span className="text-red-500">*</span>
                      </Text>
                    }
                    name="phone"
                    rules={[
                      { required: true, message: 'Phone number is required' },
                      { pattern: /^\d+$/, message: 'Phone number must contain only numbers' },
                      { pattern: PHONE_REG, message: 'Phone number is not valid (e.g. 0988668686)' }
                    ]}
                    hasFeedback
                    className="!mb-1"
                  >
                    <Input
                      placeholder="Phone Number"
                      maxLength={10}
                      className="!h-11 !rounded-md !border !border-gray-200 !bg-gray-50 !px-4 !py-2.5 !text-base"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={
                      <Text strong className="!text-sm">
                        Password <span className="text-red-500">*</span>
                      </Text>
                    }
                    name="password"
                    rules={[
                      { required: true, message: 'Password is required' },
                      {
                        pattern: PASSWORD_REG,
                        message:
                          'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
                      }
                    ]}
                    hasFeedback
                    className="!mb-1"
                  >
                    <Input.Password
                      placeholder="••••••••••"
                      className="!h-11 !rounded-md !border !bg-gray-50 !px-4 !py-2.5 !text-base"
                      iconRender={visible =>
                        visible ? (
                          <EyeOutlined className="text-gray-400" />
                        ) : (
                          <EyeInvisibleOutlined className="text-gray-400" />
                        )
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={
                      <Text strong className="!text-sm">
                        Confirm Password <span className="text-red-500">*</span>
                      </Text>
                    }
                    name="confirmPassword"
                    rules={[
                      { required: true, message: 'Please confirm your password' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('The two passwords do not match'))
                        }
                      })
                    ]}
                    hasFeedback
                    className="!mb-1"
                  >
                    <Input.Password
                      placeholder="••••••••••"
                      className="!h-11 !rounded-md !border !bg-gray-50 !px-4 !py-2.5 !text-base"
                      iconRender={visible =>
                        visible ? (
                          <EyeOutlined className="text-gray-400" />
                        ) : (
                          <EyeInvisibleOutlined className="text-gray-400" />
                        )
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item className="!mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isPending}
                  className="!h-11 !w-full !rounded-md !bg-[#003087] !text-base !font-medium hover:!bg-blue-900"
                >
                  Sign up
                </Button>
              </Form.Item>

              <div className="text-left">
                <Text className="!text-sm !text-gray-500">
                  Already have an account?{' '}
                  <Link to="/login" className="!text-[#003087] hover:underline">
                    Sign in
                  </Link>
                </Text>
              </div>
            </Form>
          </Space>
        </div>
      </Col>

      <Col xs={0} md={12} className="bg-white-50 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto w-full max-w-[640px] px-8 sm:px-12">
            <img src={RegisterImg} alt="Register Security Illustration" className="h-auto w-full object-contain" />
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default RegisterPage
