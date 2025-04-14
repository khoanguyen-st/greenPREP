import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { useRegister } from '@shared/lib/hooks/useAuthUsers'
import { Form, Input, Button, Typography, Space, Row, Col, message } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import RegisterImg from '../assets/images/register.png'

const { Title, Text } = Typography

const RegisterPage = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [confirmTouched, setConfirmTouched] = useState(false)
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

  const phoneNumber = Form.useWatch('phone', form)
  const showPhoneSuccess = phoneNumber?.length === 10

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

  const handleConfirmBlur = () => {
    setConfirmTouched(true)
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
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.reject(new Error('First name is required'))
                          }
                          const errors = []
                          if (value.length < 2) {
                            errors.push('At least 2 characters')
                          }
                          if (value.length > 50) {
                            errors.push('Cannot exceed 50 characters')
                          }
                          if (!/^[A-Za-z]+$/.test(value)) {
                            errors.push('Only alphabetic characters are allowed')
                          }
                          if (errors.length > 0) {
                            return Promise.reject(new Error(`First name: ${errors.join(', ')}`))
                          }
                          return Promise.resolve()
                        }
                      }
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
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.reject(new Error('Last name is required'))
                          }
                          const errors = []
                          if (value.length < 2) {
                            errors.push('At least 2 characters')
                          }
                          if (value.length > 50) {
                            errors.push('Cannot exceed 50 characters')
                          }
                          if (!/^[A-Za-z]+$/.test(value)) {
                            errors.push('Only alphabetic characters are allowed')
                          }
                          if (errors.length > 0) {
                            return Promise.reject(new Error(`${errors.join(', ')}`))
                          }
                          return Promise.resolve()
                        }
                      }
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
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.reject(new Error('Email is required'))
                          }
                          const errors = []
                          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                            errors.push('Please enter a valid email')
                          }
                          if (errors.length > 0) {
                            return Promise.reject(new Error(`${errors.join(', ')}`))
                          }
                          return Promise.resolve()
                        }
                      }
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
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.reject(new Error('Class name is required'))
                          }
                          const errors = []
                          if (value.length < 2) {
                            errors.push('At least 2 characters')
                          }
                          if (value.length > 100) {
                            errors.push('Cannot exceed 100 characters')
                          }
                          if (!/^[A-Za-z0-9\s]+$/.test(value)) {
                            errors.push('Only alphanumeric characters and spaces are allowed')
                          }
                          if (errors.length > 0) {
                            return Promise.reject(new Error(`${errors.join(', ')}`))
                          }
                          return Promise.resolve()
                        }
                      }
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
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.reject(new Error('Student ID is required'))
                          }
                          const errors = []
                          if (!/^[A-Za-z0-9]{5,15}$/.test(value)) {
                            errors.push('Must be 5-15 alphanumeric characters')
                          }
                          if (errors.length > 0) {
                            return Promise.reject(new Error(`${errors.join(', ')}`))
                          }
                          return Promise.resolve()
                        }
                      }
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
                        Phone Number
                      </Text>
                    }
                    name="phone"
                    validateStatus={showPhoneSuccess ? 'success' : ''}
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.resolve()
                          }
                          const errors = []
                          if (!/^\d+$/.test(value)) {
                            errors.push('Must contain only digits')
                          }
                          if (value.length !== 10) {
                            errors.push('Must be exactly 10 digits')
                          }
                          if (errors.length > 0) {
                            return Promise.reject(new Error(`${errors.join(', ')}`))
                          }
                          return Promise.resolve()
                        }
                      }
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
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.resolve()
                          }
                          const errors = []
                          if (!/[A-Z]/.test(value)) {
                            errors.push('One uppercase letter')
                          }
                          if (!/[a-z]/.test(value)) {
                            errors.push('One lowercase letter')
                          }
                          if (!/[0-9]/.test(value)) {
                            errors.push('One number')
                          }
                          if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                            errors.push('One special character')
                          }
                          if (errors.length > 0) {
                            return Promise.reject(new Error(`Password must contain ${errors[0]}`))
                          }
                          if (value.length < 8) {
                            return Promise.reject(new Error('Password must be at least 8 characters'))
                          }
                          return Promise.resolve()
                        }
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
                          if (!confirmTouched) {
                            return Promise.resolve()
                          }
                          if (!value) {
                            return Promise.resolve()
                          }
                          if (getFieldValue('password') === value) {
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
                      onBlur={handleConfirmBlur}
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
