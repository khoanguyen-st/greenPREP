import { Typography, Divider, List, Button } from 'antd'

export const Introduction = ({ data, onStart }) => {
  return (
    <div className="mx-auto max-w-3xl space-y-2">
      <Divider orientation="left">
        <Typography.Title level={2} className="!mb-0">
          {data.title}
        </Typography.Title>
      </Divider>
      <List
        header={
          <div className="flex flex-col">
            <h5 className="text-lg font-semibold">Test Structure</h5>
            <p className="text-sm">{data.testStructure.desc}</p>
          </div>
        }
        bordered
        size="large"
        dataSource={data.testStructure.parts}
        renderItem={item => (
          <List.Item>
            <Typography.Text>{item.name}</Typography.Text> {item.desc}
          </List.Item>
        )}
      />

      <List
        header={
          <div className="flex flex-col">
            <h5 className="text-lg font-semibold">Description</h5>
            <p className="text-sm">{data.fornDescription.desc}</p>
          </div>
        }
        bordered
        size="large"
        dataSource={data.notes.listNotes}
        renderItem={item => (
          <List.Item>
            <Typography.Text
              style={{
                display: 'inline-block',
                width: 20
              }}
            ></Typography.Text>{' '}
            {item}
          </List.Item>
        )}
      />
      <div className="flex justify-end">
        <Button onClick={onStart} size="large" type="primary" className="bg-[#003087] hover:!bg-[#002b6c]">
          Start Test
        </Button>
      </div>
    </div>
  )
}
