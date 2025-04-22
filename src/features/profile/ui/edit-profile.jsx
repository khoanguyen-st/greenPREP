import { EMAIL_REG, PHONE_REG } from '@shared/lib/constants/reg'
import { Button, Form, Input, Modal } from 'antd'

const EditProfileModal = ({ open, onCancel, onSave, formData, setFormData }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      title={<div className="text-center text-2xl font-semibold">Update Profile</div>}
      open={open}
      onCancel={onCancel}
      footer={
        <div className="flex justify-end space-x-4">
          <Button key="cancel" onClick={onCancel} className="h-10 w-24 border border-[#D1D5DB] text-[#374151]">
            Cancel
          </Button>
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              form.validateFields().then(values => {
                onSave(values)
              })
            }}
            className="h-10 w-24 bg-[#003087] hover:bg-[#003087]/90"
          >
            Update
          </Button>
        </div>
      }
      width={500}
      maskClosable={false}
      className="edit-profile-modal"
    >
      <Form form={form} layout="vertical" initialValues={formData} className="px-4">
        <div className="flex gap-4">
          <Form.Item
            label={<span>First Name</span>}
            name="firstName"
            rules={[{ required: true, message: 'First name is required' }]}
            className="flex-1"
            hasFeedback
          >
            <Input
              value={formData.firstName}
              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              className="h-11 rounded-lg border-[#D1D5DB] bg-[#F9FAFB] px-3"
              placeholder="Enter first name"
            />
          </Form.Item>

          <Form.Item
            label={<span>Last Name</span>}
            name="lastName"
            rules={[{ required: true, message: 'Last name is required' }]}
            className="flex-1"
            hasFeedback
          >
            <Input
              value={formData.lastName}
              onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              className="h-11 rounded-lg border-[#D1D5DB] bg-[#F9FAFB] px-3"
              placeholder="Enter last name"
            />
          </Form.Item>
        </div>

        <Form.Item
          label={<span>Email</span>}
          name="email"
          rules={[
            { required: true, message: 'Email is required' },
            { pattern: EMAIL_REG, message: 'Invalid email format' }
          ]}
          hasFeedback
        >
          <Input
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="h-11 rounded-lg border-[#D1D5DB] bg-[#F9FAFB] px-3"
            placeholder="Enter email"
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Phone number is required'
            },
            { pattern: PHONE_REG, message: 'Invalid phone number (e.g. 0987654321)' }
          ]}
          hasFeedback
        >
          <Input
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="h-11 rounded-lg border-[#D1D5DB] bg-[#F9FAFB] px-3"
            placeholder="Enter phone number"
          />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Address is required' }]}
          hasFeedback
        >
          <Input
            value={formData.address}
            onChange={e => setFormData({ ...formData, address: e.target.value })}
            className="h-11 rounded-lg border-[#D1D5DB] bg-[#F9FAFB] px-3"
            placeholder="Enter your address"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditProfileModal
