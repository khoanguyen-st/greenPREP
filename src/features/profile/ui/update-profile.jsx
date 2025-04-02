import { Button, Form, Input, Modal } from 'antd'
import { useEffect } from 'react'

const UpdateProfile = ({ visible, onCancel, onUpdate, initialData }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData)
    }
  }, [initialData, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      await onUpdate(values)
      onCancel()
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  return (
    <Modal
      title={<div className="text-center text-2xl font-semibold">Update Profile</div>}
      open={visible}
      onCancel={onCancel}
      footer={
        <div className="flex justify-end space-x-4">
          <Button key="cancel" onClick={onCancel} className="h-10 w-24 border border-[#D1D5DB] text-[#374151]">
            Cancel
          </Button>
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit}
            className="h-10 w-24 bg-[#003087] hover:bg-[#003087]/90"
          >
            Update
          </Button>
        </div>
      }
      width={500}
      maskClosable={false}
      className="update-profile-modal"
    >
      <Form form={form} layout="vertical" className="px-4" initialValues={initialData} onFinish={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="firstName"
            label={
              <span>
                First name <span className="text-red-500">*</span>
              </span>
            }
            rules={[
              { required: true, message: 'First name is required' },
              { min: 2, message: 'First name must be at least 2 characters' },
              { max: 50, message: 'First name must not exceed 50 characters' }
            ]}
          >
            <Input placeholder="First name" className="h-11 rounded-lg border-[#D1D5DB] bg-[#F9FAFB] px-3" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label={
              <span>
                Last name <span className="text-red-500">*</span>
              </span>
            }
            rules={[
              { required: true, message: 'Last name is required' },
              { min: 2, message: 'Last name must be at least 2 characters' },
              { max: 50, message: 'Last name must not exceed 50 characters' }
            ]}
          >
            <Input placeholder="Last name" className="h-11 rounded-lg border-[#D1D5DB] bg-[#F9FAFB] px-3" />
          </Form.Item>
        </div>

        <Form.Item
          name="email"
          label={
            <span>
              Email <span className="text-red-500">*</span>
            </span>
          }
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="Email" className="h-11 rounded-lg border-[#F9FAFB] bg-[#F9FAFB] px-3" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone number"
          rules={[
            { pattern: /^[0-9]*$/, message: 'Phone number must contain only digits' },
            { min: 10, message: 'Phone number must be at least 10 digits' },
            { max: 15, message: 'Phone number must not exceed 15 digits' }
          ]}
        >
          <Input placeholder="Phone number" className="h-11 rounded-lg border-[#D1D5DB] bg-[#F9FAFB] px-3" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateProfile
