// @ts-nocheck
import { SearchOutlined } from '@ant-design/icons'
import { useStudentHistory } from '@features/profile/hooks/useProfile'
import { Empty, Input, Select, Table } from 'antd'
import { useState } from 'react'

const { Option } = Select

const StudentHistory = ({ userId }) => {
  const [searchText, setSearchText] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSession, setSelectedSession] = useState(null)
  const [selectedLevel, setSelectedLevel] = useState(null)

  const { data, isLoading, error } = useStudentHistory(userId)

  const sessionData = (data?.data || []).map(item => ({
    id: item.ID,
    date: item.Session?.startTime?.split('T')[0] || '',
    sessionName: item.Session?.sessionName || '',
    grammarScore: item.GrammarVocab,
    grammarLevel: item.GrammarVocabLevel,
    listeningScore: item.Listening,
    listeningLevel: item.ListeningLevel,
    readingScore: item.Reading,
    readingLevel: item.ReadingLevel,
    speakingScore: item.Speaking,
    speakingLevel: item.SpeakingLevel,
    writingScore: item.Writing,
    writingLevel: item.WritingLevel,
    total: item.Total,
    finalLevel: item.Level
  }))

  const filteredData = sessionData.filter(item => {
    const matchesSearch = item.sessionName.toLowerCase().includes(searchText.toLowerCase())
    const matchesDate = !selectedDate || selectedDate === 'all' || item.date === selectedDate
    const matchesSession = !selectedSession || selectedSession === 'all' || item.sessionName === selectedSession
    const matchesLevel = !selectedLevel || selectedLevel === 'all' || item.finalLevel === selectedLevel
    return matchesSearch && matchesDate && matchesSession && matchesLevel
  })

  const dates = [...new Set(sessionData.map(item => item.date))]
  const sessions = [...new Set(sessionData.map(item => item.sessionName))]
  const levels = [...new Set(sessionData.map(item => item.finalLevel).filter(Boolean))]

  const renderScore = (score, level) => {
    const color = score <= 8 && level === 'X' ? '#ff4d4f' : score >= 8 ? '#000' : ''
    return (
      <div style={{ fontWeight: 500 }}>
        <span style={{ color }}>{score ?? '-'}</span>
        {level && (
          <>
            <span style={{ margin: '0 6px', color: '#000' }}>|</span>
            <span style={{ color, textTransform: 'uppercase' }}>{level}</span>
          </>
        )}
      </div>
    )
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      width: 120,
      render: text => <span style={{ fontWeight: 500 }}>{text}</span>
    },
    {
      title: 'Session name',
      dataIndex: 'sessionName',
      key: 'sessionName',
      align: 'center',
      width: 180,
      render: text => <span style={{ color: '#1890ff', fontWeight: 500 }}>{text}</span>
    },
    {
      title: 'Grammar & Vocab',
      dataIndex: 'grammarScore',
      key: 'grammar',
      align: 'center',
      width: 150,
      render: (_, record) => renderScore(record.grammarScore, record.grammarLevel)
    },
    {
      title: 'Listening',
      dataIndex: 'listeningScore',
      key: 'listening',
      align: 'center',
      width: 150,
      render: (_, record) => renderScore(record.listeningScore, record.listeningLevel)
    },
    {
      title: 'Reading',
      dataIndex: 'readingScore',
      key: 'reading',
      align: 'center',
      width: 150,
      render: (_, record) => renderScore(record.readingScore, record.readingLevel)
    },
    {
      title: 'Speaking',
      dataIndex: 'speakingScore',
      key: 'speaking',
      align: 'center',
      width: 150,
      render: (_, record) => renderScore(record.speakingScore, record.speakingLevel)
    },
    {
      title: 'Writing',
      dataIndex: 'writingScore',
      key: 'writing',
      align: 'center',
      width: 150,
      render: (_, record) => renderScore(record.writingScore, record.writingLevel)
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      width: 100,
      render: score => {
        return <span style={{ fontSize: '16px', fontWeight: '', color: '#000' }}>{score ?? '-'}</span>
      }
    },
    {
      title: 'Final Level',
      dataIndex: 'finalLevel',
      key: 'finalLevel',
      align: 'center',
      width: 120,
      render: level =>
        level ? (
          <span
            style={{
              color: level === 'X' ? 'red' : 'black',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            {level}
          </span>
        ) : (
          '-'
        )
    }
  ]

  if (error) {
    return (
      <div style={{ padding: '24px', textAlign: 'center', color: '#ff4d4f' }}>
        {error.message || 'Failed to fetch session history'}
      </div>
    )
  }

  return (
    <div
      style={{
        background: '#fff',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflowX: 'auto'
      }}
    >
      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>Session History</h2>

      {/* Filters - Responsive wrap */}
      <div
        style={{
          marginBottom: 24,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16
        }}
      >
        <Input
          placeholder="Search session name"
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ minWidth: 200, flex: 1 }}
        />
        <Select style={{ minWidth: 120 }} placeholder="Date" allowClear value={selectedDate} onChange={setSelectedDate}>
          <Option value="all">All</Option>
          {dates.map(date => (
            <Option key={date} value={date}>
              {date}
            </Option>
          ))}
        </Select>
        <Select
          style={{ minWidth: 120 }}
          placeholder="Session"
          allowClear
          value={selectedSession}
          onChange={setSelectedSession}
        >
          <Option value="all">All</Option>
          {sessions.map(session => (
            <Option key={session} value={session}>
              {session}
            </Option>
          ))}
        </Select>
        <Select
          style={{ minWidth: 120 }}
          placeholder="Level"
          allowClear
          value={selectedLevel}
          onChange={setSelectedLevel}
        >
          <Option value="all">All</Option>
          {levels.map(level => (
            <Option key={level} value={level}>
              {level}
            </Option>
          ))}
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        loading={isLoading}
        rowKey="id"
        pagination={{
          pageSize: 5,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
        }}
        scroll={{ x: true }}
        bordered
        locale={{
          emptyText: <Empty description="No data" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }}
      />
    </div>
  )
}

export default StudentHistory
