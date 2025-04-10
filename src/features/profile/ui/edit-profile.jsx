import { EMAIL_REG, PHONE_REG } from '@shared/lib/constants/reg'
import { Form, Input, Modal } from 'antd'

const EditProfileModal = ({ open, onCancel, onSave, formData, setFormData }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      title="Update Profile"
      open={open}
      onOk={() => {
        form.validateFields().then(values => {
          onSave(values)
        })
      }}
      onCancel={onCancel}
      okText="Update"
      cancelText="Cancel"
      okButtonProps={{ className: 'bg-blue-600 hover:bg-blue-700' }}
      cancelButtonProps={{ className: 'hover:bg-gray-100' }}
      width={400}
    >
      <Form form={form} layout="vertical" initialValues={formData}>
        <div className="flex gap-4">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'First name is required' }]}
            className="flex-1"
            hasFeedback
          >
            <Input value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Last name is required' }]}
            className="flex-1"
            hasFeedback
          >
            <Input value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
          </Form.Item>
        </div>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email is required' },
            { pattern: EMAIL_REG, message: 'Invalid email format' }
          ]}
          hasFeedback
        >
          <Input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ pattern: PHONE_REG, message: 'Invalid phone number (e.g. 0987654321)' }]}
          hasFeedback
        >
          <Input
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter phone number"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditProfileModal
