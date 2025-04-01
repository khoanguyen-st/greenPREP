import { SearchOutlined } from '@ant-design/icons'
import { getProfile, getHistoryList } from '@features/profile/api/profile'
import { useQuery } from '@tanstack/react-query'
import { Card, Avatar, Button, Input, Table, Select, DatePicker } from 'antd'
import { useState } from 'react'

import ChangePasswordPopup from './change-password-popup'

const { Option } = Select

export const StudentProfile = () => {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    date: null,
    session: null,
    level: null
  })

  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile
  })

  const { data: historyData = [] } = useQuery({
    queryKey: ['history'],
    queryFn: getHistoryList
  })

  const filteredData = historyData.filter(item => {
    if (filters.level && filters.level !== 'all') {
      if (item.level.toLowerCase() !== filters.level.toLowerCase()) {
        return false
      }
    }
    if (filters.search) {
      if (!item.sessionName.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }
    }
    if (filters.date) {
      const filterDate = filters.date.format('DD/MM/YYYY')
      if (item.date !== filterDate) {
        return false
      }
    }
    if (filters.session && filters.session !== 'all') {
      if (item.sessionName !== filters.session) {
        return false
      }
    }
    return true
  })

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Session name',
      dataIndex: 'sessionName',
      key: 'sessionName'
    },
    {
      title: 'Grammar & Vocab',
      dataIndex: 'grammarVocab',
      key: 'grammarVocab',
      render: (text, record) => `${text} | ${record.grammarLevel}`
    },
    {
      title: 'Listening',
      dataIndex: 'listening',
      key: 'listening',
      render: (text, record) => `${text} | ${record.listeningLevel}`
    },
    {
      title: 'Reading',
      dataIndex: 'reading',
      key: 'reading',
      render: (text, record) => `${text} | ${record.readingLevel}`
    },
    {
      title: 'Speaking',
      dataIndex: 'speaking',
      key: 'speaking',
      render: (text, record) => `${text} | ${record.speakingLevel}`
    },
    {
      title: 'Writing',
      dataIndex: 'writing',
      key: 'writing',
      render: (text, record) => `${text} | ${record.writingLevel}`
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total'
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level'
    }
  ]

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar size={100} className="bg-gray-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{profileData?.firstName}</h2>
              <p className="text-gray-600">{profileData?.role}</p>
              <p className="text-gray-600">{profileData?.email}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button type="primary" className="bg-blue-900" onClick={() => setIsChangePasswordOpen(true)}>
              Change password
            </Button>
            <Button>Edit</Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8">
          <div>
            <p className="font-semibold text-gray-700">First Name</p>
            <p className="text-gray-900">{profileData?.firstName}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Last Name</p>
            <p className="text-gray-900">{profileData?.lastName}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Email</p>
            <p className="text-gray-900">{profileData?.email}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Phone number</p>
            <p className="text-gray-900">{profileData?.phoneNumber}</p>
          </div>
        </div>
      </Card>

      <ChangePasswordPopup
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        userId={profileData?.id}
      />

      {/* History Section */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">History</h2>

        <div className="mb-6 flex gap-4">
          <Input
            placeholder="Search session name"
            prefix={<SearchOutlined />}
            value={filters.search}
            onChange={e => setFilters({ ...filters, search: e.target.value })}
            style={{ width: 250 }}
            className="rounded-lg"
          />
          <DatePicker
            placeholder="Date"
            onChange={date => setFilters({ ...filters, date })}
            style={{ width: 150 }}
            className="rounded-lg"
          />
          <Select
            placeholder="Session"
            style={{ width: 150 }}
            value={filters.session}
            onChange={value => setFilters({ ...filters, session: value })}
            className="rounded-lg"
          >
            <Option value="all">All</Option>
            {Array.from(new Set(historyData.map(item => item.sessionName))).map(session => (
              <Option key={session} value={session}>
                {session}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Level"
            style={{ width: 150 }}
            value={filters.level}
            onChange={value => setFilters({ ...filters, level: value })}
            className="rounded-lg"
          >
            <Option value="all">All</Option>
            <Option value="a1">A1</Option>
            <Option value="a2">A2</Option>
            <Option value="b1">B1</Option>
            <Option value="b2">B2</Option>
            <Option value="c1">C1</Option>
            <Option value="c2">C2</Option>
            <Option value="c">C</Option>
          </Select>
        </div>

        <Card className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{
              total: filteredData.length,
              pageSize: 10,
              showSizeChanger: false,
              showTotal: total => `Showing ${total} of ${filteredData.length}`,
              className: 'rounded-lg'
            }}
            className="rounded-lg"
          />
        </Card>
      </div>
    </div>
  )
}

export default StudentProfile
