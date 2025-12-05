import { Button, Space } from '@arco-design/web-react'
import React from 'react'

const App = () => {
  return (
    <Space size='large'>
      <Button type='primary'>Primary</Button>
      <Button type='secondary'>Secondary</Button>
      <Button type='dashed'>Dashed</Button>
      <Button type='outline'>Outline</Button>
      <Button type='text'>Text</Button>
    </Space>
  )
}

export default App
